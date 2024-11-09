import axios from 'axios';
import { IEmpresa } from '../endPoints/types/dtos/empresa/IEmpresa';
import { ICreateEmpresaDto } from '../endPoints/types/dtos/empresa/ICreateEmpresaDto';
import { IUpdateEmpresaDto } from '../endPoints/types/dtos/empresa/IUpdateEmpresaDto';

// Definimos la URL base de la API que vamos a utilizar para hacer las solicitudes relacionadas con las empresas
const API_URL = `${import.meta.env.VITE_API_URL}/empresas`;

// Se imprime la URL de la API de configuración (para fines de depuración)
console.log(import.meta.env.REACT_APP_API_URL_API);

export const companyService = {
    
    // Método para obtener una empresa específica por su ID
    async getEmpresa(id: number): Promise<IEmpresa> {
        // Realizamos una solicitud GET para obtener los detalles de la empresa con el ID proporcionado
        const response = await axios.get<IEmpresa>(`${API_URL}/${id}`);
        return response.data; // Devolvemos los datos de la empresa obtenida
    },
  
    // Método para obtener todas las empresas
    async getEmpresas(): Promise<IEmpresa[]> {
        // Realizamos una solicitud GET para obtener una lista de todas las empresas
        const response = await axios.get<IEmpresa[]>(API_URL);
        return response.data; // Devolvemos la lista de empresas obtenida
    },
  
    // Método para crear una nueva empresa
    async createCompany(nuevaEmpresa: ICreateEmpresaDto): Promise<IEmpresa> {
        // Realizamos una solicitud POST para crear una nueva empresa con los datos proporcionados
        const response = await axios.post<IEmpresa>(API_URL, nuevaEmpresa);
        return response.data; // Devolvemos los datos de la nueva empresa creada
    },
  
    // Método para actualizar una empresa existente
    async updateCompany(id: number, empresaActualizada: IUpdateEmpresaDto): Promise<IEmpresa> {
        // Realizamos una solicitud PUT para actualizar los datos de la empresa con el ID proporcionado
        const response = await axios.put<IEmpresa>(`${API_URL}/${id}`, empresaActualizada);
        return response.data; // Devolvemos los datos de la empresa actualizada
    }
};
