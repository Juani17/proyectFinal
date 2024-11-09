import axios from "axios";
import { IProductos } from "../endPoints/types/dtos/productos/IProductos";

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes
const API_URL = `${import.meta.env.VITE_API_URL}/articulos`;

// Servicio encargado de manejar las solicitudes relacionadas con los artículos (productos)
export const articleService = {
    
    // Método para obtener un artículo específico por su ID
    async getArticleById() : Promise<IProductos> {
        // Realizamos una solicitud GET a la URL base para obtener un artículo específico
        const response = await axios.get(API_URL)
        return response.data; // Devolvemos los datos del artículo obtenido
    },

    // Método para obtener una lista de artículos por el ID de la sucursal
    async getArticlesBySucursalId(sucursalId: number) : Promise<IProductos[]> {
        // Realizamos una solicitud GET con el ID de la sucursal para obtener los artículos asociados a esa sucursal
        const response = await axios.get<IProductos[]>(`${API_URL}/porSucursal/${sucursalId}`)
        return response.data // Devolvemos la lista de artículos de la sucursal solicitada
    },

    // Método para crear un nuevo artículo
    async createArticle(newArticle: IProductos) : Promise<void> {
        // Realizamos una solicitud POST para crear un nuevo artículo en la base de datos
        const response = await axios.post(`${API_URL}/create`, newArticle)
        return response.data // Devolvemos la respuesta del servidor tras la creación del artículo
    },

    // Método para actualizar un artículo existente por su ID
    async updateArticle(articleId: number, articleActualizado: IProductos) : Promise<IProductos> {
        // Realizamos una solicitud PUT para actualizar el artículo con el ID proporcionado
        const response = await axios.put(`${API_URL}/${articleId}`, articleActualizado)
        return response.data // Devolvemos los datos del artículo actualizado
    },
}
