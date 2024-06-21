const express = require('express');

const connection = require('../connection');

const pagosTransferenciaRoutes = express.Router();

pagosTransferenciaRoutes.post('/', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO tpag_transferencia_PM(idDanoMobiliario, nomBanco, claveRastreo, detalleTransaccion, montoPagoTransferencia, conceptoPago, fechaTransferencia, idPersonalCobrador) VALUES (?);`
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

module.exports = pagosTransferenciaRoutes;
