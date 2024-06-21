//Este es para obtener todos los mobiliarios de un catalogo y para asignar un mobiliario

const express = require('express');

const connection = require('../connection');

const asignacionMobiliarioRoutes = express.Router();

//Extrae todos los mobiliarios
asignacionMobiliarioRoutes.get('/', (req, res) => {

    connection.execute(`SELECT asignacion_mobiliario.idAsignaMobiliario, asignacion_mobiliario.idAulaCodigo, detalle_mobiliario.idLineaMobiliario, detalle_mobiliario.idCatalogoMobiliario, dano_mobiliario_contado.idDanoMobiliario FROM asignacion_mobiliario RIGHT JOIN detalle_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario AND detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \
    RIGHT JOIN \
    catalogo_mobiliario ON detalle_mobiliario.idCatalogoMobiliario = catalogo_mobiliario.idCatalogoMobiliario \
    WHERE \
    catalogo_mobiliario.estado != 'INACTIVO' AND detalle_mobiliario.estado != 'INACTIVO' \
    AND detalle_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

//Extrae todos los mobiliarios asignados o no de un catalogo
asignacionMobiliarioRoutes.get('/:idCatalogoMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT asignacion_mobiliario.idAsignaMobiliario, asignacion_mobiliario.idAulaCodigo, detalle_mobiliario.idLineaMobiliario, detalle_mobiliario.idCatalogoMobiliario, \
    dano_mobiliario_contado.idDanoMobiliario \
    FROM asignacion_mobiliario RIGHT JOIN detalle_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = ${params.idCatalogoMobiliario} AND detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \ 
    LEFT JOIN \
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
   WHERE \
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND \
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND \
     tpag_transferencia_PM.idDanoMobiliario IS NULL \
    AND detalle_mobiliario.idCatalogoMobiliario = ${params.idCatalogoMobiliario} AND detalle_mobiliario.estado != 'INACTIVO'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

//Extrae todas las asignaciones danadas de un catalogo
asignacionMobiliarioRoutes.get('/damages/:idCatalogoMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT asignacion_mobiliario.idAsignaMobiliario, asignacion_mobiliario.idAulaCodigo, detalle_mobiliario.idLineaMobiliario, detalle_mobiliario.idCatalogoMobiliario \
    FROM \
    asignacion_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario AND detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario \
    LEFT JOIN \
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
   WHERE \
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND \
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND \
     tpag_transferencia_PM.idDanoMobiliario IS NULL \
     AND detalle_mobiliario.estado != 'INACTIVO' \
     AND asignacion_mobiliario.idCatalogoMobiliario = ${params.idCatalogoMobiliario} \
    AND \
    asignacion_mobiliario.idAsignaMobiliario IN (SELECT dano_mobiliario_contado.idAsignaMobiliario FROM dano_mobiliario_contado)`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

//Extrae todos los mobiliarios asignados de un catalogo junto a los danados
asignacionMobiliarioRoutes.get('/assigned-damageds/:idCatalogoMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT asignacion_mobiliario.*, dano_mobiliario_contado.idDanoMobiliario \
    FROM asignacion_mobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario \
    LEFT JOIN \
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    detalle_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario AND detalle_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario \
   WHERE \
   detalle_mobiliario.estado != 'INACTIVO' AND \
     asignacion_mobiliario.idCatalogoMobiliario=${params.idCatalogoMobiliario} AND \
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND \
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND \
     tpag_transferencia_PM.idDanoMobiliario IS NULL`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

//Extrae todos los mobiliarios asignados de un catalogo sin los danados
asignacionMobiliarioRoutes.get('/assigned/:idCatalogoMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT asignacion_mobiliario.* \ 
    FROM asignacion_mobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \
    LEFT JOIN \
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    detalle_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario AND detalle_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario \
   WHERE \
   detalle_mobiliario.estado != 'INACTIVO' AND \
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND \
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND \
     tpag_transferencia_PM.idDanoMobiliario IS NULL \
    AND asignacion_mobiliario.idCatalogoMobiliario=${params.idCatalogoMobiliario} AND dano_mobiliario_contado.idDanoMobiliario IS NULL AND asignacion_mobiliario.idAulaCodigo IS NOT NULL`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});


asignacionMobiliarioRoutes.get('/unassigned/:idCatalogoMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT asignacion_mobiliario.idAsignaMobiliario, asignacion_mobiliario.idAulaCodigo, detalle_mobiliario.idLineaMobiliario, detalle_mobiliario.idCatalogoMobiliario FROM asignacion_mobiliario RIGHT JOIN detalle_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = ${params.idCatalogoMobiliario} AND detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario \
    LEFT JOIN \
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \
    LEFT JOIN \
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
    LEFT JOIN \
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = dano_mobiliario_contado.idDanoMobiliario \
   WHERE \
   detalle_mobiliario.estado != 'INACTIVO' AND \
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND \
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND \
     tpag_transferencia_PM.idDanoMobiliario IS NULL \
    AND detalle_mobiliario.idCatalogoMobiliario = ${params.idCatalogoMobiliario} AND asignacion_mobiliario.idAulaCodigo IS NULL`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results);
    });
});

