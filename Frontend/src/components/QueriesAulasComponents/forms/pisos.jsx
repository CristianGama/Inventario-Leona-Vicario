import { useForm } from "react-hook-form";
import { insertSelects } from "../selects";
import { useState, useEffect } from "react";
import { getInstituciones, getEdificios, postPiso } from "../../../endPoints/aulas";

function PisosRegister(){

  const [instituciones, setInstituciones] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [filterInstitucion, setFilterInstitucion] = useState('');

  useEffect(() => {
    getInstituciones().then(result => {
      if (result.loaded){
        setInstituciones(result.data);
        getEdificios().then(result2 => {
          if (result2.loaded){
            setEdificios(result2.data);
          }
        });
      }
    });
  },[]);

  const getFiltersEdificios = (filterInstitucion) => {
    if (filterInstitucion >= 1 && edificios.length > 0){
      return edificios.filter(edificio => {
        return edificio.idInstitucion == filterInstitucion
      });
    }
  }

  const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

  const onSubmit = (data) => {

    const newData = {
      ...data,
      idInstitucion: filterInstitucion,
      estado: 'ACTIVO'
    }
    if (data.nombrePiso.length < 1) { alert('Nombre del piso sin asignar'); return }
    if (!data.idEdificio) { alert('Edificio sin asignar'); return }

    postPiso(newData).then(wasPosted => {
      if (wasPosted){
        alert('Piso Introducido');
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
                      <label className="">Nombre Piso<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('nombrePiso')}
                      className="form-control" type="text" placeholder="Nombre del Piso"/>
                  </div>
                  {
                    instituciones.length > 0 &&
                    <div className="col-3">
                      <label>Institución<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" onChange={e => setFilterInstitucion(e.target.value)}>
                        {insertSelects(instituciones)}
                      </select>
                    </div>
                  }
                  {
                    edificios.length > 0 && filterInstitucion.length > 0 &&
                    <div className="col-3">
                      <label>Edificio<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" {...register('idEdificio')}>
                        {insertSelects(getFiltersEdificios(filterInstitucion))}
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

export default PisosRegister;