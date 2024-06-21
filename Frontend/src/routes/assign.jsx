import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getAulas } from "../endPoints/aulas";
import { getCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";
import { getMobiliariosFromCatalogo, getSinAsignacionesFromCatalogo, postAsignacionToAula } from "../endPoints/asignacionMobiliario";

import Welcome from "../components/welcome";

function Option( {idOption, nombreOption} ){
    return(
        <option className="" value={idOption}>{nombreOption}</option>
    );
}

let selecteds = []
function UnAssigedMobiliario({mobiliario, selected}){
  
  const [select, setSelect] = useState(selected);

  useEffect(() => {
    setSelect(selected);
  }, [selected]);

  const selectedType = {
    false: {
      emoji: '❌',
      text: 'Seleccionar',
      button: 'btn-success'
    },
    true: {
      emoji: '✅',
      text: 'Deseleccionar',
      button: 'btn-danger'
    }
  }

  if (select){
    if (!selecteds.includes(mobiliario.idLineaMobiliario)){
      selecteds = [...selecteds, mobiliario.idLineaMobiliario];
    }
    
  }else{
    const newMobiliariosSelected = selecteds.filter((idLineaMobiliario) => {
      return idLineaMobiliario !== mobiliario.idLineaMobiliario
    });
    selecteds = newMobiliariosSelected;
  }

  return(
    <tr>
      <td className="align-middle">{mobiliario.idCatalogoMobiliario}-{mobiliario.idLineaMobiliario}</td>
      <td className="align-middle id-row">{selectedType[select].emoji}</td>
      <td className="d-flex justify-content-center">
        <button className={`btn ${selectedType[select].button} w-50`} onClick={(e) => {setSelect(!select);}}>
          {selectedType[select].text}
        </button>
      </td>
    </tr>
  );
}

function Assign(){

  const [aulas, setAulas] = useState([]);
  const [catalogoMobiliario, setCatalogoMobiliario] = useState({});
  const [mobiliarios, setMobiliarios] = useState([]);
  const [sinAsignacionesMobiliarios, setSinAsignacionesMobiliarios] = useState([]);
  const [mobiliariosMinUnassigned, setMobiliariosMinUnassigned] = useState(0);
  const [mobiliariosMaxUnassigned, setMobiliariosMaxUnassigned] = useState(0);
  const [reRender, setReRender] = useState(1);

  const params = useParams();

  const { register, formState: { errors }, handleSubmit,   } = useForm({defaultValues: {idAula:'A1'}});

  const onSubmit = (data) => {
    
    const idsLineasMobiliariosToAssign = mobiliarios.filter((mobiliario) => {
      return selecteds.includes(mobiliario.idLineaMobiliario) && mobiliario.idAsignaMobiliario == null;
    })
    .map(mobiliario => {
      return mobiliario.idLineaMobiliario;
    } );

    const assignedsWithoutAula = mobiliarios.filter((mobiliario) => {
      return selecteds.includes(mobiliario.idLineaMobiliario) && mobiliario.idAsignaMobiliario != null && mobiliario.idAulaCodigo == null;
    })
    .map(mobiliario => {
      return mobiliario.idAsignaMobiliario;
    } );

    const newData = {idsLineasMobiliariosToAssign: idsLineasMobiliariosToAssign, ...data, idCatalogoMobiliario: catalogoMobiliario.idCatalogoMobiliario, assignedsWithoutAula}

    let aulaInfo = getAulaInfo( data.idAula )
    if (!aulaInfo) { alert('Seleccione el aula.'); return }
    let aulaCupo = aulaInfo.cupo
    let aulaAsignados = aulaInfo.cantidadAsignados

    if (selecteds.length < 1) { alert('Seleccione al menos un mobiliario'); return }
    if (selecteds.length + aulaAsignados > aulaCupo) { alert(`La asignación excede el cupo: ${selecteds.length + aulaAsignados}/${aulaCupo}`); return }
    
    postAsignacionToAula(newData).then((wasPosted) => {
      if (wasPosted){
        alert('Asignación Completado');
        location.reload();
      }else {
        alert('Hubo un error, inténtelo de nuevo');
      }
    });
  }

  useEffect(() => {
    getCatalogoMobiliario(params.idMob).then(result => {
      if (result.loaded){
        setCatalogoMobiliario(result.data);
      }
    });
    getMobiliariosFromCatalogo(params.idMob).then(result => {
      if (result.loaded){
        setMobiliarios(result.data);
      }
    });
    getAulas().then(result => {
      if (result.loaded){
        setAulas(result.data);
      }
    });
    getSinAsignacionesFromCatalogo(params.idMob).then(result => {
      if (result.loaded){
        setSinAsignacionesMobiliarios(result.data);
      }
    });
  },[]);

  const getAulaInfo = (idAula) => {
    return aulas.filter(aula => {
      return idAula == aula.idAulaCodigo
    })[0]
  }

  const insertAulas = () => {
      return aulas.map((registerAula) => {
        return <Option key={registerAula.idAulaCodigo} idOption={registerAula.idAulaCodigo} nombreOption={`${registerAula.idAulaCodigo} (${registerAula.nombreAula}) (${registerAula.cantidadAsignados >= registerAula.cupo ? 'Lleno' : ('Disponible: ' + (registerAula.cupo - registerAula.cantidadAsignados))})`}></Option>
      });
  }

  const insertMobiliariosUnassigned = () => {
    if (sinAsignacionesMobiliarios){
      return sinAsignacionesMobiliarios.map((mobiliario) => {
        return <UnAssigedMobiliario key={mobiliario.idLineaMobiliario} mobiliario={mobiliario} selected={selecteds.includes(mobiliario.idLineaMobiliario)}></UnAssigedMobiliario>
      });
    }
  }

  const insertMinMobiliariosUnassigned = () => {
    if (sinAsignacionesMobiliarios){
      return sinAsignacionesMobiliarios.map((mobiliario) => {
        return <Option key={mobiliario.idLineaMobiliario} idOption={mobiliario.idLineaMobiliario} nombreOption={mobiliario.idLineaMobiliario}></Option>
      });
    }
  }

  const insertMaxMobiliariosUnassigned = () => {
    if (sinAsignacionesMobiliarios){
      return sinAsignacionesMobiliarios.map((mobiliario) => {
        return (mobiliario.idLineaMobiliario > mobiliariosMinUnassigned) && <Option key={mobiliario.idLineaMobiliario} idOption={mobiliario.idLineaMobiliario} nombreOption={mobiliario.idLineaMobiliario}></Option>
      });
    }
  }

  const selectMobiliariosUnassigned = () => {
    if (sinAsignacionesMobiliarios){
      const mobiliariosSelected = sinAsignacionesMobiliarios.filter((mobiliario) => {
        return (mobiliario.idLineaMobiliario >= mobiliariosMinUnassigned && mobiliario.idLineaMobiliario <= mobiliariosMaxUnassigned && !selecteds.includes(mobiliario.idLineaMobiliario))
      })
      .map(mobiliario => mobiliario.idLineaMobiliario);
  
      selecteds = [...selecteds, ...mobiliariosSelected];
      //Al darle click en select, hago un re render para que seleccione los mobiliarios
      setReRender(reRender + 1);
    }
  }

  return(
      <>
      <div className="logo"></div>
      <Welcome titleWelcome='ASIGNACIÓN MOBILIARIO'></Welcome>
      <main>
          <h2 className="m-0 main-name">Mobiliario: <strong>{catalogoMobiliario.nombreMobiliario}</strong> </h2>
          <h2 className="mt-0 main-name">Cantidad Disponible para Asignar: <strong>{sinAsignacionesMobiliarios.length}</strong> </h2>
          <section className="tables">
              
              <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="table-title">Datos de la Asignación</h3>
                  <article className="table-form">
                      <div className="container p-2">
                          <div className="row">
                              <div className="col-3">
                                  <label>Aula<span className="required-asterik"> *</span></label><br/>
                                  <select className="form-select" {...register('idAula')}>
                                    {aulas && insertAulas()}
                                  </select>
                              </div>
                              
                          </div>
                      </div>
                  </article>
                  <input className="ms-3 mb-2 btn btn-success" type="submit" value="Asignar" name="name" />
                  <Link className="ms-1 mb-2 btn btn-primary" to={`/`}>Regresar A Mobiliarios</Link>
              </form>
                  <h3 className="table-title">Selección Múltiple</h3>
                  <article className="table-form">
                      <div className="container p-2">
                          <div className="row">
                              <div className="col-3">
                                  <label>Mínimo<span className="required-asterik"> *</span></label><br/>
                                  <select className="form-select" onChange={e => {setMobiliariosMinUnassigned(e.target.value)}}>
                                    {insertMinMobiliariosUnassigned()}
                                  </select>
                              </div>
                              <div className="col-3">
                                  <label>Máximo<span className="required-asterik"> *</span></label><br/>
                                  <select className="form-select" onChange={e => {setMobiliariosMaxUnassigned(e.target.value)}}>
                                    {insertMaxMobiliariosUnassigned()}
                                  </select>
                              </div>
                              <div className="col-3">
                                  <label><span className="required-asterik"></span></label><br/>
                                  <button className="btn btn-success" onClick={e => {selectMobiliariosUnassigned()}}>Seleccionar</button>
                              </div>
                              
                          </div>
                      </div>
                  </article>

              <h3 className="table-title">Mobiliarios sin Asignar</h3>
              <section className="tables m-2">
                <table className="table table-striped-columns table-sm table-mob m-2">
                  <thead>
                    <tr>
                      <th className= "name-mob-column" scope="col">Identificador Mobiliario</th>
                      <th className= "text-center name-mob-column" scope="col">Seleccionado</th>
                      <th className= "operations-mob-column" scope="col">Operaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  {insertMobiliariosUnassigned()}
                  </tbody>
                </table>
              </section>
              
          </section>
      </main>
      </>
  );
}

export default Assign;