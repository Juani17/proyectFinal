import { IProducto } from "./IProducto";

export interface ISucursales {
    empresaId: number;
    id: number;
    nombre: string
    productos: IProducto[];
    horarioApertura: string
    horarioCierre: string
    pais: string
    provincia: string
    latitud: string
    longitud: string
    nombreCalle: string
    numeroCalle: number
    codigoPostal: string
    numeroPiso: number
    numeroDepartamento: number
    imagen: string
}