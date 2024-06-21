import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postPagoTransferencia } from "../../endPoints/pagos/transferencia";

function TransferenciaRegister({idDanoMobiliario, idCatalogoMobiliario, idLineaMobiliario, personal}){

    const [responsableFilter, setResponsableFilter] = useState('');

    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

    const onSubmit = (data) => {

        if (data.nomBanco.length < 1) { alert('Introduzca el nombre del banco'); return }
        if (isNaN(parseFloat(data.claveRastreo))) { alert('Introduzca la clave de rastreo'); return }
        if (data.detalleTransaccion.length < 1) { alert('Introduzca el detalle de la transacción'); return }
        if (isNaN(parseFloat(data.montoPagoTransferencia))) { alert('Introduzca el monto de pago'); return }
        if (data.conceptoPago.length < 1) { alert('Introduzca el concepto de pago'); return }
        if (!data.fechaTransferencia || data.fechaTransferencia == '') { alert('Introduzca la fecha de transferencia'); return }
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
        postPagoTransferencia(newData).then(wasPosted => {
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
        <h3 className="table-title">Transferencia</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <article className="table-form">
                <div className="container p-2">
                    <div className="row">
                        <div className="col-3">
                            <label className="">Nombre del Banco <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('nomBanco')}
                            className="form-control" type="text" placeholder="Nombre del Banco"/>
                        </div>
                        <div className="col-3">
                            <label className="">Clave de Rastreo <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('claveRastreo')}
                            className="form-control" type="text" placeholder="Clave de Rastreo"/>
                        </div>
                        <div className="col-3">
                            <label className="">Detalle de la Transacción <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('detalleTransaccion')}
                            className="form-control" type="text" placeholder="Detalle de la Transacción"/>
                        </div>
                        <div className="col-3">
                            <label className="">Monto de Pago <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('montoPagoTransferencia')}
                            className="form-control" type="number" placeholder="Monto"/>
                        </div>
                        <div className="col-3">
                            <label className="">Concepto de Pago <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('conceptoPago')}
                            className="form-control" type="text" placeholder="Concepto de Pago"/>
                        </div>
                        <div className="col-3">
                            <label className="">Fecha de Transferencia<span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('fechaTransferencia')}
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

export default TransferenciaRegister;