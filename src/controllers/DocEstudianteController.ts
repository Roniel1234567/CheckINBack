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

export const getDocEstudianteByDocumento = async (req: Request, res: Response) => {
    try {
        const documento = req.params.documento;
        // Busca los documentos por el campo est_doc (que es el documento del estudiante)
        const docs = await docEstudianteRepository.find({
            where: { est_doc: documento },
            relations: ['estudiante']
        });
        if (!docs || docs.length === 0) {
            return res.status(404).json({ message: 'No se encontraron documentos para este estudiante' });
        }
        return res.json(docs);
    } catch (error) {
        return res.status(500).json({ message: 'Error al buscar documentos por documento de estudiante' });
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

        // Procesar archivos si existen
        if ((req as any).files) {
            const files = (req as any).files as { [fieldname: string]: Express.Multer.File[] };
            if (files.id_doc_file) doc.ced_est = files.id_doc_file[0].buffer;
            if (files.cv_doc_file) doc.cv_doc = files.cv_doc_file[0].buffer;
            if (files.anexo_iv_doc_file) doc.anexo_iv_doc = files.anexo_iv_doc_file[0].buffer;
            if (files.anexo_v_doc_file) doc.anexo_v_doc = files.anexo_v_doc_file[0].buffer;
            if (files.acta_nac_doc_file) doc.acta_nac_doc = files.acta_nac_doc_file[0].buffer;
            if (files.ced_padres_doc_file) doc.ced_padres_doc = files.ced_padres_doc_file[0].buffer;
            if (files.vac_covid_doc_file) doc.vac_covid_doc = files.vac_covid_doc_file[0].buffer;
        }

        // Si quieres, puedes seguir usando merge para otros campos del body
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

        // Si todos tus archivos son PDF, usa este Content-Type:
        res.setHeader('Content-Type', 'application/pdf');
        // Para abrir en el navegador y permitir descarga con nombre amigable:
        res.setHeader('Content-Disposition', `inline; filename=${tipo}_${id}.pdf`);
        return res.send(archivo);

        // Si quieres forzar la descarga, usa:
        // res.setHeader('Content-Disposition', `attachment; filename=${tipo}_${id}.pdf`);
    } catch (error) {
        console.error('Error al obtener archivo:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}; 