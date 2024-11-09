import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import { ILocalidad } from "../endPoints/types/ILocalidad"; // Importa la interfaz ILocalidad para tipar los datos de la localidad

// Define la URL base de la API, obtenida del archivo de variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/localidades`;

// Exporta un objeto con métodos para interactuar con la API de localidades
export const localityService = {

    // Método para obtener todas las localidades de una provincia según su ID
    async getAllLocalitiesByProvinceId(provinceId: number): Promise<ILocalidad[]> {
        const response = await axios.get<ILocalidad[]>(`${API_URL}/findByProvincia/${provinceId}`); // Realiza una solicitud GET para obtener las localidades
        return response.data; // Retorna los datos de la respuesta (un arreglo de localidades)
    }
}
