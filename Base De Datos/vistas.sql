
CREATE OR REPLACE VIEW vista_edificios AS
SELECT 
    CONCAT(i.idInstitucion, '-', e.idEdificio) AS idEdificio,
    e.nombreEdificio,
    i.nombre
FROM 
	edificio e
LEFT JOIN
	institucion i ON i.idInstitucion = e.idInstitucion WHERE e.estado = 'ACTIVO';
    
CREATE OR REPLACE VIEW vista_pisos AS
SELECT
	CONCAT(i.idInstitucion, '-', e.idEdificio, '-', p.idPiso) AS idPiso,
    p.nombrePiso,
    e.nombreEdificio,
    i.nombre
FROM 
	piso p
LEFT JOIN
	edificio e ON p.idEdificio = e.idEdificio
LEFT JOIN
	institucion i ON i.idInstitucion = e.idInstitucion WHERE p.estado = 'ACTIVO';
	
    
CREATE OR REPLACE VIEW vista_aulas AS
SELECT 
	CONCAT(i.idInstitucion, '-', e.idEdificio, '-', p.idPiso, '-', a.idAulaCodigo) AS idAulaCodigo,
    a.nombreAula, 
    a.cupo,
    p.nombrePiso,
    e.nombreEdificio,
    i.nombre
FROM 
	aula a
LEFT JOIN
	piso p ON a.idPiso = p.idPiso
LEFT JOIN
	edificio e ON p.idEdificio = e.idEdificio
LEFT JOIN
	institucion i ON i.idInstitucion = e.idInstitucion WHERE a.estado = 'ACTIVO';
    

CREATE OR REPLACE VIEW vista_deudores_alumnos AS
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreAlum, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
d.valorActual,
d.ivaActual,
d.pagoTotalActual,
d.fechaVencimiento
FROM 
dano_mobiliario_contado d
LEFT JOIN
alumno a ON d.idAlumno = a.numControl
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
LEFT JOIN
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = d.idDanoMobiliario
    LEFT JOIN
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = d.idDanoMobiliario
    LEFT JOIN
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = d.idDanoMobiliario
   WHERE 
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND
     tpag_transferencia_PM.idDanoMobiliario IS NULL
AND d.tipoResponsable = 'alumno' AND c.estado != 'INACTIVO';


CREATE OR REPLACE VIEW vista_efectivo_alumnos AS 
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreAlum, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.montoTotalPago,
e.fechaPagoEfectivo,
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_efectivo_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
alumno a ON d.idAlumno = a.numControl
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'alumno';


CREATE OR REPLACE VIEW vista_getnet_alumnos AS 
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreAlum, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.nombreBanco,
e.numOperacion,
e.numAutorizacion,
e.terminacionTarjeta,
e.montoPagoGetnet,
e.conceptoTransaccion,
e.fechaTransaccion, 
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_terminal_getnet_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
alumno a ON d.idAlumno = a.numControl
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'alumno';


CREATE OR REPLACE VIEW vista_transferencia_alumnos AS 
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreAlum, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.nomBanco,
e.claveRastreo,
e.detalleTransaccion,
e.montoPagoTransferencia,
e.conceptoPago,
e.fechaTransferencia, 
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_transferencia_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
alumno a ON d.idAlumno = a.numControl
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'alumno';


CREATE OR REPLACE VIEW vista_deudores_docentes AS 
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreDoc, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
d.valorActual,
d.ivaActual,
d.pagoTotalActual,
d.fechaVencimiento
FROM 
dano_mobiliario_contado d
LEFT JOIN
docente a ON d.idProfesor = a.claveDocente
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
LEFT JOIN
    tpag_efectivo_PM ON tpag_efectivo_PM.idDanoMobiliario = d.idDanoMobiliario
    LEFT JOIN
    tpag_terminal_getnet_PM ON tpag_terminal_getnet_PM.idDanoMobiliario = d.idDanoMobiliario
    LEFT JOIN
    tpag_transferencia_PM ON tpag_transferencia_PM.idDanoMobiliario = d.idDanoMobiliario
   WHERE 
     tpag_efectivo_PM.idDanoMobiliario IS NULL AND
     tpag_terminal_getnet_PM.idDanoMobiliario IS NULL AND
     tpag_transferencia_PM.idDanoMobiliario IS NULL
AND d.tipoResponsable = 'Profesor';


CREATE OR REPLACE VIEW vista_efectivo_docentes AS
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreDoc, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.montoTotalPago,
e.fechaPagoEfectivo,
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_efectivo_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
docente a ON d.idProfesor = a.claveDocente
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'Profesor';


CREATE OR REPLACE VIEW vista_getnet_docentes AS 
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreDoc, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.nombreBanco,
e.numOperacion,
e.numAutorizacion,
e.terminacionTarjeta,
e.montoPagoGetnet,
e.conceptoTransaccion,
e.fechaTransaccion, 
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_terminal_getnet_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
docente a ON d.idProfesor = a.claveDocente
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'Profesor';


CREATE OR REPLACE VIEW vista_transferencia_docentes AS
SELECT 
c.nombreMobiliario,
m.idLineaMobiliario,
CONCAT(a.nombreDoc, ' ', a.apellidoP, ' ', a.apellidoM) AS nombreCompleto,
e.nomBanco,
e.claveRastreo,
e.detalleTransaccion,
e.montoPagoTransferencia,
e.conceptoPago,
e.fechaTransferencia, 
CONCAT(pc.nombrePer, ' ', pc.apellidoP, ' ', pc.apellidoM) AS nombreCompletoCobrador
FROM 
tpag_transferencia_PM e
LEFT JOIN
personal pc ON e.idpersonalCobrador = pc.clavePersonal
LEFT JOIN
dano_mobiliario_contado d ON e.idDanoMobiliario = d.idDanoMobiliario
LEFT JOIN
docente a ON d.idProfesor = a.claveDocente
LEFT JOIN
asignacion_mobiliario m ON d.idAsignaMobiliario = m.idAsignaMobiliario
LEFT JOIN
detalle_mobiliario dm ON m.idCatalogoMobiliario = dm.idCatalogoMobiliario AND m.idLineaMobiliario = dm.idLineaMobiliario
LEFT JOIN
catalogo_mobiliario c ON c.idCatalogoMobiliario = dm.idCatalogoMobiliario
WHERE d.tipoResponsable = 'Profesor';


CREATE OR REPLACE VIEW vista_notificaciones AS
SELECT c.idCatalogoMobiliario, c.nombreMobiliario, c.minimoMobiliarios, COUNT(d.idLineaMobiliario) AS cantidadActual
FROM catalogo_mobiliario c
LEFT JOIN
detalle_mobiliario d ON d.idCatalogoMobiliario = c.idCatalogoMobiliario AND d.estado = 'ACTIVO'
LEFT JOIN
asignacion_mobiliario ON asignacion_mobiliario.idCatalogoMobiliario = d.idCatalogoMobiliario AND asignacion_mobiliario.idLineaMobiliario = d.idLineaMobiliario
LEFT JOIN 
    dano_mobiliario_contado ON dano_mobiliario_contado.idAsignaMobiliario = asignacion_mobiliario.idAsignaMobiliario 
   WHERE 
   c.estado != 'INACTIVO' AND dano_mobiliario_contado.idDanoMobiliario IS NULL
GROUP BY c.idCatalogoMobiliario HAVING cantidadActual < c.minimoMobiliarios;
