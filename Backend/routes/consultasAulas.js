const express = require('express');

const connection = require('../connection');

const consultasAulasRoutes = express.Router();

consultasAulasRoutes.get('/aulas', (req, res) => {

    const query = 'SELECT * FROM vista_aulas'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['CÓDIGO AULA', 'NOMBRE AULA', 'CUPO', 'PISO', 'EDIFICIO', 'INSTITUCIÓN'],
            results
        ]
        res.send(newResults);
    });
});

consultasAulasRoutes.get('/pisos', (req, res) => {

    const query = 'SELECT * FROM vista_pisos'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['ID PISO', 'NOMBRE PISO', 'EDIFICIO', 'INSTITUCIÓN'],
            results
        ]
        res.send(newResults);
    });
});

consultasAulasRoutes.get('/edificios', (req, res) => {

    const query = 'SELECT * FROM vista_edificios'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NÚMERO EDIFICIO', 'NOMBRE EDIFICIO', 'INSTITUCIÓN'],
            results
        ]
        res.send(newResults);
    });
});

consultasAulasRoutes.get('/instituciones', (req, res) => {

    const query = 'SELECT i.idInstitucion, i.nombre FROM institucion i WHERE estado = "ACTIVO" '

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['ID INSTITUCIÓN', 'NOMBRE INSTITUCIÓN',],
            results
        ]
        res.send(newResults);
    });
});

module.exports = consultasAulasRoutes;