import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postPagoGetnet } from "../../endPoints/pagos/getnet";

function GetnetRegister({idDanoMobiliario, idCatalogoMobiliario, idLineaMobiliario, personal}){

    const [responsableFilter, setResponsableFilter] = useState('');

    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

    const onSubmit = (data) => {

        if (data.nombreBanco.length < 1) { alert('Introduzca el nombre del banco'); return }
        if (data.numOperacion < 1) { alert('Introduzca el número de operación'); return }
        if (data.numAutorizacion < 1) { alert('Introduzca el número de autorización'); return }
        if (data.terminacionTarjeta.length < 1) { alert('Introduzca la terminación de la tarjeta'); return }
        if (isNaN(parseFloat(data.montoPagoGetnet))) { alert('Introduzca el monto de pago'); return }
        if (data.conceptoTransaccion.length < 1) { alert('Introduzca el concepto de transacción'); return }
        if (!data.fechaTransaccion || data.fechaTransaccion == '') { alert('Introduzca la fecha de la transacción'); return }
        if (data.idPersonalCobrador.length < 8) { alert('Introduzca el código del cobrador'); return }

        const isValidResponsable = personal.filter(responsable => {
            return responsable.clavePersonal.toString() == responsableFilter
        })
        if (isValidResponsable.length < 1) { alert('Código del responsable no encontrado'); return }

        const newData = {
            idDanoMobiliario: idDanoMobiliario,
            ...data,
            idPersonalCobrador: responsableFilter
        }
        postPagoGetnet(newData).then(wasPosted => {
            if (wasPosted){
                
                alert('Pago Registrado');
                location.href = `/registros/${idCatalogoMobiliario}`
                return false;
            }else {
              alert('Hubo un error, inténtelo de nuevo.');
            }
        });
    }

    return (
        <>
        <h3 className="table-title">Terminal GetNet</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <article className="table-form">
                <div className="container p-2">
                    <div className="row">
                        <div className="col-3">
                            <label className="">Nombre del Banco <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('nombreBanco')}
                            className="form-control" type="text" placeholder="Nombre del Banco"/>
                        </div>
                        <div className="col-3">
                            <label className="">Número de Operación <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('numOperacion')}
                            className="form-control" type="number" placeholder="Número de Operación"/>
                        </div>
                        <div className="col-3">
                            <label className="">Número de Autorización <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('numAutorizacion')}
                            className="form-control" type="number" placeholder="Número de Autorización"/>
                        </div>
                        <div className="col-3">
                            <label className="">Terminación de la Tarjeta <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('terminacionTarjeta')}
                            className="form-control" type="text" placeholder="Terminación de la Tarjeta"/>
                        </div>
                        <div className="col-3">
                            <label className="">Monto de Pago <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('montoPagoGetnet')}
                            className="form-control" type="text" placeholder="Monto"/>
                        </div>
                        <div className="col-3">
                            <label className="">Concepto de Transacción <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('conceptoTransaccion')}
                            className="form-control" type="text" placeholder="Concepto de Transacción"/>
                        </div>
                        <div className="col-3">
                            <label className="">Fecha de Transacción <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('fechaTransaccion')}
                            className="form-control" type="date" />
                        </div>
                        <div className="col-3">
                        <label className="">Nombre o Código del Personal/Cobrador <span className="required-asterik"> *</span></label><br/>
                            <div className="dropup-center dropup"> 
                                <input 
                                    className="dropdown-toggle form-control" type="text" data-bs-toggle="dropdown"
                                    onChange={e => setResponsableFilter(e.target.value)}
                                    value={responsableFilter}
                                />
                                <ul className="dropdown-menu">
                                    {
                                        personal.length > 0 &&
                                        
                                        personal.map((responsable, key) => {
                                            const values = Object.values(responsable)
                                            const responsableName = `(${values[0]}) ${values[1]} ${values[2]} ${values[3]}`
                                            return responsableName.toLowerCase().includes(responsableFilter.toLowerCase()) &&
                                             <li key={key}><button className="dropdown-item" onClick={
                                                e => {
                                                    e.preventDefault();
                                                    setResponsableFilter(values[0].toString());
                                                }
                                            }>{responsableName}</button></li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <input className="ms-3 mb-2 btn btn-success" type="submit" value="Realizar Pago"/>
            <Link className="ms-1 mb-2 btn btn-primary" to={`/`}>Regresar A Mobiliarios</Link>
        
        </form>

        
        </>
    );
}

export default GetnetRegister;