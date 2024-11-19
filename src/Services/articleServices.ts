import axios from "axios";
import { IProductos } from "../endPoints/types/dtos/productos/IProductos";
import { ICreateProducto } from "../endPoints/types/dtos/productos/ICreateProducto";
import { IUpdateProducto } from "../endPoints/types/dtos/productos/IUpdateProducto";

const API_URL = `${import.meta.env.VITE_API_URL}/articulos`


export const articleService = {
    async getArticleById() : Promise<IProductos> {
        const response = await axios.get(API_URL)
        return response.data;
    },

    async getArticlesBySucursalId(sucursalId: number) : Promise<IProductos[]> {
        const response = await axios.get<IProductos[]>(`${API_URL}/porSucursal/${sucursalId}`)
        return response.data
    },

    async createArticle(newArticle: ICreateProducto) : Promise<void> {
        const response = await axios.post(`${API_URL}/create`, newArticle)
        return response.data
    },

    async updateArticle(articleId: number, articleActualizado: IUpdateProducto) : Promise<IProductos> {
        const response = await axios.put(`${API_URL}/update/${articleId}`, articleActualizado)
        return response.data
    },

    async deleteArticle(articleId: number) : Promise<void> {
        const response = await axios.delete(`${API_URL}/${articleId}`)
        return response.data
    },

    async getPagedArticles(sucursalId: number, page: number) {
        const response = await axios.get(`${API_URL}/pagedPorSucursal/${sucursalId}?page=${page}&size=${10}`);
        return response.data;
    },
}
