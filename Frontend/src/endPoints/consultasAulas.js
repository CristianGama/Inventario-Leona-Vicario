import { urlOriginal } from "./urls";

const route = `${urlOriginal}/consultas-aulas`;

export const getAulasFromQueries = async () => {
    try {

        const response = await fetch(`${route}/aulas`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getPisosFromQueries = async () => {
    try {

        const response = await fetch(`${route}/pisos`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getEdificiosFromQueries = async () => {
    try {

        const response = await fetch(`${route}/edificios`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getInstitucionesFromQueries = async () => {
    try {

        const response = await fetch(`${route}/instituciones`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}