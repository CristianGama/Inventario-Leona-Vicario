const express = require('express');

const connection = require('../connection');

const aulasRoutes = express.Router();

// AND m.idAsignaMobiliario NOT IN (SELECT dano_mobiliario_contado.idAsignaMobiliario FROM dano_mobiliario_contado)
aulasRoutes.get('/aulas', (req, res) => {
    connection.execute(`
    SELECT 
    a.*,
    (SELECT COUNT(*) FROM 
    asignacion_mobiliario 
    LEFT JOIN
    detalle_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario AND asignacion_mobiliario.idLineaMobiliario = detalle_mobiliario.idLineaMobiliario
    WHERE idAulaCodigo = a.idAulaCodigo AND estado = 'ACTIVO') AS cantidadAsignados
FROM 
    aula a WHERE estado = 'ACTIVO'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

aulasRoutes.post('/aulas', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO aula(idAulaCodigo, nombreAula, cupo, idPiso, idEdificio, idInstitucion, estado) VALUES (?)`
        connection.query(query, [Object.values(data)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
        });
});

aulasRoutes.delete('/aulas', (req, res) => {

    const data = req.body;
    const [idInstitucion, idEdificio, idPiso, idAulaCodigo] = data.idAulaCodigo.split("-"); 
    connection.execute(`UPDATE aula SET estado = 'INACTIVO' WHERE idInstitucion = '${idInstitucion}' AND idEdificio = '${idEdificio}' AND idPiso = '${idPiso}' AND idAulaCodigo = '${idAulaCodigo}'`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha borrado correctamente');
        res.send(true);
    });
});

aulasRoutes.get('/pisos', (req, res) => {
    connection.execute(`SELECT * FROM piso WHERE piso.estado = 'ACTIVO'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

aulasRoutes.post('/pisos', (req, res) => {
    const data = req.body;
    connection.query(`SELECT COUNT(*) AS total_registros FROM piso WHERE idInstitucion = ${data.idInstitucion} AND idEdificio = ${data.idEdificio}`, (err, results) => {
        if (err) {
          console.error('Error al consultar', err);
          res.send(false);
          return;
        }
        const totalRegistros = results[0].total_registros + 1;

        const newData = {
            idPiso: totalRegistros,
            ...data
        }

        const query = `INSERT INTO piso(idPiso, nombrePiso, idEdificio, idInstitucion, estado) VALUES (?)`
        connection.query(query, [Object.values(newData)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
        });
    });
});

aulasRoutes.delete('/pisos', (req, res) => {

    const data = req.body;
    const [idInstitucion, idEdificio, idPiso] = data.idPiso.split("-"); 
    connection.execute(`UPDATE piso SET estado = 'INACTIVO' WHERE idInstitucion = '${idInstitucion}' AND idEdificio = '${idEdificio}' AND idPiso = '${idPiso}'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al eliminar');
            res.send(false);
            return
        }
        console.log('Se ha borrado correctamente');
        res.send(true);
    });
});

aulasRoutes.get('/edificios', (req, res) => {
    connection.execute(`SELECT * FROM edificio WHERE edificio.estado = 'ACTIVO'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

aulasRoutes.post('/edificios', (req, res) => {

    const data = req.body;

    connection.query(`SELECT COUNT(*) AS total_registros FROM edificio WHERE idInstitucion = ${data.idInstitucion}`, (err, results) => {
        if (err) {
          console.error('Error al consultar', err);
          res.send(false);
          return;
        }
        const totalRegistros = results[0].total_registros + 1;

        const newData = {
            idEdificio: totalRegistros,
            ...data
        }

        const query = `INSERT INTO edificio(idEdificio, nombreEdificio, idInstitucion, estado) VALUES (?)`
        connection.query(query, [Object.values(newData)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
        });
    });
});

aulasRoutes.delete('/edificios', (req, res) => {

    const data = req.body;
    const [idInstitucion, idEdificio] = data.idEdificio.split("-"); 
    connection.execute(`UPDATE edificio SET estado = 'INACTIVO' WHERE idInstitucion = '${idInstitucion}' AND idEdificio = '${idEdificio}'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al eliminar');
            res.send(false);
            return
        }
        console.log('Se ha borrado correctamente');
        res.send(true);
    });
});

aulasRoutes.get('/instituciones', (req, res) => {
    connection.execute('SELECT * FROM institucion WHERE estado = "ACTIVO"', (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

aulasRoutes.post('/instituciones', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO institucion(nombre, estado) VALUES (?)`
    connection.query(query, [Object.values(data)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
    });
});

aulasRoutes.delete('/instituciones', (req, res) => {

    const data = req.body;
    const idInstitucion = data.idInstitucion; 
    connection.execute(`UPDATE institucion SET estado = 'INACTIVO' WHERE idInstitucion = '${idInstitucion}'`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha borrado correctamente');
        res.send(true);
    });
});

module.exports = aulasRoutes;