import { urlOriginal } from "./urls";

const route = `${urlOriginal}/detalle-mobiliario`

export const getImage = async (imageName) => {
    try {

        const response = await fetch(`${route}/images/${imageName}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getDetalleMobiliario = async (idCatalogoMobiliario, idLineaMobiliario) => {
    try {

        const response = await fetch(`${route}/${idCatalogoMobiliario}/${idLineaMobiliario}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const postDetalleMobiliario = async (data) => {
    try {
        const options = {
            method: 'POST',
            body: data
        }
        const response = await fetch(route, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}

export const deleteDetalleMobiliario = async (idCatalogoMobiliario, idLineaMobiliario) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
        }
        const response = await fetch(`${route}/${idCatalogoMobiliario}/${idLineaMobiliario}`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}