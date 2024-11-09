import axios from "axios"
import { IAlergenos } from "../endPoints/types/dtos/alergenos/IAlergenos";

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes
const API_URL = `${import.meta.env.VITE_API_URL}/alergenos`

// Servicio encargado de manejar las solicitudes relacionadas con los alergenos
export const alergenoService = {

    // Método para obtener todos los alergenos
    async getAllAlergenos() : Promise<IAlergenos[]> {
        // Realizamos una solicitud GET a la URL base para obtener la lista de alergenos
        const response = await axios.get(API_URL)
        return response.data; // Devolvemos la lista de alergenos obtenida
    },

    // Método para obtener un alergeno específico por su ID
    async getAlergenoById(alergenoId: number) : Promise<IAlergenos> {
        // Realizamos una solicitud GET a la URL base con el ID del alergeno
        const response = await axios.get(`${API_URL}/${alergenoId}`)
        return response.data; // Devolvemos el alergeno específico encontrado
    },

    // Método para crear un nuevo alergeno
    async createAlergeno(newAlergeno: IAlergenos) : Promise<IAlergenos> {
        // Realizamos una solicitud POST para crear un nuevo alergeno
        const response = await axios.post(API_URL, newAlergeno)
        return response.data; // Devolvemos el nuevo alergeno creado
    },

    // Método para actualizar un alergeno existente
    async updateAlergeno(alergenoId: number, alergenoActualizado: IAlergenos) : Promise<void> {
        // Realizamos una solicitud PUT para actualizar los datos del alergeno con el ID proporcionado
        const response = await axios.put(`${API_URL}/${alergenoId}`, alergenoActualizado)
        return response.data; // Aunque no se espera respuesta en el cuerpo, podemos devolver la data si es necesario
    },

    // Método para eliminar un alergeno por su ID
    async deleteAlergeno(alergenoId: number) : Promise<void> {
        // Realizamos una solicitud DELETE para eliminar el alergeno con el ID especificado
        const response = await axios.delete(`${API_URL}/${alergenoId}`)
        return response.data // Devolvemos la respuesta tras eliminar el alergeno
    },

    // Método para eliminar la imagen asociada a un alergeno
    // Nota: Existe duda sobre cómo implementar esta funcionalidad, podría ser necesario ajustar según el API
    async deleteImgAlergeno(id: number, publicId: string): Promise<void> {
        try {
            // Construimos la URL con parámetros para la eliminación de la imagen
            const url = `${API_URL}/?id=${id}&publicId=${publicId}`;
            // Realizamos una solicitud POST para eliminar la imagen asociada al alergeno
            const response = await axios.post(url);
            console.log('Imagen eliminada con éxito:', response.data); // Log de éxito
        } catch (error) {
            console.error('Error al eliminar la imagen:', error); // Log de error
            throw error; // Re-throw del error para manejo posterior
        }
    }
}
