import axios from "axios";
import { ICategorias } from "../endPoints/types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../endPoints/types/dtos/categorias/ICreateCategoria";

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes relacionadas con las categorías
const API_URL = `${import.meta.env.VITE_API_URL}/categorias`;

export const categoryService = {

    // Método para obtener todas las categorías de una empresa específica por su ID
    async getCategoriesByCompany(companyId: number): Promise<ICategorias[]> {
        // Realizamos una solicitud GET con el ID de la empresa para obtener todas las categorías asociadas a esa empresa
        const response = await axios.get<ICategorias[]>(`${API_URL}/allCategoriasPorEmpresa/${companyId}`);
        return response.data; // Devolvemos las categorías obtenidas
    },

    // Método para obtener una categoría específica por su ID
    async getOneCategory(categoryId: number): Promise<ICategorias> {
        // Realizamos una solicitud GET con el ID de la categoría para obtener los detalles de esa categoría
        const response = await axios.get<ICategorias>(`${API_URL}/${categoryId}`);
        return response.data; // Devolvemos los datos de la categoría obtenida
    },

    // Método para obtener las categorías de una sucursal específica por su ID
    async getCategoriesBySucursal(sucursalId: number|undefined): Promise<ICategorias[]> {
        // Realizamos una solicitud GET con el ID de la sucursal para obtener las categorías asociadas a esa sucursal
        const response = await axios.get<ICategorias[]>(`${API_URL}/allCategoriasPorSucursal/${sucursalId}`);
        return response.data; // Devolvemos las categorías obtenidas para la sucursal
    },

    // Método para actualizar los datos de una categoría existente por su ID
    async updateCategory(categoryId: number, categoryActualizada: ICategorias): Promise<ICategorias> {
        // Realizamos una solicitud PUT para actualizar los datos de la categoría con el ID proporcionado
        const response = await axios.put<ICategorias>(`${API_URL}/update/${categoryId}`, categoryActualizada);
        return response.data; // Devolvemos los datos de la categoría actualizada
    },

    // Método para crear una nueva categoría
    async createCategory(newCategory: ICreateCategoria): Promise<ICategorias> {
        // Realizamos una solicitud POST para crear una nueva categoría en la base de datos
        const response = await axios.post<ICategorias>(`${API_URL}/create`, newCategory)
        return response.data; // Devolvemos los datos de la nueva categoría creada
    },

    // Método para obtener todas las subcategorías de una categoría padre por su ID y página (paginación)
    async getAllSubCategoriesByCategoryId(categoryId: number, page: number = 1): Promise<ICategorias[]> {
        // Realizamos una solicitud GET para obtener todas las subcategorías de la categoría padre especificada
        const response = await axios.get<ICategorias[]>(`${API_URL}/allSubCategoriasPorCategoriaPadre/${categoryId}/${page}`);
        return response.data; // Devolvemos las subcategorías obtenidas
    }
}
