import React from 'react';
import Home from './routes/home';
import Queries from './routes/queries';
import Registers from './routes/registers';
import Register from './routes/register';
import Assign from './routes/assign';
import Modify from './routes/modify';
import Notifications from './routes/notifications';
import RegisterDamage from './routes/registerDamage';
import Aulas from './routes/aulas';
import RegisterPayment from './routes/registerPayment';

import { createBrowserRouter } from 'react-router-dom';

import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/registros/:idMob",
    element: <Registers></Registers>
  },
  {
    path: "/registrar/:idMob",
    element: <Register></Register>
  },
  {
    path: "/asignar/:idMob",
    element: <Assign></Assign>
  },
  {
    path: "/modificar/:idMob/:idLineaMob",
    element: <Modify></Modify>
  },
  {
    path: "/registrar-dano/:idMob/:idLineaMob",
    element: <RegisterDamage></RegisterDamage>
  },
  {
    path: "/registrar-pago/:idDanoMob",
    element: <RegisterPayment></RegisterPayment>
  },
  {
    path: "/consultas",
    element: <Queries></Queries>
  },
  {
    path: "/notificaciones",
    element: <Notifications></Notifications>
  },
  {
    path: "/aulas",
    element: <Aulas></Aulas>
  }
]);

export default router;
