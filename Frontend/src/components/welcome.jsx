function Welcome({titleWelcome}){
    return(
        <>
        <header>
            <h1>{titleWelcome}</h1>
        </header>        
        <nav className="mb-4">
            <p className="main-welcome-text">Bienvenido Administrador</p>
            <p className="description">Recuerde llenar los datos de manera correcta</p>
            <p className="description">Los datos con <span className="required-asterik">*</span> son obligatorios</p>
        </nav>
        </>
    );
}

export default Welcome;