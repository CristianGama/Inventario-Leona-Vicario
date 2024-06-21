const express = require('express')
const cors = require('cors')

const endpoints = require('./configuration/urls');
const server = require('./configuration/server');

const asignacionMobiliarioRoutes = require('./routes/asignacionMobiliario');
const aulasRoutes = require('./routes/aulas');
const catalogosMobiliariosRoutes = require('./routes/catalogosMobiliarios');
const detalleMobiliarioRoutes = require('./routes/detalleMobiliario');
const consultasRoutes = require('./routes/consultas');
const consultasAulasRoutes = require('./routes/consultasAulas');
const danosMobiliariosRoutes = require('./routes/danosMobiliarios');
const pagosEfectivoRoutes = require('./routes/pagosEfectivo');
const pagosGetNetRoutes = require('./routes/pagosGetnet');
const pagosTransferenciaRoutes = require('./routes/pagosTransferencia');
const personasRoutes = require('./routes/personas');

const app = express();

app.use(express.json());

app.use(cors({
    origin: server.url,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

app.use(endpoints.asignacionMobiliario, asignacionMobiliarioRoutes);
app.use(endpoints.aulas, aulasRoutes);
app.use(endpoints.catalogosMobiliarios, catalogosMobiliariosRoutes);
app.use(endpoints.detalleMobiliario, detalleMobiliarioRoutes);
app.use(endpoints.consultas, consultasRoutes);
app.use(endpoints.consultasAulas, consultasAulasRoutes);
app.use(endpoints.danosMobiliarios, danosMobiliariosRoutes);
app.use(endpoints.pagosEfectivo, pagosEfectivoRoutes);
app.use(endpoints.pagosGetNet, pagosGetNetRoutes);
app.use(endpoints.pagosTransferencia, pagosTransferenciaRoutes);
app.use(endpoints.personas, personasRoutes);

app.listen(server.port, () => {
    //El puerto yo lo puedo escoger
    console.log('Servidor Iniciado en el puerto ' + server.port);
});