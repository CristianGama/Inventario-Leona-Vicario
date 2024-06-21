import { urlOriginal } from "./urls";

const route = `${urlOriginal}/catalogos-mobiliarios`

export const getCatalogosMobiliarios = async () => {
    try {

        const response = await fetch(route);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getCatalogoMobiliario = async (id) => {
    try {

        const response = await fetch(`${route}/${id}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const postCatalogoMobiliario = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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

export const deleteCatalogoMobiliario = async (id) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
        }
        const response = await fetch(`${route}/${id}`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}