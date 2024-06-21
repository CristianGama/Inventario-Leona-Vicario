import { urlOriginal } from "./urls";

const route = `${urlOriginal}/asignacion-mobiliario`;

export const getMobiliario = async (idCatalogoMobiliario, idLineaMobiliario) => {
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

export const getMobiliarioById = async (idAsignaMobiliario) => {
    try {

        const response = await fetch(`${route}/assigned-by-id/${idAsignaMobiliario}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const updateAsignacionForAulaById = async (idAsignaMobiliario, data) => {
    try {
        const options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/assigned-by-id/${idAsignaMobiliario}`, options);

        if (!response.ok) {
          return false;
        }

        const wasUpdated = await response.json();
        return wasUpdated;

    }catch (error) {
        return false;
    }   
}

export const getMobiliarios = async () => {
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

export const getMobiliariosFromCatalogo = async (idCatalogoMobiliario) => {
    try {

        const response = await fetch(`${route}/${idCatalogoMobiliario}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getAsignacionesFromCatalogo = async (id) => {
    try {
        const response = await fetch(`${route}/assigned/${id}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getAsignacionesWithDamagesFromCatalogo = async (id) => {
    try {
        const response = await fetch(`${route}/assigned-damageds/${id}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getSinAsignacionesFromCatalogo = async (id) => {
    try {
        const response = await fetch(`${route}/unassigned/${id}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const getDamagesFromCatalogo = async (id) => {
    try {
        const response = await fetch(`${route}/damages/${id}`);

        if (!response.ok) {
            return { data: null, loaded: false };
        }

        const data = await response.json();
        return { data, loaded: true };

    }catch (error) {
        return { data: null, loaded: false };
    }   
}

export const postAsignacionToAula = async (data) => {
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

export const modifyAsignacion = async (data) => {
    try {
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(`${route}/modify`, options);

        if (!response.ok) {
          return false;
        }

        const wasPosted = await response.json();
        return wasPosted;

    }catch (error) {
        return false;
    }   
}
