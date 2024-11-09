import { IImagen } from "../../IImagen";
import { baseDto } from "../baseDto/baseDto";

export interface IUpdateAlergeno extends baseDto {
  denominacion: string;
  imagen: IImagen | null;
}
