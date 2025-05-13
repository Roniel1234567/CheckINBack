import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DocEstudiante } from '../models/DocEstudiante';

const docEstudianteRepository = AppDataSource.getRepository(DocEstudiante);

export const getAllDocEstudiantes = async (req: Request, res: Response) => {
    try {
        const docs = await docEstudianteRepository.find();
        return res.json(docs);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los documentos de estudiantes' });
    }
};

export const getDocEstudianteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await docEstudianteRepository.findOneBy({ est_doc: id });
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
        if ((req as any).files) {
            const files = (req as any).files as { [fieldname: string]: Express.Multer.File[] };
            data.id_doc_file = files.id_doc_file?.[0]?.buffer;
            data.cv_doc_file = files.cv_doc_file?.[0]?.buffer;
            data.anexo_iv_doc_file = files.anexo_iv_doc_file?.[0]?.buffer;
            data.anexo_v_doc_file = files.anexo_v_doc_file?.[0]?.buffer;
            data.acta_nac_doc_file = files.acta_nac_doc_file?.[0]?.buffer;
            data.ced_padres_doc_file = files.ced_padres_doc_file?.[0]?.buffer;
            data.vac_covid_doc_file = files.vac_covid_doc_file?.[0]?.buffer;
        }
        const newDoc = docEstudianteRepository.create(data);
        await docEstudianteRepository.save(newDoc);
        return res.status(201).json(newDoc);
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el documento de estudiante' });
    }
};

export const updateDocEstudiante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const doc = await docEstudianteRepository.findOneBy({ est_doc: id });
        if (!doc) return res.status(404).json({ message: 'Documento de estudiante no encontrado' });
        const data = req.body;
        if ((req as any).files) {
            const files = (req as any).files as { [fieldname: string]: Express.Multer.File[] };
            data.id_doc_file = files.id_doc_file?.[0]?.buffer;
            data.cv_doc_file = files.cv_doc_file?.[0]?.buffer;
            data.anexo_iv_doc_file = files.anexo_iv_doc_file?.[0]?.buffer;
            data.anexo_v_doc_file = files.anexo_v_doc_file?.[0]?.buffer;
            data.acta_nac_doc_file = files.acta_nac_doc_file?.[0]?.buffer;
            data.ced_padres_doc_file = files.ced_padres_doc_file?.[0]?.buffer;
            data.vac_covid_doc_file = files.vac_covid_doc_file?.[0]?.buffer;
        }
        docEstudianteRepository.merge(doc, data);
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