import { useState, useEffect } from "react";
import Modal from "../modal";
import { deleteAula, deleteEdificio, deletePiso, deleteInstitucion } from "../../endPoints/aulas";

function Th({columnName}){
  return (
    <th className="align-middle id-row" scope="col">{columnName}</th>
  );
}

function Td({data}){
  return (
    <td className="align-middle text-truncate">{data ? data : '-'}</td>
  );
}

function Tr({dataObject, setDeleteData}){

  const keys = Object.keys(dataObject);

  return (
    <tr>
      {
        keys.map((key) => {
          return <Td key={key} data={dataObject[key]}></Td>
        })
      }
      <td>
        <div className="gap-3 d-md-flex align-items-center">
            <button className="col btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete" onClick={e => setDeleteData(dataObject)}>Eliminar</button>
        </div>
      </td>
    </tr>
  );
}

const deletes = {
  'Aula' : deleteAula,
  'Piso' : deletePiso,
  'Edificio' : deleteEdificio,
  'Institución': deleteInstitucion,
}

//Este se usa en todos los forms (aula, edificios, pisos)
function QueryTable({queryFetch, tittle, text, FormComponent}){
  
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  
  useEffect(() => {
    queryFetch().then(result => {
      if (result.loaded){
        setData(result.data);
      }
    });
  },[queryFetch]);

  const insertRegisters = () => {
    console.log(data)
    const registers = data[1];
    if (registers && registers.length > 0){ 
      let index = 0;
      return registers.map((registerData) => {
        index += 1;
        return <Tr key={index} dataObject={registerData} setDeleteData={setDeleteData}></Tr>
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

  const deleteBuilding = () => {

    deletes[text](deleteData).then((wasDeleted) => {
     if (wasDeleted){
       alert(`${text} Eliminado`);
       location.reload();
     }else {
       alert('Hubo un error, inténtelo de nuevo.');
     }
    });
  }

  return(
      <>
      <Modal idModal='delete' action={deleteBuilding} 
        title={<div className="text-danger">Eliminar <strong>{text}</strong></div>}
        description={<>¿Estás segur@ de eliminar el <strong>{`${text}: ${text == 'Piso' || text == 'Institución' ? deleteData[Object.keys(deleteData)[1]] : deleteData[Object.keys(deleteData)[0]]}`}</strong>? <br/> - Se <strong className="text-danger">ELIMINARÁN</strong> todos los registros que contiene y los <strong className="">MOBILIARIOS</strong> se <strong className="text-danger">MOVERÁN</strong> a <strong className="">SIN ASIGNAR</strong>. </>}
      />

      <div>
      <h2 className="main-name">Registrar {text}</h2>
      <section className="tables">
        <h3 className="table-title">Datos {text}</h3>
        <FormComponent></FormComponent>
      </section>
      </div>

      <h2 className="main-name">{tittle}</h2>
      <section className="tables">
        <h3 className="table-title">Consultas</h3>
        <table className="table table-striped-columns table-sm table-mob">
          <thead>
            <tr>
              {insertColumns()}
              <th className="align-middle id-row" scope="col">OPERACIONES</th>
            </tr>
          </thead>
          <tbody>
            {insertRegisters()}
          </tbody>
        </table>
      </section>
      </>
  );
}

export default QueryTable;