import { useForm } from "react-hook-form";
import { insertSelects } from "../selects";
import { useState, useEffect } from "react";
import { getInstituciones, getEdificios, getPisos, postAula, getAulas } from "../../../endPoints/aulas";

function AulasRegister(){

  const [instituciones, setInstituciones] = useState([]);
  const [edificios, setEdificios] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [aulas, setAulas] = useState([]);
  const [filterInstitucion, setFilterInstitucion] = useState('');
  const [filterEdificios, setFilterEdificios] = useState('');

  useEffect(() => {
    getInstituciones().then(result => {
      if (result.loaded){
        setInstituciones(result.data);
        getEdificios().then(result2 => {
          if (result2.loaded){
            setEdificios(result2.data);
            getPisos().then(result3 => {
              if (result3.loaded){
                setPisos(result3.data);
                getAulas().then(result4 => {
                  if (result4.loaded){
                    setAulas(result4.data);
                  }
                });
              }
            });
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

  const getFiltersPisos = (filterEdificios) => {
    if (filterEdificios >= 1 && pisos.length > 0){
      return pisos.filter(piso => {
        return piso.idEdificio == filterEdificios
      });
    }
  }

  const existsAula = (idAulaCodigo) => {
    if (aulas.length > 0){
      let aulasFiltereds = aulas.filter(aula => {
        return aula.idAulaCodigo == idAulaCodigo
      });
      return aulasFiltereds.length > 0 ? true : false;
    }
    return false
  }

  const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

  const onSubmit = (data) => {
    
    const newData = {
      ...data,
      idEdificio: filterEdificios,
      idInstitucion: filterInstitucion,
      estado: 'ACTIVO'
    }
    if (data.idAulaCodigo == '') { alert('Código de aula sin asignar'); return }
    if (data.idAulaCodigo.length > 4) { alert('El código de aula debe ser de máximo 4 caracteres'); return }
    if (existsAula(data.idAulaCodigo)) { alert('El código del aula ya existe'); return }
    if (data.nombreAula.length < 1) { alert('Nombre del aula sin asignar'); return }
    if (data.cupo < 1) { alert('Cupo sin asignar'); return }
    if (!data.idPiso) { alert('Piso sin asignar'); return }

    postAula(newData).then(wasPosted => {
      if (wasPosted){
        alert('Aula Introducido');
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
                      <label className="">Código Aula<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('idAulaCodigo')}
                      className="form-control" type="text" placeholder="Código del Aula"/>
                  </div>
                  <div className="col-3">
                      <label className="">Nombre Aula<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('nombreAula')}
                      className="form-control" type="text" placeholder="Nombre del Aula"/>
                  </div>
                  <div className="col-3">
                      <label className="">Cupo<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('cupo')}
                      className="form-control" type="text" placeholder="Cupo"/>
                  </div>
                  {
                    instituciones.length > 0 &&
                    <div className="col-3">
                      <label>Institución<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" onChange={e => setFilterInstitucion(e.target.value)} >
                        {insertSelects(instituciones)}
                      </select>
                    </div>
                  }
                  {
                    edificios.length > 0 && filterInstitucion.length > 0 &&
                    <div className="col-3">
                      <label>Edificio<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" onChange={e => {setFilterEdificios(e.target.value)}} >
                        {insertSelects(getFiltersEdificios(filterInstitucion))}
                      </select>
                    </div>
                  }
                  {
                    pisos.length > 0 && filterEdificios.length > 0 &&
                    <div className="col-3">
                      <label>Piso<span className="required-asterik"> *</span></label><br/>
                      <select className="form-select" {...register('idPiso')}>
                        {insertSelects(getFiltersPisos(filterEdificios))}
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

export default AulasRegister;