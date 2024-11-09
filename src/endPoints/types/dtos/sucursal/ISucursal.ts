import { IDomicilio } from "../../IDomicilio";
import { ICategorias } from "../categorias/ICategorias";
import { IEmpresa } from "../empresa/IEmpresa";


export interface ISucursal {
  id: number;
  nombre: string;
  empresa: IEmpresa;
  domicilio: IDomicilio;
  calle: string;
  latitud: number;
  longitud: number;
  categorias: ICategorias[];
  esCasaMatriz: boolean;
  horarioApertura: string;
  eliminado: boolean;
  horarioCierre: string;
  logo?: string;
}
