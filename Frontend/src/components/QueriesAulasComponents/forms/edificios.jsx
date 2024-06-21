import { useForm } from "react-hook-form";
import { insertSelects } from "../selects";
import { useState, useEffect } from "react";
import { getInstituciones, postEdificio, getEdificios } from "../../../endPoints/aulas";

function EdificiosRegister(){

  const [instituciones, setInstituciones] = useState([]);

  useEffect(() => {
    getInstituciones().then(result => {
      if (result.loaded){
        setInstituciones(result.data);
      }
    });
  },[]);

  const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

  const onSubmit = (data) => {

    if (data.nombreEdificio.length < 1) { alert('Nombre del edificio sin asignar'); return }
    if (!data.idInstitucion) { alert('Institución sin asignar'); return }

    postEdificio({...data, estado: 'ACTIVO'}).then(wasPosted => {
      if (wasPosted){
        alert('Edificio Introducido');
        location.reload();
      }else {
        alert('Hubo un error, inténtelo de nuevo.');
      }
    });
  }

  return (
      <>
      <form onSubmit={handleSubmit(onSubmit)}>
          <article className="table-form">
              <div className="container p-2">
                <div className="row">
                  <div className="col-3">
                      <label className="">Nombre Edificio<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('nombreEdificio')}
                      className="form-control" type="text" placeholder="Nombre del Edificio"/>
                  </div>
                  {
                    instituciones.length > 0 &&
                    <div className="col-3">
                      <label>Institución<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" {...register('idInstitucion')}>
                        {insertSelects(instituciones)}
                      </select>
                    </div>
                  }
                </div>
              </div>
          </article>
          <input className="ms-3 mb-3 btn btn-success" type="submit" value="Registrar"/>
      </form>
      
      </>
  );
}

export default EdificiosRegister;