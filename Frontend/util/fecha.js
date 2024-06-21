export const getFechaFormateada = (fecha) => {
    let newFecha = new Date(fecha);

    let dia = newFecha.getDate();
    let mes = newFecha.getMonth() + 1; // Los meses en JavaScript van de 0 a 11, por lo que se suma 1
    let anio = newFecha.getFullYear();
    
    // Formatear el día y el mes para asegurarse de que tengan dos dígitos
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    
    let fechaFormateada = anio + '-' + mes + '-' + dia;
    return fechaFormateada
}