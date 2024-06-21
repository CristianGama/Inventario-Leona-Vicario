const express = require('express');

const connection = require('../connection');

const danosMobiliariosRoutes = express.Router();

danosMobiliariosRoutes.get('/:idDanoMobiliario', (req, res) => {
    connection.execute(`SELECT * FROM dano_mobiliario_contado d WHERE d.idDanoMobiliario = ${req.params.idDanoMobiliario}`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results[0]);
    });
});

danosMobiliariosRoutes.post('/', (req, res) => {
    
    const queries = {
        'Profesor': 'INSERT INTO dano_mobiliario_contado(idAsignaMobiliario, idProfesor, valorActual, ivaActual, pagoTotalActual, tipoResponsable, fechaVencimiento) VALUES (?)',
        'Alumno': 'INSERT INTO dano_mobiliario_contado(idAsignaMobiliario, idAlumno, valorActual, ivaActual, pagoTotalActual, tipoResponsable, fechaVencimiento) VALUES (?)'
    }
    
    const data = req.body;
    const tipoResponsable = data.tipoResponsable;
    connection.query(queries[tipoResponsable], [Object.values(data)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
    });
});

module.exports = danosMobiliariosRoutes;