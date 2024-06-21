function Option( {idOption, nombreOption} ){
    return(
        <option className="" value={idOption}>{nombreOption}</option>
    );
}

export const insertSelects = (selects) => {
    let map;
    if (typeof(selects) == 'object' && typeof selects[Symbol.iterator] === 'function' && selects.length >= 1){
        map = selects.map((select) => {
            const values = Object.values(select)
            return <Option key={values[0]} idOption={values[0]} nombreOption={`${values[1]}`}></Option>
        });
        return [<Option key='99999' idOption='' nombreOption={``}></Option>, ...map]
    }
}