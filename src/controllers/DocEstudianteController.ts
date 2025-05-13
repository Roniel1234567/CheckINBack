import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DocEstudiante } from '../models/DocEstudiante';

const docEstudianteRepository = AppDataSource.getRepository(DocEstudiante);

export const getAllDocEstudiantes = async (_req: Request, res: Response) => {
    try {
        const docs = await docEstudianteRepository.find({ relations: ['estudiante'] });
        return res.json(docs);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los documentos de estudiantes' });
    }
};

export const getDocEstudianteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await docEstudianteRepository.findOne({
            where: { est_doc: id },
            relations: ['estudiante']
        });
        if (!doc) return res.status(404).json({ message: 'Documento de estudiante no encontrado' });
        return res.json(doc);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el documento de estudiante' });
    }
};

// NOTA: Para subir archivos, el frontend debe enviar los archivos con los siguientes nombres de campo:
// id_doc_file, cv_doc_file, anexo_iv_doc_file, anexo_v_doc_file, acta_nac_doc_file, ced_padres_doc_file, vac_covid_doc_file

export const createDocEstudiante = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        // Mapear estudiante a objeto si es id
        if (data.estudiante) {
            data.estudiante = { documento_id_est: data.estudiante };
        }
        const nuevoDoc = docEstudianteRepository.create(data);
        await docEstudianteRepository.save(nuevoDoc);
        return res.status(201).json(nuevoDoc);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el documento de estudiante' });
    }
};

export const updateDocEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await docEstudianteRepository.findOne({ where: { est_doc: id } });
        if (!doc) return res.status(404).json({ message: 'Documento de estudiante no encontrado' });
        docEstudianteRepository.merge(doc, req.body);
        await docEstudianteRepository.save(doc);
        return res.json(doc);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el documento de estudiante' });
    }
};

export const deleteDocEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await docEstudianteRepository.delete({ est_doc: id });
        if (result.affected === 0) return res.status(404).json({ message: 'Documento de estudiante no encontrado' });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el documento de estudiante' });
    }
};

export const getArchivoEstudiante = async (req: Request, res: Response) => {
    const { id, tipo } = req.params;
    const camposPermitidos = [
        'ced_est', 'cv_doc', 'anexo_iv_doc', 'anexo_v_doc',
        'acta_nac_doc', 'ced_padres_doc', 'vac_covid_doc'
    ];
    if (!camposPermitidos.includes(tipo)) {
        return res.status(400).json({ message: 'Tipo de archivo no válido' });
    }
    try {
        const docEst = await docEstudianteRepository.findOne({ where: { est_doc: id } });
        const archivo = docEst ? (docEst as any)[tipo] : undefined;
        if (!docEst || !archivo) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }
        // Puedes mejorar el Content-Type según el tipo real de archivo
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${tipo}_${id}.pdf`);
        return res.send(archivo);
    } catch (error) {
        console.error('Error al obtener archivo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}; 