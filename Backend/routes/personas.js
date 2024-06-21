const express = require('express');

const connection = require('../connection');

const personasRoutes = express.Router();

personasRoutes.get('/alumnos', (req, res) => {
    connection.execute('SELECT * FROM alumno', (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

personasRoutes.get('/docentes', (req, res) => {
    connection.execute('SELECT * FROM docente', (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

personasRoutes.get('/administrativos', (req, res) => {
    connection.execute('SELECT * FROM personal WHERE clavePersonal = 76112524 OR clavePersonal = 1993083', (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});


module.exports = personasRoutes;