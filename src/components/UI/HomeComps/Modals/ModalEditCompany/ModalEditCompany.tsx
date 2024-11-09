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

    //Funcion que maneja el envio de los campos del form a la api
    const handleSubmit = async (e :  React.MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        
        try{
            await companyService.updateCompany(formValues.id, formValues);

            Swal.fire({
                icon: "success",
                title: "Empresa actualizada",
                showConfirmButton: false,
                timer: 1500,
                willClose: ()=>{
                    modalCloseEdit();
                    window.location.reload() 
                }
                });
            
        }catch(error){
            console.error("El problema es: ", error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    }
    

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