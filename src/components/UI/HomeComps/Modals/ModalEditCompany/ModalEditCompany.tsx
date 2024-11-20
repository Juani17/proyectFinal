import { Button } from "react-bootstrap";
import styles from "./ModalEditCompany.module.css";
import { ChangeEvent, FC, useState } from "react";
import { IEmpresa } from "../../../../../endPoints/types/dtos/empresa/IEmpresa";
import Swal from "sweetalert2";
import { IUpdateEmpresaDto } from "../../../../../endPoints/types/dtos/empresa/IUpdateEmpresaDto";
import { companyService } from "../../../../../Services/companyServices";

interface IModalEditCompany {
    modalCloseEdit : () => void; //Funcion que recibe desde CardCompany para cerrar el modal
    company : IEmpresa
}

const ModalEditCompany : FC<IModalEditCompany> = ({modalCloseEdit, company}) => {

    const[formValues, setFormValues] = useState<IUpdateEmpresaDto>({ // Estado para manejar los valores de los inputs
        //Inicializo con los valores de la compania
        id : company.id,
        eliminado: company.eliminado,
        nombre : company.nombre,
        razonSocial: company.razonSocial,
        cuit: company.cuit,
        logo: company.logo || ""
    })

    //Funcion que maneja el cambio de los inputs
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => { 
        const {name, value } = e.target;
         //Evito que se ingresen espacios en blanco
            setFormValues({
                ...formValues, //Copio el estado anterior para que solo se actualice los inputs que estan llenos
                [name] : value
            });
        
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        try {
            await companyService.updateCompany(formValues.id, formValues);
    
            Swal.fire({
                icon: "success",
                title: "¡Actualización exitosa!",
                text: "Los datos de la empresa se han actualizado correctamente.",
                customClass: {
                    popup: 'custom-popup-success',
                    title: 'custom-title-success',
                    htmlContainer: 'custom-content-success'
                },
                background: 'linear-gradient(135deg, #e8f5e9, #a5d6a7)',
                color: '#1b5e20',
                showConfirmButton: false,
                timer: 1500,
                willClose: () => {
                    modalCloseEdit();
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error("Error al actualizar la empresa:", error);
    
            Swal.fire({
                icon: "error",
                title: "Error al actualizar",
                text: "Ocurrió un problema al intentar actualizar la empresa. Por favor, inténtelo más tarde.",
                customClass: {
                    popup: 'custom-popup-error',
                    title: 'custom-title-error',
                    htmlContainer: 'custom-content-error',
                    confirmButton: 'custom-button-error'
                },
                background: '#fbe9e7',
                color: '#c62828',
                confirmButtonColor: '#f44336',
                confirmButtonText: 'Cerrar'
            });
        }
    };
    
    

    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitle}>
                <h2>Editar Empresa</h2>
            </div>

            <div>
                <form action="" className={styles.containerForm} >
                    <label htmlFor="">Nombre</label>
                    <input type="text" placeholder="Nombre de la empresa" name="nombre" value={formValues.nombre} onChange={handleChange}/>
                    <label htmlFor="">Razon Social</label>
                    <input type="text" placeholder="Razon Social de la empresa" name="razonSocial" value={formValues.razonSocial} onChange={handleChange}/>
                    <label htmlFor="">Cuit</label>
                    <input type="text" placeholder="Cuit de la empresa" name="cuit" value={formValues.cuit} onChange={handleChange}/>
                    <label htmlFor="">Imagen</label>                    
                    <input type="text" placeholder="Link de imagen" name="logo" value={formValues.logo || ""} onChange={handleChange}/>
                    
                </form>
                <div className={styles.containerButtons}>
                    <Button onClick={handleSubmit}>Aceptar</Button>
                    <Button onClick={modalCloseEdit}>Cancelar</Button>
                </div>
                

            </div>
        </div>
    )
}

export default ModalEditCompany;