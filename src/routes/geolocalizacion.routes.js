import { Router } from 'express';
import {getGeolocalizaciones,getGeolocalizacionxId,postGeolocalizacion,putGeolocalizacion,patchGeolocalizacion,deleteGeolocalizacion} from '../controladores/geolocalizacionCtrl.js';

const router = Router();

// Definición de las rutas
router.get('/geolocalizacion', getGeolocalizaciones); // Obtener geolocalizaciones
router.get('/geolocalizacion/:id', getGeolocalizacionxId); // Obtener geolocalización por ID
router.post('/geolocalizacion', postGeolocalizacion); // Crear nueva geolocalización
router.put('/geolocalizacion/:id', putGeolocalizacion); // Actualizar geolocalización por ID
router.patch('/geolocalizacion/:id', patchGeolocalizacion); // Actualizar campos específicos
router.delete('/geolocalizacion/:id', deleteGeolocalizacion); // Eliminar geolocalización por ID

export default router;