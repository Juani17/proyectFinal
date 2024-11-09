import { FC, useState } from "react"
import { Button, Card } from "react-bootstrap"
import styles from "./CardCompany.module.css"
import ModalViewCompany from "../../Modals/ModalViewCompany/ModalViewCompany"
import ModalEditCompany from "../../Modals/ModalEditCompany/ModalEditCompany"
import { IEmpresa } from "../../../../../endPoints/types/dtos/empresa/IEmpresa"
import { useDispatch } from "react-redux"
import { setSelectedCompany } from "../../../../../redux/slices/companySlice"

interface ICardCompany{
  company: IEmpresa
}

export const CardCompany : FC<ICardCompany>= ({company}) => {
  const [showModal, setShowModal] = useState(false); //Estado que se va a usar para mostrar el popup
  const [showModalEdit, setShowModalEdit] = useState(false); //Estado que se va a usar para editar la empresa
  
  const dispatch = useDispatch()

  const handleSelectCompany = ()=>{
    dispatch(setSelectedCompany(company))
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
      <Card onClick={handleSelectCompany} className={styles.cardContainer} style={{ width: '18rem' }}>
        <Card.Body>
          <img 
            src={
              company.logo ? company.logo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"  // Si es null o undefined
            }  
            alt="" />
          <Card.Title>{company.nombre}</Card.Title>
          <Card.Subtitle>Razon social: {company.razonSocial}</Card.Subtitle>
          <div className={styles.buttonContainer}>
            <Button onClick={handleButtonShow}>Ver</Button>
            <Button onClick={handleButtonEdit}>Editar</Button>
          </div>
        </Card.Body>
      </Card>

      {showModal && (
        <>
        {/* Meto un div abajo para que impida pulsar otro elemento */}
          <div className={styles.backgroundDisabled}>
          </div>
          <ModalViewCompany company={company} modalClose={handleCloseModal} /> 
        </>
              )}
        
        {showModalEdit && (
          <>
            <div className={styles.backgroundDisabled}>
            </div>
            <ModalEditCompany  modalCloseEdit={handleCloseModalEdit} company={company}/>  
          </>
          
        )}
    </>
  )
}

