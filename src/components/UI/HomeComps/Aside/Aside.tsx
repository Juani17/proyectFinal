import { Button } from "react-bootstrap"
import { ListCompanies } from "../ListCompanies/ListCompanies"
import styles from "./Aside.module.css"
import { useEffect, useState } from "react";
import ModalAddCompany from "../Modals/ModalAddCompany/ModalAddCompany";
import { IEmpresa } from "../../../../endPoints/types/dtos/empresa/IEmpresa";
import { companyService } from "../../../../Services/companyServices";


export const Aside = () => {
  
  const[companies, setCompanies] = useState<IEmpresa[]>([]);

  const[showModalAddCompany, setShowModalAddCompany] = useState<boolean>(false); //Estado para controlar el modal


  const handleShowModal = () =>{
    setShowModalAddCompany(true); //Cambio el valor para que se muestre el Pop-up
  }

  const handleCloseModal = () =>{
    setShowModalAddCompany(false);
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await companyService.getEmpresas();
      setCompanies(data);
    }
    fetchCompanies();
  }, []);
  
  // Llamada a la función
  // const companies = getEmpresas().then((empresas) => {
  // return empresas;
  // });
  
  return (
    <div className={styles.asideContainer}>
      <div style={{marginTop:"10px"}}>
        <h2>Empresas</h2>
        
        <Button variant="primary" onClick={handleShowModal}> Agregar una Empresa</Button>
      </div>

      <div>
        <ListCompanies companies={companies}/>
      </div>

      {showModalAddCompany && (

        <>
          <div className={styles.backgroundDisabled}>
          </div>
          <ModalAddCompany closeModalAdd={handleCloseModal}/>
        </>
      )}
    
    </div>
  )
}
