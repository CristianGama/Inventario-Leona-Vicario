import MenuNavegacion from "../components/menuNavegacion";
import QueriesAulas from "../components/QueriesAulasComponents/queriesButtonsAulas";
import Welcome from "../components/welcome";

function Aulas() {

  return (
    <>
        
        <div className="logo"></div>
        
        <Welcome titleWelcome='MENÚ CATÁLOGO MOBILIARIO'></Welcome>
        <MenuNavegacion optionSelected={'Aulas'}></MenuNavegacion>

        <main>
            <QueriesAulas></QueriesAulas>
        </main>
    </>
  );

} 


export default Aulas;
