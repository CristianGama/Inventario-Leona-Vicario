import { useForm } from "react-hook-form";
import { postInstitucion } from "../../../endPoints/aulas";

function InstitucionesRegister(){

  const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

  const onSubmit = (data) => {

    if (data.nombre.length < 1) { alert('Nombre de la institución sin asignar'); return }

    console.log('jala')
    postInstitucion({...data, estado: 'ACTIVO'}).then(wasPosted => {
      if (wasPosted){
        alert('Institución Introducido');
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
                      <label className="">Nombre Institución<span className="required-asterik"> *</span></label><br/>
                      <input 
                      {...register('nombre')}
                      className="form-control" type="text" placeholder="Nombre del Edificio"/>
                  </div>
                </div>
              </div>
          </article>
          <input className="ms-3 mb-3 btn btn-success" type="submit" value="Registrar"/>
      </form>
      
      </>
  );
}

export default InstitucionesRegister;