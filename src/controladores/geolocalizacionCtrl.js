import { conmysql } from '../db.js';

// Obtener todos los registros
export const getGeolocalizaciones = async (req, res) => {
    try {
      const [result] = await conmysql.query('SELECT * FROM Geolocalizacion');
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las geolocalizaciones' });
    }
  };

// Obtener un registro por ID
export const getGeolocalizacionxId = async (req, res) => {
    try {
        const [result] = await conmysql.query('SELECT * FROM Geolocalizacion WHERE geo_id = ?', [req.params.id]);
        if (result.length <= 0) {
            return res.status(404).json({ message: 'Geolocalización no encontrada' });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Crear un nuevo registro
export const postGeolocalizacion = async (req, res) => {
    try {
        //let { latitud, longitud, titulo, propietario, cedula, medicion } = req.body;

        

        const { latitud, longitud, titulo, propietario, cedula, medicion} = req.body;
        // Si el campo `fecha` no está definido o está vacío, asignar `null`
        /* if (!fecha) {
            fecha = null; // Permitir que MySQL use `DEFAULT CURRENT_TIMESTAMP`
        } */
        const [result] = await conmysql.query(
            'INSERT INTO Geolocalizacion (latitud, longitud, titulo, propietario, cedula, medicion) VALUES (?, ?, ?, ?, ?, ?)',
            [latitud, longitud, titulo, propietario, cedula, medicion]
        );
        res.status(201).json({ id: result.insertId, message: 'Geolocalización guardada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al guardar la geolocalización', error: error.message });
    }
};


// Actualizar un registro por ID (reemplazo completo)
export const putGeolocalizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { latitud, longitud, titulo, propietario, cedula, medicion, fecha } = req.body;
        const [result] = await conmysql.query(
            'UPDATE Geolocalizacion SET latitud = ?, longitud = ?, titulo = ?, propietario = ?, cedula = ?, medicion = ?, fecha = ? WHERE geo_id = ?',
            [latitud, longitud, titulo, propietario, cedula, medicion, fecha, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Geolocalización no encontrada' });
        }

        const [rows] = await conmysql.query('SELECT * FROM Geolocalizacion WHERE geo_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Actualizar campos específicos
export const patchGeolocalizacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { latitud, longitud, titulo, propietario, cedula, medicion, fecha } = req.body;
        const [result] = await conmysql.query(
            'UPDATE Geolocalizacion SET latitud = IFNULL(?, latitud), longitud = IFNULL(?, longitud), titulo = IFNULL(?, titulo), propietario = IFNULL(?, propietario), cedula = IFNULL(?, cedula), medicion = IFNULL(?, medicion), fecha = IFNULL(?, fecha) WHERE geo_id = ?',
            [latitud, longitud, titulo, propietario, cedula, medicion, fecha, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: 'Geolocalización no encontrada' });
        }

        const [rows] = await conmysql.query('SELECT * FROM Geolocalizacion WHERE geo_id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};

// Eliminar un registro por ID
export const deleteGeolocalizacion = async (req, res) => {
    try {
        const [rows] = await conmysql.query('DELETE FROM Geolocalizacion WHERE geo_id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: 'No se pudo eliminar la geolocalización' });
        }
        res.sendStatus(202);
    } catch (error) {
        return res.status(500).json({ message: 'Error del lado del servidor' });
    }
};