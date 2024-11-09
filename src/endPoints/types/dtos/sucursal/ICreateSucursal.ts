
export interface ICreateSucursal {
  nombre: string;
  horarioApertura: string;
  horarioCierre: string;
  esCasaMatriz: boolean;
  latitud: number;
  longitud: number;
  domicilio: {
    calle: string;
    numero: number;
    cp: number;
    piso: number;
    nroDpto: number;
    idLocalidad: number;
  };
  idEmpresa: number;
  logo: string | null;
}
