import { useState } from "react";
import QueryTable from "./queryTableAulas";
import { getAulasFromQueries, getPisosFromQueries, getEdificiosFromQueries, getInstitucionesFromQueries } from "../../endPoints/consultasAulas";
import AulasRegister from "./forms/aulas";
import EdificiosRegister from "./forms/edificios";
import PisosRegister from "./forms/pisos";
import InstitucionesRegister from "./forms/instituciones";

const queryOptions = [
    {key:1, text: 'Instituciones', tittle: 'Institución', formComponent: InstitucionesRegister, imgSrc: 'https://static.vecteezy.com/system/resources/previews/026/766/624/non_2x/color-icon-for-institution-vector.jpg', queryFetch: getInstitucionesFromQueries},
    {key:2, text: 'Edificios', tittle: 'Edificio', formComponent: EdificiosRegister, imgSrc: 'https://w7.pngwing.com/pngs/869/251/png-transparent-building-cartoon-medical-office-angle-skyscraper-architect.png', queryFetch: getEdificiosFromQueries},
    {key:3, text: 'Pisos', tittle: 'Piso', formComponent: PisosRegister, imgSrc: 'https://static.vecteezy.com/system/resources/previews/014/307/814/non_2x/wood-floor-square-icon-cartoon-style-vector.jpg', queryFetch: getPisosFromQueries},
    {key:4, text: 'Aulas', tittle: 'Aula', formComponent: AulasRegister, imgSrc: 'https://previews.123rf.com/images/redrockerz/redrockerz1511/redrockerz151100030/48600246-ilustraci%C3%B3n-de-dibujos-animados-aula-doodle.jpg', queryFetch: getAulasFromQueries},
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

function QueriesAulas(){

    const [selected, setSelected] = useState(queryOptions[0]);

    const updateSelectedQuery = (dataQuery) => {
        setSelected(dataQuery);
    }

    function insertQueriesOptions(){
        return queryOptions.map(queryOption => {
            return (selected.key == queryOption.key ? <QueryButton key={queryOption.key} isSelected={true} queryText={queryOption.text} queryImgSrc={queryOption.imgSrc} queryData={queryOption} updateQueryOption={updateSelectedQuery}/> : <QueryButton key={queryOption.key} isSelected={false} queryText={queryOption.text} queryImgSrc={queryOption.imgSrc} queryData={queryOption} updateQueryOption={updateSelectedQuery}/>) 
        });
    }

    return(
        <>
        <section className="tables mb-3">
            <h3 className="table-title m-3">Menú</h3>
            <div className="m-3">
                {insertQueriesOptions()}       
            </div>
        </section>
        <QueryTable queryFetch={selected.queryFetch} tittle={selected.text} text={selected.tittle} FormComponent={selected.formComponent}></QueryTable>
        </>
    );

}

export default QueriesAulas;