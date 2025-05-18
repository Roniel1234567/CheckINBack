// src/controllers/TallerCentroController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { TallerCentro } from '../models/TallerCentro';
import { Taller } from '../models/Taller';
import { CentroDeTrabajo } from '../models/CentroDeTrabajo';
import { FindOptionsWhere } from 'typeorm';

const tallerCentroRepository = AppDataSource.getRepository(TallerCentro);

// Crear relación taller-centro
export const createTallerCentro = async (req: Request, res: Response) => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

  try {
    const { id_taller, id_centro } = req.body;
        
    if (!id_taller || !id_centro) {
            return res.status(400).json({ 
                message: 'Faltan datos requeridos',
                required: {
                    id_taller: 'number',
                    id_centro: 'number'
                }
            });
        }

        // Verificar que el taller existe
        const taller = await queryRunner.manager.findOne(Taller, {
            where: { id_taller }
        });

        if (!taller) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Taller no encontrado' });
        }

        // Verificar que el centro existe
        const centro = await queryRunner.manager.findOne(CentroDeTrabajo, {
            where: { id_centro }
        });

        if (!centro) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Centro de trabajo no encontrado' });
        }

        // Verificar que la relación no existe
        const relacionExistente = await queryRunner.manager.findOne(TallerCentro, {
            where: { id_taller, id_centro }
        });

        if (relacionExistente) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ message: 'Esta relación ya existe' });
        }

        const nuevaRelacion = queryRunner.manager.create(TallerCentro, {
            id_taller,
            id_centro
        });

        await queryRunner.manager.save(TallerCentro, nuevaRelacion);
        await queryRunner.commitTransaction();

        return res.status(201).json({ 
            message: 'Relación creada correctamente',
            data: nuevaRelacion
        });
  } catch (error) {
        await queryRunner.rollbackTransaction();
    console.error('Error al crear relación taller-centro:', error);
        return res.status(500).json({ 
            message: 'Error al crear la relación',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    } finally {
        await queryRunner.release();
  }
};

// Obtener empresas por taller
export const getCentrosPorTaller = async (req: Request, res: Response) => {
  try {
    const id_taller = parseInt(req.params.id_taller);
    if (isNaN(id_taller)) {
      return res.status(400).json({ message: 'ID de taller inválido' });
    }

        // Verificar que el taller existe
        const taller = await AppDataSource.getRepository(Taller).findOne({
            where: { id_taller: id_taller.toString() } as FindOptionsWhere<Taller>
        });

        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

    const relaciones = await tallerCentroRepository.find({
      where: { id_taller },
            relations: ['centro']
    });

        const centros = relaciones.map(rel => rel.centro);
        return res.json(centros);
  } catch (error) {
        console.error('Error al obtener centros por taller:', error);
        return res.status(500).json({ 
            message: 'Error al obtener los centros',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
  }
};