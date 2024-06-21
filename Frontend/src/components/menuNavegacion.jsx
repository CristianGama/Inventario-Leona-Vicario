import { Link } from "react-router-dom";

const menuOptions = [
    {name: 'Mobiliarios', link: '/', key:1},
    {name: 'Aulas', link: '/aulas', key: 2},
    {name: 'Menú de Consultas', link: '/consultas', key:3},
    {name: 'Notificaciones', link: '/notificaciones', key:4},
]

const Option = ( {isSelected, option} ) => {
    return(
        <div className="form-check form-check-inline">
            <Link className={isSelected ? "btn border-danger border-3" : "btn border-1 border-info"} to={option.link}>{option.name}</Link>
        </div>
    );
}

const insertOptions = (optionSelected) => {
    return menuOptions.map(option => {
        return (optionSelected == option.name ? <Option key={option.key} isSelected={true} option={option}></Option> : <Option key={option.key} isSelected={false} option={option}></Option>)
    })
}

function MenuNavegacion({optionSelected}){
    return(

        <article className="table-form mb-3 p-2">
            {insertOptions(optionSelected)}
        </article>

    );
}

export default MenuNavegacion;