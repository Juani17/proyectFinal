import axios from 'axios'; // Importa axios para realizar solicitudes HTTP
import { ISucursal } from '../endPoints/types/dtos/sucursal/ISucursal'; // Interfaz para tipar los datos de sucursal
import { ICreateSucursal } from '../endPoints/types/dtos/sucursal/ICreateSucursal'; // Interfaz para tipar los datos al crear una sucursal
import { IUpdateSucursal } from '../endPoints/types/dtos/sucursal/IUpdateSucursal'; // Interfaz para tipar los datos al actualizar una sucursal

// Define la URL base de la API, obtenida del archivo de variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/sucursales`;

export const sucursalService = {

    // Método para obtener todas las sucursales de una empresa por su ID
    async getSucursalesByCompany(companyId: number): Promise<ISucursal[]> {
        try {
            // Realiza una solicitud GET para obtener las sucursales de una empresa específica
            const response = await axios.get<ISucursal[]>(`${API_URL}/porEmpresa/${companyId}`);
            return response.data; // Retorna los datos de la respuesta (un arreglo de sucursales)
        } catch (error) {
            console.error('Error al obtener las sucursales:', error); // Maneja cualquier error
            throw new Error('No obtuvieron las sucursales'); // Lanza un error si ocurre algún problema
        }
    },

    // Método para verificar si una empresa tiene una casa matriz
    async getCasaMatriz(companyId: number): Promise<boolean> {
        try {
            // Realiza una solicitud GET para verificar si existe una casa matriz para la empresa
            const response = await axios.get<boolean>(`${API_URL}/existCasaMatriz/${companyId}`);
            return response.data; // Retorna el resultado de la respuesta (true o false)
        } catch (error) {
            console.error('Error al obtener la sucursal:', error); // Maneja cualquier error
            throw new Error('No se obtuvo la sucursal'); // Lanza un error si ocurre algún problema
        }
    },

    // Método para crear una nueva sucursal
    async createSucursal(nuevaSucursal: ICreateSucursal): Promise<ISucursal> {
        // Realiza una solicitud POST para crear una nueva sucursal
        const response = await axios.post<ISucursal>(`${API_URL}/create`, nuevaSucursal);
        return response.data; // Retorna los datos de la respuesta (la nueva sucursal creada)
    },

    // Método para actualizar una sucursal existente
    async updateSucursal(sucursalId: number, sucursalActualizada: IUpdateSucursal): Promise<ISucursal> {
        // Realiza una solicitud PUT para actualizar los datos de una sucursal
        const response = await axios.put<ISucursal>(`${API_URL}/update/${sucursalId}`, sucursalActualizada);
        return response.data; // Retorna los datos de la respuesta (la sucursal actualizada)
    }
};
