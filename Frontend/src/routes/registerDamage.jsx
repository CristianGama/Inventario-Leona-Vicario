import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { getCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";
import { getMobiliario, updateAsignacionForAulaById } from "../endPoints/asignacionMobiliario";
import { postDanoMobiliario } from "../endPoints/danosMobiliarios";
import { getAulas } from "../endPoints/aulas";
import { getAlumnos, getDocentes } from "../endPoints/personas";

import Welcome from "../components/welcome";
import { getFechaFormateada } from "../../util/fecha";

function Option( {idOption, nombreOption} ){
    return(
        <option className="" value={idOption}>{nombreOption}</option>
    );
}

const responsableTypes = {
    Alumno: getAlumnos,
    Profesor: getDocentes
}

function RegisterDamage(){

    const params = useParams();

    const [catalogoMobiliario, setCatalogoMobiliario] = useState({});
    const [mobiliario, setMobiliario] = useState({});
    const [ivaActual, setIvaActual] = useState(0);
    const [priceActual, setPriceActual] = useState(0);
    const [aulas, setAulas] = useState([]);
    const [responsableType, setFilterResponsable] = useState('Alumno');
    const [responsables, setResponsables] = useState([]);
    const [responsableFilter, setResponsableFilter] = useState('');
    let keysMobiliario = Object.keys(mobiliario).length;
    let pagoTotal = (parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) > 0 ? parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) : 0);
    useEffect(() => {
        getAulas().then(result => {
            if (result.loaded){
              setAulas(result.data);
            }
          });
        getCatalogoMobiliario(params.idMob).then(result => {
          if (result.loaded){
            setCatalogoMobiliario(result.data);
          }
        });
        getAlumnos().then(result => {
            if (result.loaded){
                setResponsables(result.data)
            }
        })
      },[]);

    useEffect(() => {
        getMobiliario(params.idMob, params.idLineaMob).then((result) => {
            if (result.loaded){
              setMobiliario(result.data);
            }
          });
      },[catalogoMobiliario]);

    const insertAulas = () => {
      return aulas.map((registerAula) => {
        return <Option key={registerAula.idAulaCodigo} idOption={registerAula.idAulaCodigo} nombreOption={`${registerAula.idAulaCodigo} (${registerAula.nombreAula}) (${registerAula.cantidadAsignados >= registerAula.cupo ? 'Lleno' : ('Disponible: ' + (registerAula.cupo - registerAula.cantidadAsignados))})`}></Option>
      });
    }
    
    const { register, formState: { errors }, handleSubmit, watch, setValue, reset } = useForm();

    const onSubmit = (data) => {

        const fechaCompra = new Date(mobiliario.fechaCompra);
        const fechaVencimiento = new Date(data.fechaVencimiento);
        fechaCompra.setMonth(fechaCompra.getMonth() + 1);

        if (fechaCompra >= fechaVencimiento){
            alert("La fecha debe ser de mínimo un mes")
            return
        }

        const isValidResponsable = responsables.filter(responsable => {
            if (responsableType == "Alumno"){
                return responsable.numControl.toString() == responsableFilter
            }else if(responsableType == "Profesor"){
                return responsable.claveDocente.toString() == responsableFilter
            }
        })
        if (isValidResponsable.length < 1) { alert('Código del responsable no encontrado'); return }
        if (priceActual < 1) { alert('Introduzca el valor actual'); return }
        if (!data.fechaVencimiento || data.fechaVencimiento == '') { alert('Introduzca la fecha de vencimiento'); return }
        

        const newAula = data.idAula;
        const newData = {
            idAsignaMobiliario: mobiliario.idAsignaMobiliario,
            idResponsable: responsableFilter,
            valorActual: parseInt(priceActual),
            ivaActual: parseInt(ivaActual),
            pagoTotalActual: pagoTotal,
            ...data
        }

        delete newData.idAula;
        
        postDanoMobiliario(newData).then(wasPosted => {
            if (wasPosted){

                updateAsignacionForAulaById(mobiliario.idAsignaMobiliario, {newAula: newAula});
                
                alert('Daño Registrado');
                location.href = `/registros/${catalogoMobiliario.idCatalogoMobiliario}`
                return false;
            }else {
              alert('Hubo un error, inténtelo de nuevo.');
            }
        });
    }

    return(
        <>
        <div className="logo"></div>
        <Welcome titleWelcome='DAÑO MOBILIARIO'></Welcome>
        <main>
            <h2 className="main-name">Registrar Daño: <strong>{catalogoMobiliario.nombreMobiliario}</strong> </h2>
            <section className="tables">
                <h3 className="table-title">Datos del Mueble</h3>
                <article className="table-form">
                    <div className="container p-2">
                        <div className="row">
                            {keysMobiliario > 1 &&
                            <>
                                <div className="col-3">
                                <label className="">Número Mobiliario: <span className="required-asterik"> *</span></label><br/>
                                <input disabled
                                className="form-control" type="text" value={params.idLineaMob}/>
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
                            </>
                            }
                            
                        </div>
                    </div>
                </article>

                <h3 className="table-title">Datos del Daño</h3>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <article className="table-form">
                        <div className="container p-2">
                            <div className="row">
                                <div className="col-3">
                                    <label>Responsable<span className="required-asterik"> *</span></label><br/>
                                    <select className="form-select" {...register('tipoResponsable')} defaultValue='Alumno'
                                    onChange={e => {
                                        responsableTypes[e.target.value]().then(result => {
                                            if (result.loaded){
                                                setFilterResponsable(e.target.value);
                                                setResponsables(result.data)
                                            }
                                        })
                                    }
                                    }>
                                        <option className="" value='Alumno'>Alumno</option>
                                        <option className="" value='Profesor'>Profesor</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label className="">Nombre o Código del {responsableType} <span className="required-asterik"> *</span></label><br/>
                                    <div className="dropup-center dropup"> 
                                        <input 
                                            className="dropdown-toggle form-control" type="text" data-bs-toggle="dropdown"
                                            onChange={e => setResponsableFilter(e.target.value)}
                                            value={responsableFilter}
                                        />
                                        <ul className="dropdown-menu">
                                            {
                                                responsables.length > 0 &&
                                                
                                                responsables.map((responsable, key) => {
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
                                <div className="col-3">
                                    <label className="">Valor Actual <span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    onChange={e => setPriceActual(e.target.value)}
                                    className="form-control" type="number" placeholder="Valor Actual"/>
                                </div>
                                <div className="col-3">
                                    <label className="">IVA Actual <span className="required-asterik"> *</span></label><br/>
                                    <input
                                    onChange={(e) => {setIvaActual((e.target.value > 0 ? e.target.value : 0))}}
                                    className="form-control" type="number" placeholder="IVA actual"/>
                                </div>
                                <div className="col-3">
                                    <label className="">Pago Total del Daño <span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    disabled
                                    className="form-control" type="text" value={pagoTotal}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Fecha de Vencimiento <span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('fechaVencimiento')}
                                    className="form-control" type="date" />
                                </div>
                                <div className="col-3">
                                  <label>Depósito<span className="required-asterik"> *</span></label><br/>
                                  <select className="form-select" {...register('idAula')}>
                                    {aulas && insertAulas()}
                                  </select>
                              </div>
                            </div>
                        </div>
                    </article>

                    <input className="ms-3 mb-2 btn btn-success" type="submit" value="Registrar Daño"/>
                    <Link className="ms-1 mb-2 btn btn-primary" to={`/registros/${catalogoMobiliario.idCatalogoMobiliario}`}>Regresar A {catalogoMobiliario.nombreMobiliario}</Link>
                </form>
            </section>
        </main>
        </>
    );
}

export default RegisterDamage;