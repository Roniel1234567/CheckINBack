import { Router, Request, Response } from 'express';
import { 
    getAllCiudades,
    getCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad,
    getCiudadesByProvincia
} from '../controllers/Ciudadcontrollers';

const router = Router();

// Get all ciudades
router.get('/', async (req: Request, res: Response) => {
    try {
        await getAllCiudades(req, res);
    } catch (error) {
        console.error('Error getting ciudades:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get ciudad by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        await getCiudadById(req, res);
    } catch (error) {
        console.error('Error getting ciudad by ID:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Create new ciudad
router.post('/', async (req: Request, res: Response) => {
    try {
        await createCiudad(req, res);
    } catch (error) {
        console.error('Error creating ciudad:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Update ciudad
router.put('/:id', async (req: Request, res: Response) => {
    try {
        await updateCiudad(req, res);
    } catch (error) {
        console.error('Error updating ciudad:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Delete ciudad
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await deleteCiudad(req, res);
    } catch (error) {
        console.error('Error deleting ciudad:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Get ciudades by provincia
router.get('/provincia/:provinciaId', async (req: Request, res: Response) => {
    try {
        await getCiudadesByProvincia(req, res);
    } catch (error) {
        console.error('Error getting ciudades by provincia:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router;