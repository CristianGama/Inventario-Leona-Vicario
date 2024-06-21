import { urlOriginal } from "./urls";

const route = `${urlOriginal}/aulas`

export const getAulas = async () => {
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

export const postAula = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/aulas`, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}

export const deleteAula = async (data) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/aulas`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}

export const getPisos = async () => {
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

export const postPiso = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/pisos`, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}

export const deletePiso = async (data) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/pisos`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}

export const getEdificios = async () => {
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

export const postEdificio = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/edificios`, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}

export const deleteEdificio = async (data) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/edificios`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}

export const getInstituciones = async () => {
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

export const postInstitucion = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/instituciones`, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}

export const deleteInstitucion = async (data) => {
    try {
        const options = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/instituciones`, options);

        if (!response.ok) {
          return false;
        }

        const wasDeleted = await response.json();
        return wasDeleted;

    }catch (error) {
        return false;
    }   
}

