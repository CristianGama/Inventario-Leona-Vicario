import { urlOriginal } from "./urls";

const route = `${urlOriginal}/danos-mobiliarios`;

export const getDanoMobiliario = async (idDanoMobiliario) => {
  try {

      const response = await fetch(`${route}/${idDanoMobiliario}`);

      if (!response.ok) {
          return { data: null, loaded: false };
      }

      const data = await response.json();
      return { data, loaded: true };

  }catch (error) {
      return { data: null, loaded: false };
  }   
}

export const postDanoMobiliario = async (data) => {
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