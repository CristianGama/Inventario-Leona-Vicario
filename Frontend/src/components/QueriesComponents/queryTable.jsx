/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { urlOriginal } from "../../endPoints/urls";
import { getFechaFormateada } from "../../../util/fecha";

function Th({columnName}){
  return (
    <th className="align-middle id-row" scope="col">{columnName}</th>
  );
}

const dataTypes = {
  0: 0
}
function Td({data}){
  return (
    <td className="align-middle text-truncate">{Object.values(dataTypes).includes(data) || data ? data : '-'}</td>
  );
}

function Tr({dataObject}){

  const keys = Object.keys(dataObject);

  return (
    <tr>
      {
        keys.map((key, i) => {
          if (key == 'foto'){
            return <td key={i}><a target="_blank" href={`${urlOriginal}/detalle-mobiliario/images/${dataObject[key]}`} className="btn bg-success text-light border border-light">Mostrar</a></td>
          }else if(key == 'fechaCompra' || key == "fechaPagoEfectivo" || key == "fechaTransferencia" || key == "fechaTransaccion" || key == "fechaVencimiento"){
            let newFecha = getFechaFormateada(dataObject[key]);
            return <Td key={i} data={newFecha}></Td>
          }
          return <Td key={i} data={dataObject[key]}></Td>
        })
      }
    </tr>
  );
}

function QueryTable({queryFetch}){

  const [data, setData] = useState([]);

  useEffect(() => {
    queryFetch().then(result => {
      if (result.loaded){
        setData(result.data);
      }
    });
  },[queryFetch]);

  const insertRegisters = () => {
    const registers = data[1];
    if (registers && registers.length > 0){ 
      let index = 0;
      return registers.map((registerData) => {
        index += 1;
        return <Tr key={index} dataObject={registerData}></Tr>
      });
    }
  }
  const insertColumns = () => {
    const columns = data[0];
    if (columns && columns.length > 0){
      let index = 0;
      return columns.map((columnName) => {
        index += 1;
        return <Th key={index} columnName={columnName}></Th>
        
      });
    }
  }

  return(
      <table className="table table-striped-columns table-sm table-mob">
        <thead>
          <tr>
            {insertColumns()}
          </tr>
        </thead>
        <tbody>
          {insertRegisters()}
        </tbody>
      </table>
  );
}

export default QueryTable;