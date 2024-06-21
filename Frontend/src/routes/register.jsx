import { useForm } from "react-hook-form";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { getCatalogoMobiliario } from "../endPoints/catalogosMobiliarios";
import { postDetalleMobiliario } from "../endPoints/detalleMobiliario";

import Welcome from "../components/welcome";

function Register(){

    const [catalogoMobiliario, setCatalogoMobiliario] = useState({});
    const [image, setImage] = useState(null);
    const [ivaActual, setIvaActual] = useState(0);
    const [priceActual, setPriceActual] = useState(0);
    let pagoTotal = (parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) > 0 ? parseInt(priceActual) + ((parseInt(priceActual)*parseInt(ivaActual))/100) : 0);

    const params = useParams();

    const { register, formState: { errors }, handleSubmit, watch, setValue, reset, getValues } = useForm();

    const onSubmit = (data) => {
        const formData = new FormData();
        for (const clave in getValues()) {
            if (getValues().hasOwnProperty(clave)) {
              const valor = getValues()[clave];
              formData.append(clave, valor);
            }
        }
        formData.append('estado', 'ACTIVO');
        formData.append('idCatalogoMobiliario', catalogoMobiliario.idCatalogoMobiliario);
        formData.append('precioUniOriginal', priceActual);
        formData.append('IVA', ivaActual);
        formData.append('precioFinalCompra', pagoTotal);
        formData.append('foto', image);

        if (data.cantidad < 1) { alert('La cantidad debe ser mayor o igual a 1'); return }
        if (!image) { alert('Debe seleccionar una foto'); return }
        if (data.descripcion.length < 1) { alert('Introduzca una descripción'); return }
        if (data.descripcion.length > 100) { alert('La descripción debe tener menos de 100 caracteres'); return }
        if (data.descripcion.length > 100) { alert('La descripción debe tener menos de 100 caracteres'); return }
        if (priceActual < 1) { alert('El precio unitario debe ser mayor o igual a 1'); return }
        if (!data.fechaCompra || data.fechaCompra == '') { alert('Introduzca una fecha de compra'); return }
        if (data.depreciacion.length < 1) { alert('Introduzca un porcentaje de depreciación'); return }
        if (data.marca.length < 1) { alert('Introduzca la marca'); return }
        

        postDetalleMobiliario(formData).then((wasPosted) => {
          if (wasPosted){
            alert('Registro Completado ');
          }else {
            alert('Hubo un error, inténtelo de nuevo.');
          }
        });
    }

    useEffect(() => {
        getCatalogoMobiliario(params.idMob).then(result => {
          if (result.loaded){
            setCatalogoMobiliario(result.data);
          }
        });
      },[]);

    return(
        <>
        <div className="logo"></div>
        <Welcome titleWelcome='REGISTRO MOBILIARIO'></Welcome>
        <main>
            <h2 className="main-name">Mobiliario: <strong>{catalogoMobiliario.nombreMobiliario}</strong> </h2>
            <section className="tables">
                
                <h3 className="table-title">Datos del Mueble</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <article className="table-form">
                        <div className="container p-2">
                            <div className="row">
                                <div className="col-3">
                                    <label className="">Cantidad de Muebles a Registrar<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('cantidad')}
                                    className="form-control" 
                                    type="number"
                                    defaultValue='1'/>
                                </div>
                                <div className="col-3">
                                    <label
                                    className="">Foto<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    className="form-control" type="file" name="foto"
                                    onChange={e => setImage(e.target.files[0])}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Descripción<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('descripcion')}
                                    className="form-control" type="text" placeholder="Descripción del Mueble"/>
                                </div>
                                <div className="col-3">
                                    <label className="">Precio Unitario Original<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    onChange={e => setPriceActual(e.target.value)}
                                    className="form-control" type="text" placeholder="Precio Inicial"/>
                                </div>
                                <div className="col-3">
                                    <label className="">IVA<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    onChange={(e) => {setIvaActual((e.target.value > 0 ? e.target.value : 0))}}
                                    className="form-control" type="text" placeholder="IVA"/>
                                </div>
                                <div className="col-3">
                                    <label className="">Precio Final Compra<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    disabled
                                    className="form-control" type="text" value={pagoTotal}/>
                                </div>
                                <div className="col-3">
                                    <label className="">Fecha de Compra<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('fechaCompra')}
                                    className="form-control" type="date" />
                                </div>
                                <div className="col-3">
                                    <label className="">Porcentaje de Depreciación<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('depreciacion')}
                                    className="form-control" type="text" placeholder="Porcentaje %"/>
                                </div>
                                <div className="col-3">
                                    <label className="">Marca<span className="required-asterik"> *</span></label><br/>
                                    <input 
                                    {...register('marca')}
                                    className="form-control" type="text" placeholder="Marca"/>
                                </div>
                            </div>
                        </div>
                    </article>
                    <input className="ms-3 mb-2 btn btn-success" type="submit" value="Registrar" />
                    <button className="ms-1 mb-2 btn btn-primary" onClick={e => {reset()}}>Limpiar</button>
                    <Link className="ms-1 mb-2 btn btn-primary" to={`/`}>Regresar A Mobiliarios</Link>
                </form>
            </section>
        </main>
        </>
    );
}

export default Register;