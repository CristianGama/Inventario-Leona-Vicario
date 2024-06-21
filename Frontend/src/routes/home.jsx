import { useState, useEffect } from "react";
import RegisterMob from "../components/HomeComponents.jsx/registerMob";
import MenuNavegacion from "../components/menuNavegacion";
import Welcome from "../components/welcome";
import Modal from "../components/modal";

import { getCatalogosMobiliarios, postCatalogoMobiliario, deleteCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";

function Home() {

  const [nameMob, setNameMob] = useState('');
  const [minMob, setMinMob] = useState(1);
  const [filterMob, setFilterMob] = useState('');
  const [deleteMob, setDeleteMob] = useState({});
  const [registersMob, setRegistersMob] = useState({});

  useEffect(() => {
    getCatalogosMobiliarios().then(result => {
      if (result.loaded){
        setRegistersMob(result.data);
      }
    });
  },[]);

  const insertRegisters = () => {
    if (registersMob.length > 0){
      return registersMob.map((registerMob) => {
        return registerMob.nombreMobiliario.toLowerCase().includes(filterMob.toLowerCase()) && <RegisterMob key={registerMob.idCatalogoMobiliario} dataMob={registerMob} setDeleteMob={setDeleteMob}/>
      }); 
    }     
  }

  const addRegisterMob = (e) => {

    if (nameMob.length < 1) { alert('Introduzca el nombre del mobiliario'); return }
    if (minMob < 1) { alert('La cantidad mínima debe ser mayor o igual a 1'); return }

    //En la parte del backend, es necesario que tome el valor de nombreMobiliario
    postCatalogoMobiliario({ nombreMobiliario: nameMob, minimoMobiliarios:  minMob}).then(wasPosted => {
      if (wasPosted){
        alert('Mobiliario Introducido');
        location.reload();
      }else {
        alert('Hubo un error, inténtelo de nuevo.');
      }
    });
    
  }

  const deleteCatalogoMob = () => {
    deleteCatalogoMobiliario(deleteMob.idCatalogoMobiliario).then((wasDeleted) => {
      if (wasDeleted){
        alert('Mobiliario Eliminado');
        location.reload();
      }else {
        alert('Hubo un error, inténtelo de nuevo.');
      }
    });
  }

  return (
    <>
        <Modal idModal='deleteModalMob' action={deleteCatalogoMob} 
        title={<div className="text-danger">Eliminar Mobiliario <strong>{deleteMob.nombreMobiliario}</strong></div>}
        description={<>¿Estás segur@ de eliminar el mobiliario: <strong>{deleteMob.nombreMobiliario}</strong>? <br/> - Se <strong className="text-danger">ELIMINARÁN</strong> todos los registros que contiene. </>}
        />
    
        <div className="logo"></div>
        
        <Welcome titleWelcome='MENÚ CATÁLOGO MOBILIARIO'></Welcome>
        <MenuNavegacion optionSelected={'Mobiliarios'}></MenuNavegacion>

        <main>
            <h2 className="main-name">Registrar Mobiliarios</h2>
            <section className="tables">
                <h3 className="table-title">Datos del Mobiliario</h3>
                <article className="table-form">
                    <form action="" method="post" className="d-flex flex-row">
                        <div className="m-2">
                          <label className="form-label mb-0">Nombre del Mobiliario<span className="required-asterik"> *</span></label><br />
                          <input type="text" value={nameMob} name="name" className="form-control w-90" required placeholder="Nombre del Mobiliario" 
                          onChange={(e) => {setNameMob(e.target.value)}}
                          />
                        </div>
                        <div className="m-2">
                          <label className="form-label mb-0">Cantidad Mínima del Mobiliario<span className="required-asterik"> *</span></label><br />
                          <input type="number" value={minMob} name="name" className="form-control w-25" required
                          onChange={(e) => {setMinMob(e.target.value)}}
                          />
                        </div>
                    </form>
                </article>
                <button 
                className="ms-3 mb-3 btn btn-success"
                onClick={addRegisterMob}
                >
                  Registrar
                </button>
            </section>

            <h2 className="main-name">Mobiliarios</h2>
            <section className="tables">
                <h3 className="table-title">Lista de Mobiliarios</h3>
                <article className="table-form p-2">
                    <input type="text" value={filterMob} name="name" className="form-control w-25 d-inline" required placeholder="Nombre del Mobiliario" 
                      onChange={(e) => {setFilterMob(e.target.value)}}
                    />
                    <label className="form-label d-inline fs-5 ms-2">Búsqueda por nombre del Mobiliario</label>
                </article>
                <table className="table table-striped-columns table-sm table-mob">
                  <thead>
                    <tr>
                      <th className="id-column" scope="col">#</th>
                      <th className= "name-mob-column" scope="col">Nombre del Mobiliario</th>
                      <th className= "stock-mob" scope="col">Cantidad Mínima</th>
                      <th className= "stock-mob" scope="col">Existencias</th>
                      <th className= "assigned-mob" scope="col">Asignados</th>
                      <th className= "unassigned-mob" scope="col">Sin asignar</th>
                      <th className= "amount-mob-damaged" scope="col">Dañados</th>
                      <th className= "operations-mob-column" scope="col">Operaciones</th>
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


export default Home;
