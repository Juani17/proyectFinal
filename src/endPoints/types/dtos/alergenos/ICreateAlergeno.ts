import { IImagen } from "../../IImagen";

export interface ICreateAlergeno {
  denominacion: string;
  imagen: IImagen | null;
}
