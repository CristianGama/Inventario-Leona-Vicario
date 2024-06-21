import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";
import { getMobiliario, modifyAsignacion } from "../endPoints/asignacionMobiliario";
import { getAulas } from "../endPoints/aulas";

import Welcome from "../components/welcome";

function Option( {idOption, nombreOption} ){
    return(
        <option className="" value={idOption}>{nombreOption}</option>
    );
}

function Modify(){

    const [catalogoMobiliario, setCatalogoMobiliario] = useState({});
    const [mobiliario, setMobiliario] = useState({});
    const [aulas, setAulas] = useState([]);
    const [ivaActual, setIvaActual] = useState(0);
    const [priceActual, setPriceActual] = useState(0);
    let pagoTotal = (parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) > 0 ? parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) : 0);
    let pagoTotalActual = (parseInt(mobiliario.precioUniOriginal) + ((parseInt(mobiliario.precioUniOriginal)*parseInt(mobiliario.iva))/100) > 0 ? parseInt(mobiliario.precioUniOriginal) + ((parseInt(mobiliario.precioUniOriginal)*parseInt(mobiliario.iva))/100) : 0)
    const params = useParams();
    
    useEffect(() => {
        getCatalogoMobiliario(params.idMob).then(result => {
          if (result.loaded){
            setCatalogoMobiliario(result.data);
          }
        });
        getAulas().then(result => {
            if (result.loaded){
              setAulas(result.data);
            }
          });
      },[]);

    useEffect(() => {
        getMobiliario(params.idMob, params.idLineaMob).then((result) => {
            if (result.loaded){
              setMobiliario(result.data);
            }
          });
      },[catalogoMobiliario]);
    
    const { register, formState: { errors }, handleSubmit, watch, setValue, reset, getValues } = useForm();

    const getAulaInfo = (idAula) => {
        return aulas.filter(aula => {
          return idAula == aula.idAulaCodigo
        })[0]
      }

    const onSubmit = (data) => {

        const newData = {
            idAsignaMobiliario: mobiliario.idAsignaMobiliario,
            idCatalogoMobiliario: params.idMob,
            idLineaMobiliario: params.idLineaMob, 
            descripcion: data.descripcion || mobiliario.descripcion,
            // fechaCompra: mobiliario.fechaCompra,
            depreciacion: data.depreciacion || mobiliario.depreciacion,
            marca: data.marca || mobiliario.marca,
            precioUniOriginal: priceActual || mobiliario.precioUniOriginal, 
            IVA: ivaActual || 0, 
            precioFinalCompra: pagoTotal || pagoTotalActual,
            idAula: data.idAula
        }

        if (newData.descripcion.length < 1) { alert('Introduzca una descripción'); return }
        if (newData.descripcion.length > 100) { alert('La descripción debe tener menos de 100 caracteres'); return }
        if (newData.precioUniOriginal < 1) { alert('El precio unitario debe ser mayor o igual a 1'); return }
        // if (!newData.fechaCompra || newData.fechaCompra == '') { alert('Introduzca una fecha de compra'); return }
        if (newData.depreciacion.length < 1) { alert('Introduzca un porcentaje de depreciación'); return }
        if (newData.marca.length < 1) { alert('Introduzca la marca'); return }
        let aulaInfo = getAulaInfo( newData.idAula )
        if (!aulaInfo) { alert('Seleccione el aula.'); return }
        let aulaCupo = aulaInfo.cupo
        let aulaAsignados = aulaInfo.cantidadAsignados
        if (1 + aulaAsignados > aulaCupo) { alert(`La asignación excede el cupo: ${1 + aulaAsignados}/${aulaCupo}`); return }
        
        console.log(newData)
        modifyAsignacion(newData).then(wasModified => {
            if (wasModified){
                alert('Asignación Modificada');
                location.reload();
            }else {
              alert('Hubo un error, inténtelo de nuevo.');
            }
        });
    }

    const insertAulas = () => {
        return aulas.map((registerAula) => {
          return <Option key={registerAula.idAulaCodigo} idOption={registerAula.idAulaCodigo} nombreOption={`${registerAula.idAulaCodigo} (${registerAula.nombreAula}) (${registerAula.cantidadAsignados >= registerAula.cupo ? 'Lleno' : ('Disponible: ' + (registerAula.cupo - registerAula.cantidadAsignados))})`}></Option>
        });
    }

    const getFecha = () => {
        let fecha = new Date(mobiliario.fechaCompra);
        let mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getUTCDate()).padStart(2, '0');
        let anio = fecha.getUTCFullYear();
        return anio + '-' + mes + '-' + dia;
    }

    return(
        <>
        <Welcome titleWelcome='MODIFICAR MOBILIARIO'></Welcome>
        <main>
            <h2 className="main-name">Mobiliario: <strong>{catalogoMobiliario.nombreMobiliario}</strong> </h2>
            <section className="tables">

                <h3 className="table-title">Datos del Mueble</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <article className="table-form">
                        <div className="container p-2">
                            <div className="row">
                                <div className="col-3">
                                    <label className="">Número Mobiliario <span className="required-asterik"> *</span></label><br/>
                                    <input disabled
                                    className="form-control" type="text" placeholder={params.idLineaMob}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Descripción<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('descripcion')}
                                    className="form-control" type="text" defaultValue={mobiliario.descripcion}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Precio Unitario Original<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    onChange={e => setPriceActual(e.target.value)}
                                    className="form-control" type="text" defaultValue={mobiliario.precioUniOriginal}/>
                                </div>
                                <div className="col-3">
                                    <label className="">IVA<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    onChange={(e) => {setIvaActual((e.target.value > 0 ? e.target.value : 0))}}
                                    className="form-control" type="text" defaultValue={mobiliario.iva}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Precio Final Compra<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    disabled
                                    className="form-control" type="text" value={pagoTotal || pagoTotalActual}/>
                                </div>
                                {/* <div className="col-3">
                                    <label className="">Fecha de Compra<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('fechaCompra')}
                                    className="form-control" type="date" value={getFecha()} disabled/>
                                </div> */}
                                <div className="col-3">
                                    <label className="">Porcentaje de Depreciación<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('depreciacion')}
                                    className="form-control" type="text" defaultValue={mobiliario.depreciacion}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Marca<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('marca')}
                                    className="form-control" type="text" defaultValue={mobiliario.marca}/>
                                </div>
                                {aulas.length > 0 &&
                                <div className="col-3">
                                    <label>Aula<span className="required-asterik"> *</span></label><br/>
                                    <select className="form-select" {...register('idAula')} defaultChecked={aulas[0].idAulaCodigo}>
                                      {insertAulas()}
                                    </select>
                                </div>
                                }
                            </div>
                        </div>
                    </article>
                    <input className="ms-3 mb-2 btn btn-success" type="submit" value="Modificar"/>
                    <Link className="ms-1 mb-2 btn btn-primary" to={`/registros/${catalogoMobiliario.idCatalogoMobiliario}`}>Regresar A {catalogoMobiliario.nombreMobiliario}</Link>
                </form>
            </section>
        </main>
        </>
    );
}

export default Modify;