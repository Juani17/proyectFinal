import axios from "axios";
import { ICategorias } from "../endPoints/types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../endPoints/types/dtos/categorias/ICreateCategoria";

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes relacionadas con las categorías
const API_URL = `${import.meta.env.VITE_API_URL}/categorias`;

export const categoryService = {
  // Método para obtener todas las categorías de una empresa específica por su ID
  async getCategoriesByCompany(companyId: number): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allCategoriasPorEmpresa/${companyId}`);
    return response.data;
  },

  // Método para obtener una categoría específica por su ID
  async getOneCategory(categoryId: number): Promise<ICategorias> {
    const response = await axios.get<ICategorias>(`${API_URL}/${categoryId}`);
    return response.data;
  },

  // Mostrar categorias por sucursal
  async getCategoriesBySucursal(sucursalId: number): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/categoriasPorSucursal/${sucursalId}`);
    return response.data;
  },

  // Método para crear una nueva categoría
  async createCategory(newCategory: ICreateCategoria): Promise<ICategorias> {
    const response = await axios.post<ICategorias>(`${API_URL}/create`, newCategory);
    return response.data;
  },

  // Método para actualizar los datos de una categoría existente por su ID
  async updateCategory(categoryId: number, categoryActualizada: ICategorias): Promise<ICategorias> {
    const response = await axios.put<ICategorias>(`${API_URL}/update/${categoryId}`, categoryActualizada);
    return response.data;
  },

  // Método para obtener todas las subcategorías de una categoría padre por su ID y página (paginación)
  async getAllSubCategoriesByCategoryId(categoryId: number, page: number = 1): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allSubCategoriasPorCategoriaPadre/${categoryId}/${page}`);
    return response.data;
  },
};
