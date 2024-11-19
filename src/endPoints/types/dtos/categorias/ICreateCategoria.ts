export interface ICreateCategoria {
  denominacion: string;
  idEmpresa: number;
  idSucursal?: number;
  idCategoriaPadre: number | null;
}
