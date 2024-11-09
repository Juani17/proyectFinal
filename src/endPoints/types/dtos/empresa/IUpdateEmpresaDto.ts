import { baseDto } from "../baseDto/baseDto";

export interface IUpdateEmpresaDto extends baseDto {
  nombre: string;
  razonSocial: string;
  cuit: number;
  logo: string | null;
}
