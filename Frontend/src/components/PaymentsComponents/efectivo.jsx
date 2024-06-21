import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postPagoEfectivo } from "../../endPoints/pagos/efectivo";
import { useState } from "react";

function EfectivoRegister({idDanoMobiliario, idCatalogoMobiliario, idLineaMobiliario, personal}){

    const [responsableFilter, setResponsableFilter] = useState('');

    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

    const onSubmit = (data) => {

        if (!data.fechaPagoEfectivo || data.fechaPagoEfectivo == '') { alert('Introduzca la fecha de pago'); return }
        if (isNaN(parseFloat(data.montoTotalPago))) { alert('Introduzca el monto total de pago'); return }
        const isValidResponsable = personal.filter(responsable => {
            return responsable.clavePersonal.toString() == responsableFilter
        })
        if (isValidResponsable.length < 1) { alert('Código del responsable no encontrado'); return }

        const newData = {
            idDanoMobiliario: idDanoMobiliario,
            ...data,
            idPersonalCobrador: responsableFilter
        }
        postPagoEfectivo(newData).then(wasPosted => {
            if (wasPosted){
                
                alert('Pago Registrado');
                location.href = `/registros/${idCatalogoMobiliario}`
                return false;
            }else {
              alert('Hubo un error, inténtelo de nuevo.');
            }
        });
        //Al realizar el pago que elimine el detalle mobiliario con asignacion y dano y solamente se quede el efectivo
    }

    return (
        <>
        <h3 className="table-title">Efectivo</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <article className="table-form">
                <div className="container p-2">
                    <div className="row">
                        <div className="col-3">
                            <label className="">Fecha de Pago <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('fechaPagoEfectivo')}
                            className="form-control" type="date" />
                        </div>
                        <div className="col-3">
                            <label className="">Monto de Pago <span className="required-asterik"> *</span></label><br/>
                            <input 
                            {...register('montoTotalPago')}
                            className="form-control" type="text" placeholder="Monto"/>
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

export default EfectivoRegister;