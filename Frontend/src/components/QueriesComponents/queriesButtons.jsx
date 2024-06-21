import { useState } from "react";
import QueryTable from "./queryTable";
import { getMobiliariosAltas, getMobiliariosBajas, getMobiliariosByAulas, getDeudoresAlumnos, getDeudoresDocentes, 
    getPagosEfectivoAlumnos, getPagosEfectivoDocentes,
    getPagosGetnetAlumnos, getPagosGetnetDocentes,
    getPagosTransferenciaAlumnos, getPagosTransferenciaDocentes
} from "../../endPoints/consultas";

const queryOptionsAlumnos = [
    {key:1, text: 'Deudores (Alumnos)',  imgSrc: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png', queryFetch:getDeudoresAlumnos },
    {key:2, text: 'Pagos Efectivo (Alumnos)',  imgSrc: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png', queryFetch:getPagosEfectivoAlumnos },
    {key:3, text: 'Pagos Getnet (Alumnos)',  imgSrc: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png', queryFetch: getPagosGetnetAlumnos },
    {key:4, text: 'Pagos Transferencia (Alumnos)',  imgSrc: 'https://cdn-icons-png.flaticon.com/512/3413/3413591.png', queryFetch:getPagosTransferenciaAlumnos },
]

const queryOptionsDocentes = [
    {key:5, text: 'Deudores (Profesores)',  imgSrc: 'https://previews.123rf.com/images/sararoom/sararoom1303/sararoom130300119/18782394-ilustraci%C3%B3n-de-dibujos-animados-del-profesor.jpg', queryFetch: getDeudoresDocentes},
    {key:6, text: 'Pagos Efectivo (Profesores)',  imgSrc: 'https://previews.123rf.com/images/sararoom/sararoom1303/sararoom130300119/18782394-ilustraci%C3%B3n-de-dibujos-animados-del-profesor.jpg', queryFetch: getPagosEfectivoDocentes},
    {key:7, text: 'Pagos Getnet (Profesores)',  imgSrc: 'https://previews.123rf.com/images/sararoom/sararoom1303/sararoom130300119/18782394-ilustraci%C3%B3n-de-dibujos-animados-del-profesor.jpg', queryFetch: getPagosGetnetDocentes},
    {key:8, text: 'Pagos Transferencia (Profesores)',  imgSrc: 'https://previews.123rf.com/images/sararoom/sararoom1303/sararoom130300119/18782394-ilustraci%C3%B3n-de-dibujos-animados-del-profesor.jpg', queryFetch: getPagosTransferenciaDocentes},
]

const queryOptionsMobiliarios = [
    {key:9, text: 'Mobiliarios (Altas)',  imgSrc: 'https://w1.pngwing.com/pngs/14/967/png-transparent-pencil-drawing-technology-office-supplies.png', queryFetch: getMobiliariosAltas},
    {key:10, text: 'Mobiliarios (Bajas)',  imgSrc: 'https://static.vecteezy.com/system/resources/previews/015/133/731/non_2x/broken-pencil-illustration-free-png.png', queryFetch: getMobiliariosBajas},
    {key:11, text: 'Mobiliarios (Salón)',  imgSrc: 'https://img.freepik.com/vector-premium/dibujos-animados-silla_119631-407.jpg?w=2000', queryFetch: getMobiliariosByAulas},
]

function QueryButton({ isSelected, queryText, queryImgSrc, queryData, updateQueryOption }){

    return(
        <div className="d-inline-flex">
            <button className={isSelected ? "query-button border-danger border-4 btn" : "query-button border-secondary border-1 btn"} onClick={() => {updateQueryOption(queryData)}}>
                <img src={queryImgSrc} alt="Logo" className="query-logo"/>
                <span className="query-text">{queryText}</span>
            </button>      
        </div>
    );

}

function QueriesButtons(){

    const [selected, setSelected] = useState(queryOptionsAlumnos[0]);

    const updateSelectedQuery = (dataQuery) => {
        setSelected(dataQuery);
    }

    function insertQueriesOptions(queryOptionArray){
        return queryOptionArray.map(queryOption => {
            return (selected.key == queryOption.key ? <QueryButton key={queryOption.key} isSelected={true} queryText={queryOption.text} queryImgSrc={queryOption.imgSrc} queryData={queryOption} updateQueryOption={updateSelectedQuery}/> : <QueryButton key={queryOption.key} isSelected={false} queryText={queryOption.text} queryImgSrc={queryOption.imgSrc} queryData={queryOption} updateQueryOption={updateSelectedQuery}/>) 
        });
    }

    return(
        <>
        <section className="tables mb-3">
            <h3 className="table-title m-3">Consultas Alumnos</h3>
            <div className="m-3">
                {insertQueriesOptions(queryOptionsAlumnos)}       
            </div>
            <h3 className="table-title m-3">Consultas Docentes</h3>
            <div className="m-3">
                {insertQueriesOptions(queryOptionsDocentes)}       
            </div>
            <h3 className="table-title m-3">Consultas Mobiliarios</h3>
            <div className="m-3">
                {insertQueriesOptions(queryOptionsMobiliarios)}       
            </div>
        </section>
        <section className="tables">
            <h3 className="table-title">Consultas</h3>
            <QueryTable queryFetch={selected.queryFetch}></QueryTable>
        </section>
        </>
    );

}

export default QueriesButtons;