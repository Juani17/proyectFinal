import axios from "axios";
import { IPais } from "../endPoints/types/IPais";

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes relacionadas con los países
const API_URL = `${import.meta.env.VITE_API_URL}/paises`;

export const countryService = {

    // Método para obtener todos los países
    async getAllCountries(): Promise<IPais[]> {
        // Realizamos una solicitud GET a la URL de países para obtener la lista completa
        const response = await axios.get<IPais[]>(`${API_URL}`);
        return response.data; // Devolvemos la lista de países obtenida
    }
};
