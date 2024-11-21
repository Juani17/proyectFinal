import { Button } from "react-bootstrap";
import style from "./ModalAddCompany.module.css";
import { ChangeEvent, FC, useState } from "react";
import { ICreateEmpresaDto } from "../../../../../endPoints/types/dtos/empresa/ICreateEmpresaDto";
import Swal from "sweetalert2";
import { companyService } from "../../../../../Services/companyServices";
import 'sweetalert2/dist/sweetalert2.min.css'
import '../../../../../styles/custom-alerts.css'
interface IModalAdd{
    closeModalAdd : () => void //Funcion que recibe desde CardCompany para cerrar el modal
}


const ModalAddCompany : FC<IModalAdd> = ({closeModalAdd}) =>{
    const initialState = {
        nombre : '',
        razonSocial: '',
        cuit: 0,
        logo : '',
    }
    const [newCompany, setNewCompany] = useState<ICreateEmpresaDto>(initialState)

    //Funcion que maneja el cambio de los inputs
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target;
        setNewCompany((prev) => ({...prev, 
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
      
        if (!newCompany.nombre || !newCompany.razonSocial || (!newCompany.cuit || newCompany.cuit <= 0)) {
          Swal.fire({
            icon: "warning",
            title: "Información incompleta",
            text: "Por favor, asegúrese de completar todos los campos antes de continuar.",
            customClass: {
              popup: 'custom-popup-warning',
              title: 'custom-title-warning',
              htmlContainer: 'custom-content-warning',
              confirmButton: 'custom-button-warning'
            },
            background: '#fff8e1',
            color: '#856404',
            confirmButtonColor: '#ffcc00',
            confirmButtonText: 'Completar',
            willClose: () => {
              // Cerrar el modal aquí
              closeModalAdd();
              window.location.reload();
          },
          });
          return;
        }
      
        try {
          await companyService.createCompany(newCompany);
      
          Swal.fire({
            icon: "success",
            title: "¡Registro exitoso!",
            text: "La empresa ha sido registrada correctamente.",
            customClass: {
              popup: 'custom-popup-success',
              title: 'custom-title-success',
              htmlContainer: 'custom-content-success',
              confirmButton: 'custom-button-success'
            },
            background: 'linear-gradient(135deg, #e0f7fa, #80deea)',
            color: '#004d40',
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              closeModalAdd();
              window.location.reload();
            }
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "¡Error inesperado!",
            text: "Algo salió mal al intentar registrar la empresa. Inténtelo nuevamente más tarde.",
            customClass: {
              popup: 'custom-popup-error',
              title: 'custom-title-error',
              htmlContainer: 'custom-content-error',
              confirmButton: 'custom-button-error'
            },
            background: '#fbe9e7',
            color: '#d32f2f',
            confirmButtonColor: '#f44336',
            confirmButtonText: 'Entendido',
            willClose: () => {
              // Cerrar el modal aquí
              closeModalAdd();
              window.location.reload();
          },
          });
        }
      };
      
    return(
        <div className={style.containerPrincipal}>
        <div className={style.containerTitle}>
                <h2>Agregar Empresa</h2>
            </div>

            <div>
                <form action=""  className={style.containerForm}>
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder="Nombre de la empresa" name="nombre" value={newCompany.nombre} onChange={handleChange}/>
                    <label htmlFor="">Razon Social</label>
                    <input type="text" placeholder="Razon Social de la empresa" name="razonSocial" value={newCompany.razonSocial} onChange={handleChange}/>
                    <label htmlFor="">Cuit</label>
                    <input type="number" placeholder="Cuit de la empresa" name="cuit" value={newCompany.cuit} onChange={handleChange}/>
                    <label htmlFor="">Imagen</label>                    
                    <input type="text"  placeholder="Link de imagen" name="logo" value={newCompany.logo || ""} onChange={handleChange}/>
                    
                </form>
                <div className={style.containerButtons}>
                    <Button onClick={handleSubmit}>Aceptar</Button>
                    <Button onClick={closeModalAdd}>Cancelar</Button>
                </div>
                

            </div>
        </div>
    )
}

export default ModalAddCompany;