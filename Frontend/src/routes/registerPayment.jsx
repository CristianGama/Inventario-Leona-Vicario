import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GetnetRegister from "../components/PaymentsComponents/getnet";
import EfectivoRegister from "../components/PaymentsComponents/efectivo";
import TransferenciaRegister from "../components/PaymentsComponents/transferencia";

import { getDanoMobiliario } from "../endPoints/danosMobiliarios";
import { getMobiliarioById } from "../endPoints/asignacionMobiliario";

import Welcome from "../components/welcome";
import { getFechaFormateada } from "../../util/fecha";
import { getAdministrativos } from "../endPoints/personas";

function RegisterPayment(){

    const params = useParams();

    const [danoMobiliario, setDanoMobiliario] = useState({});
    const [mobiliario, setMobiliario] = useState({});
    const [registerType, setRegisterType] = useState('Efectivo');
    const [personal, setPersonal] = useState([]);

    useEffect(() => {

        getDanoMobiliario(params.idDanoMob).then(result => {
            if (result.loaded){
              setDanoMobiliario(result.data);
              getMobiliarioById(result.data.idAsignaMobiliario).then((result2) => {
                if (result2.loaded){
                  setMobiliario(result2.data);
                }
              });
            }
          });

        getAdministrativos().then(result => {
            if (result.loaded){
                setPersonal(result.data);
            }
          });
      },[]);

    const registerTypes = {
        'Efectivo': <EfectivoRegister idDanoMobiliario={params.idDanoMob} idCatalogoMobiliario={mobiliario.idCatalogoMobiliario} idLineaMobiliario={mobiliario.idLineaMobiliario} personal={personal}></EfectivoRegister>,
        'Getnet': <GetnetRegister idDanoMobiliario={params.idDanoMob} idCatalogoMobiliario={mobiliario.idCatalogoMobiliario} idLineaMobiliario={mobiliario.idLineaMobiliario} personal={personal}></GetnetRegister>,
        'Transferencia': <TransferenciaRegister idDanoMobiliario={params.idDanoMob} idCatalogoMobiliario={mobiliario.idCatalogoMobiliario} idLineaMobiliario={mobiliario.idLineaMobiliario} personal={personal}></TransferenciaRegister>,
    }
    
    const insertRegisterType = (registerType) => {
        return registerTypes[registerType];
    }

    return(
        <>
        <div className="logo"></div>
        <Welcome titleWelcome='PAGO MOBILIARIO'></Welcome>
        <main>
            <h2 className="main-name">Registrar Pago: <strong>{mobiliario.nombreMobiliario}</strong> </h2>
            <section className="tables">
            {
                Object.keys(mobiliario).length > 0 &&
                <>  
                <h3 className="table-title">Datos del Mueble Dañado</h3>
                <article className="table-form">
                    <div className="container p-2">
                        <div className="row">
                            <div className="col-3">
                                <label className="">Número Mobiliario<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.idLineaMobiliario}/>
                            </div>
                            <div className="col-3">
                                <label className="">Descripción<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.descripcion}/>
                            </div>
                            <div className="col-3">
                                <label className="">Precio Unitario Original<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.precioUniOriginal}/>
                            </div>
                            <div className="col-3">
                                <label className="">IVA<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.iva}/>
                            </div>
                            <div className="col-3">
                                <label className="">Precio Final Compra<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.precioFinalCompra}/>
                            </div>
                            <div className="col-3">
                                <label className="">Fecha de Compra<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="date" value={getFechaFormateada(mobiliario.fechaCompra)}/>
                            </div>
                            <div className="col-3">
                                <label className="">Porcentaje de Depreciación<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.depreciacion}/>
                            </div>
                            <div className="col-3">
                                <label className="">Marca<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.marca}/>
                            </div>
                            <div className="col-3">
                                <label className="">Aula<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={mobiliario.nombreAula}/>
                            </div>
                        </div>
                    </div>
                </article>
                </>
            }

            {
                Object.keys(danoMobiliario).length > 0 &&
                <>  
                <h3 className="table-title">Datos del Pago</h3>
                <article className="table-form">
                    <div className="container p-2">
                        <div className="row">
                            <div className="col-3">
                                <label className="">Responsable<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={danoMobiliario.tipoResponsable}/>
                            </div>
                            <div className="col-3">
                                <label className="">Código del Responsable<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={danoMobiliario.tipoResponsable == 'Alumno' ? danoMobiliario.idAlumno : danoMobiliario.idProfesor}/>
                            </div>
                            <div className="col-3">
                                <label className="">Valor Actual<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={danoMobiliario.valorActual}/>
                            </div>
                            <div className="col-3">
                                <label className="">IVA Actual<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={danoMobiliario.ivaActual}/>
                            </div>
                            <div className="col-3">
                                <label className="">Precio Total Actual<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={danoMobiliario.pagoTotalActual}/>
                            </div>
                            <div className="col-3">
                                <label className="">Fecha de Vencimiento<span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="date" value={getFechaFormateada(danoMobiliario.fechaVencimiento)}/>
                            </div>
                        </div>
                    </div>
                </article>
                </>
            }

                <h3 className="table-title">Tipo de Pago</h3>
                <article className="table-form">
                    <div className="form-check form-check-inline m-2">
                        <input className="form-check-input" type="radio" name="options" id="option1" value='Efectivo' defaultChecked onClick={(e) => {setRegisterType(e.target.value)}}/>
                        <label className="form-check-label" htmlFor="option1">Efectivo</label>
                    </div>
                    <div className="form-check form-check-inline ms-3">
                        <input className="form-check-input" type="radio" name="options" value='Getnet' id="option2" onClick={(e) => {setRegisterType(e.target.value)}}/>
                        <label className="form-check-label" htmlFor="option2">Terminal Getnet</label>
                    </div>
                    <div className="form-check form-check-inline ms-3">
                        <input className="form-check-input" type="radio" name="options" value='Transferencia' id="option3" onClick={(e) => {setRegisterType(e.target.value)}}/>
                        <label className="form-check-label" htmlFor="option3">Transferencia</label>
                    </div>
                </article>

                {insertRegisterType(registerType)}
            </section>
        </main>
        </>
    );
}

export default RegisterPayment;