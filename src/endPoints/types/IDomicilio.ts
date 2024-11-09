import { ILocalidad } from "./ILocalidad";

export interface IDomicilio {
  id: number;
  calle: string;
  numero: number;
  cp: number;
  piso: number;
  eliminado?: boolean;
  nroDpto: number;
  localidad: ILocalidad;
}