asignacionMobiliarioRoutes.get('/assigned-by-id/:idAsignaMobiliario', (req, res) => {
    const params = req.params;

    const query = `SELECT \
    asignacion_mobiliario.idAsignaMobiliario, \
    catalogo_mobiliario.idCatalogoMobiliario, \
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
    aula.nombreAula, \
    dano_mobiliario_contado.idDanoMobiliario\
    FROM \
    catalogo_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON catalogo_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    asignacion_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario and detalle_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario \
    LEFT JOIN\
    aula ON asignacion_mobiliario.idAulaCodigo = aula.idAulaCodigo\
    LEFT JOIN\
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \
    WHERE asignacion_mobiliario.idAsignaMobiliario=${params.idAsignaMobiliario}`

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results[0]);
    });
});

asignacionMobiliarioRoutes.put('/assigned-by-id/:idAsignaMobiliario', (req, res) => {
    const params = req.params;
    const data = req.body;
    const query = `UPDATE asignacion_mobiliario SET idAulaCodigo = '${data.newAula}' WHERE idAsignaMobiliario = ${params.idAsignaMobiliario}`
    connection.query(query, [Object.values(data)],(err, results, fields) => {
        if (err) {
            console.error('Hubo un error al actualizar');
            console.error(err);
            res.send(false);
            return
        }
        res.send(true);
    });
});


asignacionMobiliarioRoutes.get('/:idCatalogoMobiliario/:idLineaMobiliario', (req, res) => {
    const params = req.params;

    const query = `SELECT \
    asignacion_mobiliario.idAsignaMobiliario, \
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
    aula.nombreAula, \
    dano_mobiliario_contado.idDanoMobiliario\
    FROM \
    catalogo_mobiliario \
    RIGHT JOIN \
    detalle_mobiliario ON catalogo_mobiliario.idCatalogoMobiliario = detalle_mobiliario.idCatalogoMobiliario\
    LEFT JOIN\
    asignacion_mobiliario ON detalle_mobiliario.idLineaMobiliario = asignacion_mobiliario.idLineaMobiliario and detalle_mobiliario.idCatalogoMobiliario = asignacion_mobiliario.idCatalogoMobiliario \
    LEFT JOIN\
    aula ON asignacion_mobiliario.idAulaCodigo = aula.idAulaCodigo\
    LEFT JOIN\
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario  \
    WHERE asignacion_mobiliario.idCatalogoMobiliario=${params.idCatalogoMobiliario} AND asignacion_mobiliario.idLineaMobiliario=${params.idLineaMobiliario}`

    connection.execute(query, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results[0]);
    });
});

asignacionMobiliarioRoutes.post('/', (req, res) => {
    const data = req.body;
    const idsLineasMobiliariosToAssign = data.idsLineasMobiliariosToAssign;
    const idCatalogoMobiliario = data.idCatalogoMobiliario;
    const idAula = data.idAula;
    const assignedsWithoutAula = data.assignedsWithoutAula;

    const datas = []
    for(let i=0; i < idsLineasMobiliariosToAssign.length; i++){
        datas.push([
            idAula,
            idsLineasMobiliariosToAssign[i],
            idCatalogoMobiliario
        ]);
    }

    if (datas.length > 0 ){
        connection.query('INSERT INTO asignacion_mobiliario (idAulaCodigo, idLineaMobiliario, idCatalogoMobiliario) VALUES ?', [datas], (err, results, fields) => {
            if (err) {
                console.error(err);
                res.send(false);
                return
            }
            console.log('Se ha insertado correctamente');
            res.send(true);
        });
    }

    if (assignedsWithoutAula.length > 0){
        connection.execute(`UPDATE asignacion_mobiliario SET idAulaCodigo = '${idAula}' WHERE idAsignaMobiliario IN (${assignedsWithoutAula.join(', ')});`, (err, results, fields) => {
            if (err) {
                console.error('Hubo un error al asignar');
                res.send(false);
                return
            }
            console.log('Se ha insertado correctamente');
            res.send(true);
        });
    }
    
});

asignacionMobiliarioRoutes.post('/modify', (req, res) => {

    const data = req.body;
    
    connection.execute(`UPDATE detalle_mobiliario SET descripcion = '${data.descripcion}', depreciacion = '${data.depreciacion}', marca = '${data.marca}',  precioUniOriginal = '${data.precioUniOriginal}', IVA = '${data.IVA}', precioFinalCompra = '${data.precioFinalCompra}' WHERE idLineaMobiliario = '${data.idLineaMobiliario}' AND idCatalogoMobiliario = '${data.idCatalogoMobiliario}'`, (err, results, fields) => {
        if (err) {
            console.error(err);
            res.send(false);
            return
        }
        console.log('Modificacion completada');
    });

    connection.execute(`UPDATE asignacion_mobiliario SET idAulaCodigo = '${data.idAula}' WHERE idAsignaMobiliario = '${data.idAsignaMobiliario}'`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al modificar');
            res.send(false);
            return
        }
        console.log('Modificacion completada');
        res.send(true);
    });
});

module.exports = asignacionMobiliarioRoutes;