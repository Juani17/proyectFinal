import { ISucursales } from "./ISucursales";

export interface IEmpresa {
    id: number
    nombre: string
    sucursales: ISucursales[];
    razonSocial: string
    cuit: string
    logo: File | null
}