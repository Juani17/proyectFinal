
import { IImagen } from "../../IImagen";
import { IAlergenos } from "../alergenos/IAlergenos";
import { ICategorias } from "../categorias/ICategorias";

export interface IProductos {
  id: number;
  denominacion: string;
  precioVenta: number;
  descripcion: string;
  categoria: ICategorias;
  eliminado: boolean;
  habilitado: boolean;
  codigo: string;
  alergenos: IAlergenos[];
  imagenes: IImagen[];
}
