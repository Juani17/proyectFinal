import { FC } from "react"
import styles from "./ViewAlergen.module.css"
import { Button } from "react-bootstrap"
import { ICreateAlergeno } from "../../../../../endPoints/types/dtos/alergenos/ICreateAlergeno"

interface IModalViewAlergen {
    alergen: ICreateAlergeno
    modalClose: () => void
}


export const ModalViewAlergen: FC<IModalViewAlergen> =({alergen, modalClose}) => {
  return (
    <div className={styles.containerPrincipalOn}>
    <div className={styles.containerTitle}>
        <h2>{alergen.denominacion}</h2>
    </div>
    
    <div className={ styles.containerData }>

        <div className={styles.containerLogo}>
            
                <img 
                src={
                   alergen.imagen ? alergen.imagen.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s" 
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
