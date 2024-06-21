import MenuNavegacion from "../components/menuNavegacion";
import QueriesButtons from "../components/QueriesComponents/queriesButtons";
import Welcome from "../components/welcome";

function Queries(){

    return(

        <>
        <div className="logo"></div>
        <Welcome titleWelcome='CONSULTAS MOBILIARIOS'></Welcome>

        <MenuNavegacion optionSelected={'Menú de Consultas'}></MenuNavegacion>

        <main>
            <h2 className="main-name">Lista de Consultas</h2>

            <QueriesButtons></QueriesButtons>
        </main>
        </>

    );

}

export default Queries;