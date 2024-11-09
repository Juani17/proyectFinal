import { Button } from "react-bootstrap";
import styles from "./ModalViewCompany.module.css";
import { FC } from "react";
import { IEmpresa } from "../../../../../endPoints/types/dtos/empresa/IEmpresa";

interface IModalViewCompany {
    company : IEmpresa;
    modalClose : () => void; //Funcion que recibe desde CardCompany para cerrar el modal
}

const ModalViewCompany : FC<IModalViewCompany>  = ({company, modalClose}) =>{

    return(
        <div className={styles.containerPrincipalOn}>
            <div className={styles.containerTitle}>
                <h2>Empresa</h2>
            </div>
            
            <div className={ styles.containerData }>
                <p>Nombre: {company.nombre} </p>
                <p>Razon Social: {company.razonSocial} </p>
                <p>Cuit: {company.cuit}</p>
                <div className={styles.containerLogo}>
                <p>Logo: </p>
                    <img 
                    src={
                        company.logo ? company.logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"  // Si es null o undefined
                        }     
                    alt="" />
                </div>
            </div>
            <div className={styles.containerButton}>
                <Button onClick={modalClose}>Cerrar</Button>
            </div>

        </div>
    )
}
export default ModalViewCompany