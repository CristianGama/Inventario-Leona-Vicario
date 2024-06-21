import { useParams, Link } from "react-router-dom";

function RegisterMobiliario({asignacionMobiliario, dataMob, setDeleteMob}){
  return(
    <tr>
      <td className="align-middle">{asignacionMobiliario.idCatalogoMobiliario}-{asignacionMobiliario.idLineaMobiliario}</td>
        <td className="align-middle id-row">{asignacionMobiliario.idDanoMobiliario == null ? '❌' : '✅'}</td>
        <td>
          <div className="d-grid gap-3 justify-content-md-center d-md-flex btn-register">
              <Link className="col btn btn-success" to={`/modificar/${asignacionMobiliario.idCatalogoMobiliario}/${asignacionMobiliario.idLineaMobiliario}`}>Modificar</Link>
              {asignacionMobiliario.idDanoMobiliario == null ?
              <Link className="col btn btn-warning" to={`/registrar-dano/${asignacionMobiliario.idCatalogoMobiliario}/${asignacionMobiliario.idLineaMobiliario}`}>Registrar Daño</Link> :
              <Link className="col btn btn-primary" to={`/registrar-pago/${asignacionMobiliario.idDanoMobiliario}`}>Registrar Pago</Link>
              }
              <button className="col btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModalRegister" onClick={(e) => {setDeleteMob(dataMob)}}>Eliminar</button>
          </div>
      </td>
    </tr>
  );

}

const insertRegistersMobiliario = (asignacionesAula, setDeleteMob) => {
  return asignacionesAula.map((asignacionMobiliario) => {
    return <RegisterMobiliario key={asignacionMobiliario.idAsignaMobiliario} asignacionMobiliario={asignacionMobiliario} dataMob={asignacionMobiliario} setDeleteMob={setDeleteMob}></RegisterMobiliario>
  });
}

function AulaTable ({registerAula, asignacionesAula, setDeleteMob}){
    return (
        <section className="tables m-2">
            <h3 className=" m-2 ps-1"> <strong className="">Salón:</strong> <span className="border-bottom border-dark border-2">{registerAula.nombreAula}</span><br/>
                                        <strong className="">Cantidad:</strong> <span className="border-bottom border-dark border-2">{asignacionesAula.length}</span><br/>
                                        <strong className="">Cupo:</strong> <span className="border-bottom border-dark border-2">{registerAula.cupo}</span> </h3>
            <table className="table table-striped-columns table-sm table-mob">
              <thead>
                <tr>
                  <th className= "name-mob-column" scope="col">Identificador Mobiliario</th>
                  <th className= "amount-mob-damaged" scope="col">Dañado</th>
                  <th className= "operations-mob-column" scope="col">Operaciones</th>
                </tr>
              </thead>
              <tbody>
                  {insertRegistersMobiliario(asignacionesAula, setDeleteMob)}
              </tbody>
            </table>
        </section>
    );
}

export default AulaTable;