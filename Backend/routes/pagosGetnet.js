const express = require('express');

const connection = require('../connection');

const pagosGetNetRoutes = express.Router();

pagosGetNetRoutes.post('/', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO tpag_terminal_getnet_PM(idDanoMobiliario, nombreBanco, numOperacion, numAutorizacion, terminacionTarjeta, montoPagoGetnet, conceptoTransaccion, fechaTransaccion, idPersonalCobrador) VALUES (?);`
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

module.exports = pagosGetNetRoutes;
