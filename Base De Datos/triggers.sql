DROP TRIGGER IF EXISTS aula_trigger;
DROP TRIGGER IF EXISTS piso_trigger;
DROP TRIGGER IF EXISTS edificio_trigger;

DELIMITER $$

CREATE TRIGGER aula_trigger
BEFORE UPDATE ON AULA
FOR EACH ROW
BEGIN
    IF NEW.estado <> OLD.estado AND NEW.estado = 'INACTIVO' THEN
        UPDATE ASIGNACION_MOBILIARIO a
        LEFT JOIN 
        DETALLE_MOBILIARIO m
        ON m.idLineaMobiliario = a.idLineaMobiliario AND m.idCatalogoMobiliario = a.idCatalogoMobiliario
        SET a.idAulaCodigo = null 
        WHERE idAulaCodigo = OLD.idAulaCodigo AND m.estado = 'ACTIVO';
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER piso_trigger
BEFORE UPDATE ON PISO
FOR EACH ROW
BEGIN
    IF NEW.estado <> OLD.estado AND NEW.estado = 'INACTIVO' THEN
        UPDATE AULA SET estado = 'INACTIVO' WHERE idPiso = OLD.idPiso;
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER edificio_trigger
BEFORE UPDATE ON EDIFICIO
FOR EACH ROW
BEGIN
    IF NEW.estado <> OLD.estado AND NEW.estado = 'INACTIVO' THEN
        UPDATE PISO SET estado = 'INACTIVO' WHERE idEdificio = OLD.idEdificio;
    END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER institucion_trigger
BEFORE UPDATE ON institucion
FOR EACH ROW
BEGIN
    IF NEW.estado <> OLD.estado AND NEW.estado = 'INACTIVO' THEN
        UPDATE EDIFICIO SET estado = 'INACTIVO' WHERE idInstitucion = OLD.idInstitucion;
    END IF;
END $$

DELIMITER ;
