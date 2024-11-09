import { Button } from "react-bootstrap";
import styles from "./ModalViewSucursal.module.css";
import { FC } from "react";

import { ISucursal } from "../../../../../endPoints/types/dtos/sucursal/ISucursal";

interface IModalViewSucursal {
    sucursal : ISucursal;
    modalClose : () => void; //Funcion que recibe desde CardCompany para cerrar el modal
}

const ModalViewSucursal: FC<IModalViewSucursal>  = ({sucursal, modalClose}) =>{

    return(
        <div className={styles.containerPrincipalOn}>
            <div className={styles.containerTitle}>
                <h2>Sucursal</h2>
            </div>
            
            <div className={ styles.containerData }>
                <p>Nombre: {sucursal.nombre} </p>
                <p>Calle: {sucursal.domicilio.calle} </p>
                <p>Horario de atención: {sucursal.horarioApertura}-{sucursal.horarioCierre}</p>
                <div className={styles.containerLogo}>
                <p>Logo: </p>
                    <img 
                    src={
                        sucursal.logo ? sucursal.logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"  // Si es null o undefined
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
export default ModalViewSucursal