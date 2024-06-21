import { urlOriginal } from "./urls";

const route = `${urlOriginal}/personas`

export const getAlumnos = async () => {
    try {

        const response = await fetch(`${route}/alumnos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getDocentes = async () => {
    try {

        const response = await fetch(`${route}/docentes`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getAdministrativos = async () => {
    try {

        const response = await fetch(`${route}/administrativos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}