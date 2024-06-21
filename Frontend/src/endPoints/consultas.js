import { urlOriginal } from "./urls";

const route = `${urlOriginal}/consultas`;

export const getDeudoresAlumnos = async () => {
    try {

        const response = await fetch(`${route}/deudores-alumnos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosEfectivoAlumnos = async () => {
    try {

        const response = await fetch(`${route}/efectivo-alumnos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosGetnetAlumnos = async () => {
    try {

        const response = await fetch(`${route}/getnet-alumnos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosTransferenciaAlumnos = async () => {
    try {

        const response = await fetch(`${route}/transferencia-alumnos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}


export const getDeudoresDocentes = async () => {
    try {

        const response = await fetch(`${route}/deudores-docentes`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosEfectivoDocentes = async () => {
    try {

        const response = await fetch(`${route}/efectivo-docentes`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosGetnetDocentes = async () => {
    try {

        const response = await fetch(`${route}/getnet-docentes`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPagosTransferenciaDocentes = async () => {
    try {

        const response = await fetch(`${route}/transferencia-docentes`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getMobiliariosAltas = async () => {
    try {

        const response = await fetch(`${route}/mobiliarios-ups`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getMobiliariosBajas = async () => {
    try {

        const response = await fetch(`${route}/mobiliarios-downs`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getMobiliariosByAulas = async () => {
    try {

        const response = await fetch(`${route}/mobiliarios-aulas`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getNotificaciones = async () => {
    try {

        const response = await fetch(`${route}/notificaciones`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}