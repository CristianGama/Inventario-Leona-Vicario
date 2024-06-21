const express = require('express');

const connection = require('../connection');

const catalogosMobiliariosRoutes = express.Router();

catalogosMobiliariosRoutes.get('/', (req, res) => {
    connection.execute(`SELECT * FROM catalogo_mobiliario c WHERE c.estado != 'INACTIVO'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

catalogosMobiliariosRoutes.get('/:id', (req, res) => {
    const params = req.params;
    connection.execute(`SELECT * FROM catalogo_mobiliario WHERE idCatalogoMobiliario=${params.id}`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            return (false);
        }
        console.log('Se ha consultado correctamente');
        res.send(results[0]);
    });
});

catalogosMobiliariosRoutes.post('/', (req, res) => {
    const data = req.body;
    connection.execute(`INSERT INTO catalogo_mobiliario (nombreMobiliario, minimoMobiliarios, estado) VALUES('${data.nombreMobiliario}', '${data.minimoMobiliarios}', 'ACTIVO')`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al insertar');
            res.send(false);
            return
        }
        console.log('Se ha insertado correctamente');
        res.send(true);
    });
});

catalogosMobiliariosRoutes.delete('/:id', (req, res) => {
    const params = req.params;
    connection.execute(`UPDATE catalogo_mobiliario SET estado = 'INACTIVO' WHERE idCatalogoMobiliario = ${params.id}`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al eliminar');
            res.send(false);
            return
        }
        console.log('Se ha borrado correctamente');
        res.send(true);
    });
});

module.exports = catalogosMobiliariosRoutes;