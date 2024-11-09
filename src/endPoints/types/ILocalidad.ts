import { IProvincia } from "./IProvincia";

export interface ILocalidad {
  id: number;
  nombre: string;
  provincia: IProvincia;
}
