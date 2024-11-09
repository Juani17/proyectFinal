import { FC, useState } from "react"
import { ISucursal } from "../../../../../endPoints/types/dtos/sucursal/ISucursal"
import { Button, Card } from "react-bootstrap"
import styles from '../CardSucursals/CardSucursal.module.css'
import { useDispatch } from "react-redux"
import { setSelectedSucursal} from "../../../../../redux/slices/sucursalSlice"
import ModalViewSucursal from "../../Modals/ModalViewSucursal/ModalViewSucursal"
import ModalEditSucursal from "../../Modals/ModalEditSucursal/ModalEditSucursal"
import { useNavigate } from "react-router-dom"


interface ICardSucursal {
    sucursal: ISucursal
}

export const CardSucursal: FC<ICardSucursal> = ({sucursal}) => {
    const [showModal, setShowModal] = useState(false); //Estado que se va a usar para mostrar el popup
    const [showModalEdit, setShowModalEdit] = useState(false); //Estado que se va a usar para editar la empresa
    const navigate = useNavigate();
    
    const dispatch = useDispatch()


  
    const handleSelectSucursal = ()=>{
      localStorage.setItem('sucursal', JSON.stringify(sucursal))
      dispatch(setSelectedSucursal(sucursal))
      navigate(`/administracion`)
    }
  
    const handleButtonShow = () =>{ //Muestra el modal de View
        setShowModal(true);
    }
  
    const handleCloseModal = () =>{ //Deja de mostrar el modal de View
      setShowModal(false);  
    }
  
    const handleButtonEdit = () =>{
      setShowModalEdit(true);
    }
  
    const handleCloseModalEdit = () =>{
      setShowModalEdit(false);
    }
  
  return (
    <>
        <Card  className={styles.card}>
            <Card.Body >
                <img className={styles.cardImg}  onClick={handleSelectSucursal}
                    src={
                    sucursal.logo ? sucursal.logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"  // Si es null o undefined
                    }  
                    alt="" />
                <Card.Title onClick={handleSelectSucursal}>{sucursal.nombre}</Card.Title>
                <Card.Subtitle onClick={handleSelectSucursal}>{sucursal.horarioApertura} - {sucursal.horarioCierre}</Card.Subtitle>
                <div className={styles.containerButtons}>
                <Button onClick={handleButtonShow}>Ver</Button>
                <Button onClick={handleButtonEdit} variant="secondary">Editar</Button>
                </div>
            </Card.Body>
        </Card>
    

        {showModal && (
        <>
        {/* Meto un div abajo para que impida pulsar otro elemento */}
          <div className={styles.backgroundDisabled}>
          </div>
          <ModalViewSucursal sucursal={sucursal} modalClose={handleCloseModal} /> 
        </>
              )}
        
        {showModalEdit && (
          <>
            <div className={styles.backgroundDisabled}>
            </div>
            <ModalEditSucursal  modalCloseEdit={handleCloseModalEdit} sucursal={sucursal}/>  
          </>
          
        )} 


    </>
  )
}
