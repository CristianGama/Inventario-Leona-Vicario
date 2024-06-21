import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AulaTable from "../components/RegistersComponents/aulaTable";
import Modal from "../components/modal";

import { getAulas } from "../endPoints/aulas";
import { getCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";
import { getAsignacionesWithDamagesFromCatalogo, getMobiliario } from "../endPoints/asignacionMobiliario";
import { deleteDetalleMobiliario } from "../endPoints/detalleMobiliario";

import Welcome from "../components/welcome";

function AulaOption({registerAula, setFiltroAulas, filtroAulas}) {
  const addFilterAula = (e) => {
    if (e.target.checked){
      setFiltroAulas([...filtroAulas, e.target.value]);
    }else {
      const index = filtroAulas.indexOf(e.target.value);
      if (index > -1){
        const newFilter = filtroAulas.filter((idAula) => {
          return idAula !== filtroAulas[index]
        });
        setFiltroAulas(newFilter);
      }
    }
  }
  return (
    <div className="form-check col-3">
      <input className="form-check-input" type="checkbox" value={registerAula.idAulaCodigo} id={registerAula.idAulaCodigo} onClick={addFilterAula}/>
      <label className="form-check-label" htmlFor={registerAula.idAulaCodigo}>{registerAula.idAulaCodigo} ({registerAula.nombreAula})</label>
    </div>
  );
}

function Registers(){

  const params = useParams();
  const [aulas, setAulas] = useState([]);
  const [catalogoMobiliario, setCatalogoMobiliario] = useState({});
  const [filtroAulas, setFiltroAulas] = useState([]);
  const [asignacionMobiliario, setAsignacionMobiliario] = useState([]);
  const [deleteMob, setDeleteMob] = useState({});

  useEffect(() => {
    getCatalogoMobiliario(params.idMob).then(result => {
      if (result.loaded){
        setCatalogoMobiliario(result.data);
      }
    });
    getAsignacionesWithDamagesFromCatalogo(params.idMob).then(result => {
      if (result.loaded){
        setAsignacionMobiliario(result.data);
      }
    });
    getAulas().then(result => {
      if (result.loaded){
        setAulas(result.data);
      }
    });
  },[]);

  const insertAulasOption = () => {
    return aulas.map((registerAula) => {
      return <AulaOption key={registerAula.idAulaCodigo} registerAula={registerAula} setFiltroAulas={setFiltroAulas} filtroAulas={filtroAulas}></AulaOption>
    });
  }

  const deleteRegister = () => {
    deleteDetalleMobiliario(deleteMob.idCatalogoMobiliario, deleteMob.idLineaMobiliario).then(wasDeleted => {
      if (wasDeleted){
        alert('Registro Borrado.');
        location.reload();
      }else {
        alert('Hubo un error, inténtelo de nuevo.');
      }
    });
  }

  const insertAulasTable = () => {
    if (filtroAulas.length > 0){

      return filtroAulas.map((idAula) => {

        //Esto filtra el registro del aula
        const registerAula = aulas.filter((aula) => {
          return idAula === aula.idAulaCodigo
        })[0];

        const asignacionesAula = asignacionMobiliario.filter((mobiliario) => {
          return mobiliario.idAulaCodigo === registerAula.idAulaCodigo
        });

        return <AulaTable key={registerAula.idAulaCodigo} registerAula={registerAula} asignacionesAula={asignacionesAula} setDeleteMob={setDeleteMob}></AulaTable>
      });
    }else{      
      return aulas.map((registerAula) => {

        const asignacionesAula = asignacionMobiliario.filter((mobiliario) => {
          return mobiliario.idAulaCodigo === registerAula.idAulaCodigo
        });

        return <AulaTable key={registerAula.idAulaCodigo} registerAula={registerAula} asignacionesAula={asignacionesAula} setDeleteMob={setDeleteMob}></AulaTable>
      });
    }
  }

    return (
        <>
      <div className="logo"></div>

        <Modal idModal='deleteModalRegister' action={deleteRegister} 
        title={<div className="text-danger">Eliminar Registro de <strong>{catalogoMobiliario.nombreMobiliario}</strong></div>}
        description={<>¿Estás segur@ de eliminar el registro: <strong>{deleteMob.idLineaMobiliario}</strong>?</>}
        />

        <Welcome titleWelcome='MENÚ CATÁLOGO MOBILIARIO'></Welcome>
        <main>
            <h2 className="main-name">Registros: <strong>{catalogoMobiliario.nombreMobiliario}</strong></h2>
            <section className="tables">
            <Link className="m-3 mb-1 btn btn-primary" to={`/`}>Regresar A Mobiliarios</Link>
              <section className="tables m-2">
                <h3 className="table-title m-2">Búsqueda por Salones</h3>
                <form className="container px-5 pb-2">
                  <div className="row">
                    {insertAulasOption()}
                  </div>
                </form>
              </section>
            {insertAulasTable()}
          </section>
        </main>
    </>
    );
}

export default Registers;