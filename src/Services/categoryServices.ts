import axios from "axios";
import { ICategorias } from "../endPoints/types/dtos/categorias/ICategorias";
import { ICreateCategoria } from "../endPoints/types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../endPoints/types/dtos/categorias/IUpdateCategoria";

// Definimos la URL base de la API 
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

  // Mostrar categorias padres por sucursal
  async getCategoriesPadresBySucursal(sucursalId: number|undefined): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allCategoriasPadrePorSucursal/${sucursalId}`);
    return response.data;
},
  // Mostrar categorias por sucursal
  async getCategoriesBySucursal(sucursalId: number|undefined): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allCategoriasPorSucursal/${sucursalId}`);
    return response.data;
},

  // Método para crear una nueva categoría
  async createCategory(newCategory: ICreateCategoria): Promise<ICategorias> {
    const response = await axios.post<ICategorias>(`${API_URL}/create`, newCategory);
    return response.data;
  },

  // Método para actualizar los datos de una categoría existente
  async updateCategory(categoryId: number, categoryActualizada: IUpdateCategoria): Promise<ICategorias> {
    const response = await axios.put<ICategorias>(`${API_URL}/update/${categoryId}`, categoryActualizada);
    return response.data;
},

  // Método para obtener todas las subcategorías de una categoría padre por su ID 
  async getAllSubCategoriesPorCAtegoriaPadre(sucursalId: number, idCategoriaPadre: number): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allSubCategoriasPorCategoriaPadre/${idCategoriaPadre}/${sucursalId}`);
    return response.data;
  },


  async getAllSubCategoriesBySucursalId(sucursalId: number): Promise<ICategorias[]> {
    const response = await axios.get<ICategorias[]>(`${API_URL}/allSubCategoriasPorSucursal/${sucursalId}`);
    return response.data;
},

};
