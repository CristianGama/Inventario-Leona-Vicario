const express = require('express');

const connection = require('../connection');

const pagosEfectivoRoutes = express.Router();

pagosEfectivoRoutes.post('/', (req, res) => {
    const data = req.body;
    const query = `INSERT INTO tpag_efectivo_PM(idDanoMobiliario, fechaPagoEfectivo, montoTotalPago, idPersonalCobrador) VALUES (?);`
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

module.exports = pagosEfectivoRoutes;
