import { IImagen } from "../../IImagen";
import { baseDto } from "../baseDto/baseDto";

export interface IUpdateProducto extends baseDto {
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  habilitado: boolean;
  imagenes: IImagen[];
  codigo: string;
  idCategoria: number;
  idAlergenos: number[];
}
