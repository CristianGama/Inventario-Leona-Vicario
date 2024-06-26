-- --------------------------------------------------------
-- BLOQUE DE INVENTARIOS 
-- --------------------------------------------------------

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `edificio`
--

 DROP DATABASE IF EXISTS catalogo_mobiliario;
 
 CREATE DATABASE CATALOGO_MOBILIARIO;
 USE CATALOGO_MOBILIARIO;

CREATE TABLE `institucion`(
	`idInstitucion` int(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `estado` VARCHAR(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `edificio`(
	`idEdificio` INT(3) NOT NULL,
  `nombreEdificio` VARCHAR(25) NOT NULL,
  `idInstitucion` int(3) NOT NULL,
  `estado` VARCHAR(10),
  PRIMARY KEY (`idEdificio`, `idInstitucion`),
  CONSTRAINT FOREIGN KEY(`idInstitucion`) REFERENCES `institucion` (`idInstitucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `piso`
--

CREATE TABLE `piso`(
	`idPiso` INT(3) NOT NULL,
  `nombrePiso` VARCHAR(50) NOT NULL,
  `idEdificio` INT(3) NOT NULL,
  `idInstitucion` int(3) NOT NULL,
  `estado` VARCHAR(10),
  PRIMARY KEY (`idPiso`, `idEdificio`, `idInstitucion`),
  CONSTRAINT FOREIGN KEY(`idEdificio`) REFERENCES `edificio` (`idEdificio`),
  CONSTRAINT FOREIGN KEY(`idInstitucion`) REFERENCES `institucion` (`idInstitucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula`(
	`idAulaCodigo` VARCHAR(4) NOT NULL,
  `nombreAula` VARCHAR(50) NOT NULL,
  `cupo` INT(4) NOT NULL,
  `idPiso` INT(3) NOT NULL,
  `idEdificio` INT(3) NOT NULL,
  `idInstitucion` int(3) NOT NULL,
  `estado` VARCHAR(10),
   PRIMARY KEY (`idAulaCodigo`, `idPiso`, `idEdificio`, `idInstitucion`),
   CONSTRAINT FOREIGN KEY(`idPiso`) REFERENCES `piso` (`idPiso`),
  CONSTRAINT FOREIGN KEY(`idEdificio`) REFERENCES `edificio` (`idEdificio`),
  CONSTRAINT FOREIGN KEY(`idInstitucion`) REFERENCES `institucion` (`idInstitucion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `catalogo_mobiliario`
--

CREATE TABLE `catalogo_mobiliario`(
	`idCatalogoMobiliario` INT(3) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombreMobiliario` VARCHAR(50) NOT NULL,
  `minimoMobiliarios` INT(3) NOT NULL,
  `estado` VARCHAR(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `detalle_mobiliario`
--

CREATE TABLE `detalle_mobiliario`(
  `idLineaMobiliario` INT(4) NOT NULL,
  `idCatalogoMobiliario` INT(3) NOT NULL,
  `foto` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(100) NOT NULL,
  `precioUniOriginal` INT(8) NOT NULL,
  `iva` INT(3) NOT NULL,
  `precioFinalCompra` INT(10) NOT NULL,
  `fechaCompra` DATE NOT NULL,
  `depreciacion` INT NOT NULL,
  `marca` VARCHAR(100) NOT NULL,
  `estado` VARCHAR(10),
  PRIMARY KEY (`idLineaMobiliario`, `idCatalogoMobiliario`),
  CONSTRAINT FOREIGN KEY(`idCatalogoMobiliario`) REFERENCES `catalogo_mobiliario` (`idCatalogoMobiliario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `asignacion_mobiliario`
--

CREATE TABLE `asignacion_mobiliario`(
	`idAsignaMobiliario` INT(4) NOT NULL AUTO_INCREMENT,
  `idAulaCodigo` VARCHAR(3),
	`idLineaMobiliario` INT(4) NOT NULL,
  `idCatalogoMobiliario` INT(3) NOT NULL,
  PRIMARY KEY (`idAsignaMobiliario`, `idLineaMobiliario`, `idCatalogoMobiliario`),
  CONSTRAINT FOREIGN KEY(`idAulaCodigo`) REFERENCES `aula` (`idAulaCodigo`),
	CONSTRAINT FOREIGN KEY(`idLineaMobiliario`) REFERENCES `detalle_mobiliario` (`idLineaMobiliario`),
	CONSTRAINT FOREIGN KEY(`idCatalogoMobiliario`) REFERENCES `detalle_mobiliario` (`idCatalogoMobiliario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `dano_mobiliario_contado`
--

CREATE TABLE `dano_mobiliario_contado`(
  `idDanoMobiliario` INT(5) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  `idAsignaMobiliario` INT(4) UNIQUE NOT NULL,
  `tipoResponsable` VARCHAR(8) NOT NULL,
  `idAlumno` INT(8),
  `idProfesor` INT(8),
  `valorActual` INT(8) NOT NULL,
  `ivaActual` INT(3) NOT NULL,
  `pagoTotalActual` INT(10) NOT NULL,
  `fechaVencimiento` DATE NOT NULL,
  CONSTRAINT FOREIGN KEY(`idAsignaMobiliario`) REFERENCES `asignacion_mobiliario` (`idAsignaMobiliario`),
  CONSTRAINT FOREIGN KEY(`idAlumno`) REFERENCES `alumno` (`numControl`),
  CONSTRAINT FOREIGN KEY(`idProfesor`) REFERENCES `docente` (`claveDocente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tpag_efectivo_PM`
--

CREATE TABLE `tpag_efectivo_PM`(
  `idEfectivo` INT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `idDanoMobiliario` INT(4) UNIQUE NOT NULL,
  `montoTotalPago` INT(8) NOT NULL,
  `fechaPagoEfectivo` DATE NOT NULL,
  `idPersonalCobrador` INT(8) NOT NULL,
  CONSTRAINT FOREIGN KEY(`idPersonalCobrador`) REFERENCES `personal` (`clavePersonal`),
  CONSTRAINT FOREIGN KEY(`idDanoMobiliario`) REFERENCES `dano_mobiliario_contado` (`idDanoMobiliario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tpag_terminal_getnet_PM`
--

CREATE TABLE `tpag_terminal_getnet_PM`(
  `idTerminalGetet` INT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `idDanoMobiliario` INT(4) UNIQUE NOT NULL,
  `nombreBanco` VARCHAR(30) NOT NULL,
  `numOperacion` INT NOT NULL,
  `numAutorizacion` INT NOT NULL,
  `terminacionTarjeta` VARCHAR(6) NOT NULL,
  `montoPagoGetnet` INT(8) NOT NULL, 
  `conceptoTransaccion`  VARCHAR(100) NOT NULL, 
  `fechaTransaccion`  VARCHAR(100) NOT NULL,
  `idPersonalCobrador` INT(8) NOT NULL,
  CONSTRAINT FOREIGN KEY(`idPersonalCobrador`) REFERENCES `personal` (`clavePersonal`),
  CONSTRAINT FOREIGN KEY(`idDanoMobiliario`) REFERENCES `dano_mobiliario_contado` (`idDanoMobiliario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tpag_transferencia_PM`
--

CREATE TABLE `tpag_transferencia_PM`(
  `idTransferencia` INT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `idDanoMobiliario` INT(4) UNIQUE NOT NULL,
  `nomBanco` VARCHAR(30) NOT NULL,
  `claveRastreo` VARCHAR(30) NOT NULL, 
  `detalleTransaccion` VARCHAR(100) NOT NULL, 
  `montoPagoTransferencia` INT(8) NOT NULL, 
  `conceptoPago` VARCHAR(100) NOT NULL,
  `fechaTransferencia` VARCHAR(100) NOT NULL,
  `idPersonalCobrador` INT(8) NOT NULL,
  CONSTRAINT FOREIGN KEY(`idPersonalCobrador`) REFERENCES `personal` (`clavePersonal`),
  CONSTRAINT FOREIGN KEY(`idDanoMobiliario`) REFERENCES `dano_mobiliario_contado` (`idDanoMobiliario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO INSTITUCION VALUES (1, 'Tecnológico', 'ACTIVO');  
INSERT INTO EDIFICIO VALUES (1,'Principal', 1, 'ACTIVO');
INSERT INTO PISO VALUES (1, 'Planta Baja', 1, 1, 'ACTIVO');
INSERT INTO PISO VALUES (2, 'Primer Piso', 1, 1, 'ACTIVO');
INSERT INTO PISO VALUES (3, 'Segundo Piso', 1, 1, 'ACTIVO');
INSERT INTO PISO VALUES (4, 'Tercer Piso', 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('PB', 'Salón de Eventos', 30, 1, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('A1', 'Salón de Estilismo 1', 30, 2, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('A2', 'Salón de Estilismo 2', 30, 2, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('B1', 'Cocina 1', 30, 3, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('B2', 'Cocina 2', 30, 3, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('C1', 'Salón de Cosmetología', 30, 4, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('C2', 'Salón Exámenes Profesionales', 30, 4, 1, 1, 'ACTIVO');
INSERT INTO AULA VALUES ('C3', 'Salón de Cómputo', 30, 4, 1, 1, 'ACTIVO');
