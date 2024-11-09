import axios, { AxiosResponse } from "axios"; // Importa axios y la interfaz AxiosResponse para trabajar con solicitudes HTTP
import { IImagen } from "../endPoints/types/IImagen"; // Importa la interfaz IImagen para tipar las imágenes

// Define la URL base de la API, obtenida del archivo de variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/images`;

// Exporta un objeto con métodos para interactuar con la API de imágenes
export const imageService = {

    // Método para subir una imagen a la API
    async uploadImage(newImage: IImagen): Promise<IImagen> {
        const response = await axios.post<IImagen>(`${API_URL}/uploads`, newImage); // Realiza una solicitud POST para subir la imagen
        return response.data; // Retorna los datos de la respuesta (la imagen subida)
    },

    // Método para eliminar una imagen mediante su ID público
    async deleteImage(publicId: string): Promise<AxiosResponse<any>> {
        try {
          const url = `${API_URL}/deleteImg?publicId=${publicId}`; // Construye la URL de eliminación con el ID público de la imagen
          const response = await axios.post(url); // Realiza una solicitud POST para eliminar la imagen
          return response; // Retorna la respuesta de la solicitud
        } catch (error) {
          console.error('Error al eliminar la imagen:', error); // Muestra un error en consola si la eliminación falla
          throw error; // Lanza el error para que pueda ser manejado por el llamador
        }
      }
}
