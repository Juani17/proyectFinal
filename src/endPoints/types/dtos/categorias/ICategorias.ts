import { IProductos } from "../productos/IProductos";
import { ISucursal } from "../sucursal/ISucursal";

export interface ICategorias {
  id: number;
  denominacion: string;
  eliminado: boolean;
  sucursales: ISucursal[];
  subCategorias: ICategorias[];
  categoriaPadre?: ICategorias | null;
  articulos: IProductos;
}
