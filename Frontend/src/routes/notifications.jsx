import { useState, useEffect } from "react";

import MenuNavegacion from "../components/menuNavegacion";
import Welcome from "../components/welcome";
import { getNotificaciones } from "../endPoints/consultas";

function Td({data}){
  return (
    <td className="align-middle text-truncate">{data}</td>
  );
}

function Tr({dataObject}){

  const keys = Object.keys(dataObject);

  return (
    <tr>
      {
        keys.map((key) => {
          if (key == 'nombreMobiliario'){
            return <Td key={key} data={`${dataObject[key].toUpperCase()} requiere MÁS mobiliarios.`}></Td>
          }
          return <Td key={key} data={dataObject[key]}></Td>
        })
      }
    </tr>
  );
}

function Notifications(){

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    getNotificaciones().then(result => {
      if (result.loaded){
        setNotificaciones(result.data);
      }
    });
  },[]);

  const insertRegisters = () => {
    if (notificaciones && notificaciones.length > 0){ 
      return notificaciones.map((registerData, index) => {
        return <Tr key={index} dataObject={registerData}></Tr>
      });
    }
  }

  return(
      <>
      <div className="logo"></div>
      <Welcome titleWelcome='NOTIFICACIONES MOBILIARIOS'></Welcome>
      <MenuNavegacion optionSelected={'Notificaciones'}></MenuNavegacion>
      <main>
          <h2 className="main-name">Notificaciones</h2>
          <section className="tables">
              <table className="table table-striped-columns table-sm table-mob mt-3">
                <thead>
                  <tr>
                    <th className="id-column" scope="col">#</th>
                    <th className= "name-mob-column" scope="col">Mensaje</th>
                    <th className= "stock-mob" scope="col">Cantidad Requerida</th>
                    <th className= "stock-mob" scope="col">Cantidad Actual</th>
                  </tr>
                </thead>
                <tbody>
                  {insertRegisters()}
                </tbody>
              </table>
          </section>
      </main>
      </>
  );

}

export default Notifications;