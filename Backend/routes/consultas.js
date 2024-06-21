const express = require('express');

const connection = require('../connection');

const consultasRoutes = express.Router();

consultasRoutes.get('/notificaciones', (req, res) => {

    const query = 'SELECT * FROM vista_notificaciones'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

consultasRoutes.get('/deudores-alumnos', (req, res) => {

    const query = 'SELECT * FROM vista_deudores_alumnos'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE ALUMNO', 'VALOR ACTUAL',
            'IVA ACTUAL', 'PAGO TOTAL ACTUAL', 'FECHA VENCIMIENTO'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/efectivo-alumnos', (req, res) => {

    const query = 'SELECT * FROM vista_efectivo_alumnos'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE ALUMNO', 'MONTO TOTAL PAGO',
            'FECHA PAGO', 'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/getnet-alumnos', (req, res) => {

    const query = 'SELECT * FROM vista_getnet_alumnos'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE ALUMNO', 'BANCO',
            'NÚM. OPERACIÓN', 'NÚM. AUTORIZACIÓN', 'TERMINO TARJETA', 'MONTO PAGO', 'CONCEPTO', 'FECHA PAGO', 
            'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/transferencia-alumnos', (req, res) => {

    const query = 'SELECT * FROM vista_transferencia_alumnos'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE ALUMNO', 'BANCO',
            'CLAVE RASTREO', 'DETALLES', 'MONTO PAGO', 'CONCEPTO', 'FECHA PAGO', 
            'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/deudores-docentes', (req, res) => {

    const query = 'SELECT * FROM vista_deudores_docentes'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE DOCENTE', 'VALOR ACTUAL',
            'IVA ACTUAL', 'PAGO TOTAL ACTUAL', 'FECHA VENCIMIENTO'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/efectivo-docentes', (req, res) => {

    const query = 'SELECT * FROM vista_efectivo_docentes'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE DOCENTE', 'MONTO TOTAL PAGO',
            'FECHA PAGO', 'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/getnet-docentes', (req, res) => {

    const query = 'SELECT * FROM vista_getnet_docentes'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE DOCENTE', 'BANCO',
            'NÚM. OPERACIÓN', 'NÚM. AUTORIZACIÓN', 'TERMINO TARJETA', 'MONTO PAGO', 'CONCEPTO', 'FECHA PAGO', 
            'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/transferencia-docentes', (req, res) => {

    const query = 'SELECT * FROM vista_transferencia_docentes'

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'NOMBRE DOCENTE', 'BANCO',
            'CLAVE RASTREO', 'DETALLES', 'MONTO PAGO', 'CONCEPTO', 'FECHA PAGO', 
            'NOMBRE COBRADOR'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/mobiliarios-ups', (req, res) => {

    const query = `SELECT \
    catalogo_mobiliario.nombreMobiliario, \
    detalle_mobiliario.idLineaMobiliario, \
    detalle_mobiliario.foto, \
    detalle_mobiliario.descripcion, \
    detalle_mobiliario.precioUniOriginal, \
    detalle_mobiliario.iva, \
    detalle_mobiliario.precioFinalCompra, \
    detalle_mobiliario.fechaCompra, \
    detalle_mobiliario.depreciacion, \
    detalle_mobiliario.marca, \
    aula.nombreAula\
    FROM \
    catalogo_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON catalogo_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    asignacion_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario and catalogo_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    aula ON asignacion_mobiliario.idAulaCodigo = aula.idAulaCodigo \
    WHERE catalogo_mobiliario.estado != 'INACTIVO' AND \
    detalle_mobiliario.estado != 'INACTIVO'
    ORDER BY catalogo_mobiliario.nombreMobiliario`

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'FOTO', 'DESCRIPCIÓN', 'PRECIO ORIGINAL', 'IVA',
            'PRECIO FINAL', 'FECHA DE COMPRA', 'DEPRECIACIÓN', 'MARCA', 'AULA'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/mobiliarios-downs', (req, res) => {
    const query = `SELECT \
    catalogo_mobiliario.nombreMobiliario, \
    detalle_mobiliario.idLineaMobiliario, \
    detalle_mobiliario.foto, \
    detalle_mobiliario.descripcion, \
    detalle_mobiliario.precioUniOriginal, \
    detalle_mobiliario.iva, \
    detalle_mobiliario.precioFinalCompra, \
    detalle_mobiliario.fechaCompra, \
    detalle_mobiliario.depreciacion, \
    detalle_mobiliario.marca \
    FROM \
    catalogo_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON catalogo_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario\
    WHERE catalogo_mobiliario.estado = 'INACTIVO' OR detalle_mobiliario.estado = 'INACTIVO' \
    ORDER BY catalogo_mobiliario.nombreMobiliario`

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'FOTO', 'DESCRIPCIÓN', 'PRECIO ORIGINAL', 'IVA',
            'PRECIO FINAL', 'FECHA DE COMPRA', 'DEPRECIACIÓN', 'MARCA'],
            results
        ]
        res.send(newResults);
    });
});

consultasRoutes.get('/mobiliarios-aulas', (req, res) => {

    const query = `SELECT \
    aula.nombreAula, \
    catalogo_mobiliario.nombreMobiliario, \
    detalle_mobiliario.idLineaMobiliario, \
    detalle_mobiliario.foto, \
    detalle_mobiliario.descripcion, \
    detalle_mobiliario.precioUniOriginal, \
    detalle_mobiliario.iva, \
    detalle_mobiliario.precioFinalCompra, \
    detalle_mobiliario.fechaCompra, \
    detalle_mobiliario.depreciacion, \
    detalle_mobiliario.marca \
    FROM \
    catalogo_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON catalogo_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    asignacion_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario and catalogo_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    aula ON asignacion_mobiliario.idAulaCodigo = aula.idAulaCodigo \
    WHERE catalogo_mobiliario.estado != 'INACTIVO' AND \
    detalle_mobiliario.estado != 'INACTIVO' \
    ORDER BY aula.nombreAula`

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        const newResults = [
            ['AULA', 'NOMBRE MOBILIARIO', 'CÓDIGO MOBILIARIO', 'FOTO', 'DESCRIPCIÓN', 'PRECIO ORIGINAL', 'IVA',
            'PRECIO FINAL', 'FECHA DE COMPRA', 'DEPRECIACIÓN', 'MARCA'],
            results
        ]
        res.send(newResults);
    });
});

module.exports = consultasRoutes;