import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import styles from "./ViewSucursals.module.css";
import { CardSucursal } from "../../Cards/CardSucursals/CardSucursal";
import { ISucursal } from "../../../../../endPoints/types/dtos/sucursal/ISucursal";
import { sucursalService } from "../../../../../Services/sucursalService";
import { Button } from "react-bootstrap";
import ModalAddSucursal from "../ModalAddSucursal/ModalAddSucursal";



export const ViewSucursals: FC = () => {
  const selectedCompany = useSelector(
    (state: RootState) => state.company.selectedCompany
  );

  const selectedCompanyId = selectedCompany?.id

  const [sucursals, setSucursals] = useState<ISucursal[]>([]);

  
  const[showModalAddSucursal, setShowModalAddSucursal] = useState<boolean>(false); //Estado para controlar el modal


  const handleShowModal = () =>{
    setShowModalAddSucursal(true); //Cambio el valor para que se muestre el Pop-up
  }

  const handleCloseModal = () =>{
    setShowModalAddSucursal(false);
  }

  // Función para cargar las sucursales de la empresa seleccionada
  useEffect(() => {
    if (selectedCompanyId) {
      const fetchSucursales = async () => {

          const data = await sucursalService.getSucursalesByCompany(selectedCompanyId);
          setSucursals(data);
        }
        fetchSucursales();
      
      }}, [selectedCompanyId])


  return (
    <>
    
    <div className={styles.sucursalsMainContainer}>
      <div className={styles.containerHeader}>
      
      {selectedCompany? ( 
        <>
        <h2>Sucursales: {selectedCompany?.nombre}</h2>
        <Button onClick={handleShowModal}>Agregar Una Sucursal</Button>
        </>
      
      ) : 

      <div className={styles.sucursalNoCompany}> <h1>Elegir Una Empresa</h1></div>}

      
      </div>
      <div>
        {sucursals.length === 0 && selectedCompanyId ? (
          <h3>No hay sucursales</h3>
        ) : (
          <div className={styles.sucursalsCardContainer}>
            {
              sucursals.map((sucursal) => (
                <CardSucursal sucursal={sucursal} key={sucursal.id} />
              ))
            }
          </div>
        )}
      </div>
    </div>


    {showModalAddSucursal && (
        <>
          <div className={styles.backgroundDisabled}>
          </div>
          <ModalAddSucursal closeModalAdd={handleCloseModal} idEmpresa={selectedCompanyId ?? 0}/> 
        </>
              )}
    </>
  );
};
