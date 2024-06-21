import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMobiliariosFromCatalogo, getAsignacionesFromCatalogo, getSinAsignacionesFromCatalogo, getDamagesFromCatalogo } from "../../endPoints/asignacionMobiliario";

function RegisterMob({dataMob, setDeleteMob}){

  const [mobiliarios, setMobiliarios] = useState({});
  const [asignacionesMobiliarios, setAsignacionesMobiliarios] = useState({});
  const [sinAsignacionesMobiliarios, setSinAsignacionesMobiliarios] = useState([]);
  const [damagesMobiliarios, setDamagesMobiliarios] = useState([]);
  const hasMobiliarios = mobiliarios.length > 0;
  
  useEffect(() => {
    
    getMobiliariosFromCatalogo(dataMob.idCatalogoMobiliario).then((result) => {
      if (result.loaded){
        setMobiliarios(result.data);
      }
    });
    getAsignacionesFromCatalogo(dataMob.idCatalogoMobiliario).then((result) => {
      if (result.loaded){
        setAsignacionesMobiliarios(result.data);
      }
    });
    getSinAsignacionesFromCatalogo(dataMob.idCatalogoMobiliario).then((result) => {
      if (result.loaded){
        setSinAsignacionesMobiliarios(result.data);
      }
    });
    getDamagesFromCatalogo(dataMob.idCatalogoMobiliario).then((result) => {
      if (result.loaded){
        setDamagesMobiliarios(result.data);
      }
    });
  }, []);
  
  return (
    <tr>
      <th className="align-middle id-row" scope="row">{dataMob.idCatalogoMobiliario}</th>
      <td className="align-middle">{dataMob.nombreMobiliario}</td>
      <td className="align-middle id-row">{dataMob.minimoMobiliarios}</td>
      <td className="align-middle id-row">{hasMobiliarios ? (asignacionesMobiliarios.length + sinAsignacionesMobiliarios.length).toString() : 0}</td>
      <td className="align-middle id-row">{hasMobiliarios ? asignacionesMobiliarios.length : 0}</td>
      <td className="align-middle id-row">{ hasMobiliarios ? sinAsignacionesMobiliarios.length : 0}</td>
      <td className="align-middle id-row">{ hasMobiliarios ? damagesMobiliarios.length : 0}</td>
      <td>
        <div className="gap-3 d-md-flex align-items-center">
            <Link className="col btn btn-secondary" to={`/registros/${dataMob.idCatalogoMobiliario}`}>Consultar</Link>
            <Link className="col btn btn-success" to={`/registrar/${dataMob.idCatalogoMobiliario}`}>Registrar</Link>
            <Link className="col btn btn-primary" to={`/asignar/${dataMob.idCatalogoMobiliario}`}>Asignar</Link>
            <button className="col btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModalMob" onClick={(e) => {setDeleteMob(dataMob)}}>Eliminar</button>
        </div>
      </td>
    </tr>
  );
}

export default RegisterMob;
