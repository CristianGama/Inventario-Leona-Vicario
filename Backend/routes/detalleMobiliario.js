//Este es para obtener un mobiliario en especifico y agregar mobiliarios

const express = require('express');

const connection = require('../connection');
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');

const upload = multer({
    dest: './images/'
});

const detalleMobiliarioRoutes = express.Router();

detalleMobiliarioRoutes.get('/images/:imageName', (req, res) => {

    const pathImage = path.resolve(__dirname, `../images/${req.params.imageName}`);
    if (fs.existsSync(pathImage)){
        res.sendFile(pathImage)
    }else{
        const pathNoImage = path.resolve(__dirname, `../images/sword.jpg`);
        res.sendFile(pathNoImage);
    }
});

detalleMobiliarioRoutes.get('/:idCatalogoMobiliario/:idLineaMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`SELECT * FROM detalle_mobiliario WHERE idCatalogoMobiliario=${params.idCatalogoMobiliario} AND idLineaMobiliario=${params.idLineaMobiliario};`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al consultar');
            res.send(false);
            return
        }
        console.log('Se ha consultado correctamente');
        res.send(results[0]);
    });
});

detalleMobiliarioRoutes.delete('/:idCatalogoMobiliario/:idLineaMobiliario', (req, res) => {
    const params = req.params;

    connection.execute(`UPDATE detalle_mobiliario SET estado = 'INACTIVO' WHERE idCatalogoMobiliario = ${params.idCatalogoMobiliario} AND idLineaMobiliario = ${params.idLineaMobiliario}`, (err, results, fields) => {
        if (err) {
            console.error('Hubo un error al eliminar');
            res.send(false);
            return
        }
        console.log('Se ha eliminado correctamente');
        res.send(true);
    });
});

detalleMobiliarioRoutes.post('/', upload.single('foto'), (req, res) => {

    const data = req.body;

    connection.query(`SELECT COUNT(*) AS total_registros FROM detalle_mobiliario WHERE idCatalogoMobiliario = ${data.idCatalogoMobiliario}`, (err, results) => {
        if (err) {
          console.error('Error al consultar', err);
          res.send(false);
          return;
        }
        const totalRegistros = results[0].total_registros;

        const imagePath = `./images/${req.file.originalname}`
        fs.renameSync(req.file.path, imagePath);

        function getDatas(dataObject, amountToRegister){

            const dataValues = []
            for (const key in dataObject){
                dataValues.push(dataObject[key]);
            }

            const datas = []
            for(let i=0; i < amountToRegister; i++){
                let newValue = [...dataValues, totalRegistros + i + 1, req.file.originalname]
                datas.push(newValue);
            }

            return datas;
        }

        //El body recibe en un parametro el tipo de registro y la cantidad (cuando es manual,
        // el body no trae cantidad pero se crea un dato de cantidad que es 1)
        const cantidad = data.cantidad || 1

        delete data.cantidad
        delete data.foto

        //Crea en orden de las queries una lista anidada, donde la lista va tener la cantidad de datos a insertar
        // por ejemplo [[a,b], [a,b], [a,b]]
        const datas = getDatas(data, cantidad);

        connection.query(`INSERT INTO detalle_mobiliario (descripcion, fechaCompra, depreciacion, marca, estado, idCatalogoMobiliario, precioUniOriginal, IVA, precioFinalCompra, idLineaMobiliario, foto) VALUES ?`, [datas],(err, results, fields) => {
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

module.exports = detalleMobiliarioRoutes;