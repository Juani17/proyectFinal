import { useState, useEffect } from "react";
import Modal from "../../ui/modal/Modal";
import styles from "./Home.module.css";
import { useForm } from "../../../hooks/useForm/useForm";
import { IEmpresa } from "../../../types/IEmpresa";
import { ISucursales } from "../../../types/ISucursales";
import PopUpSucursal from "../../ui/PopUpSucursal/PopUpSucursal";
import { CardSucursal } from "../../ui/CardSucursal/CardSucursal";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  closeSucursalModal,
  openModal,
  openSucursalModal,
} from "../../../redux/slices/modalSlice";
import PopUpVerSucursal from "../../ui/PopUpVerSucursal/PopUpVerSucursal";
import { RootState } from "../../../redux/store/store";
import { setEmpresas, setEmpresaActiva, setSucursalActiva } from "../../../redux/slices/EmpresaSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector((state: RootState) => state.modal.isOpenModal);
  const isOpenSucursalModal = useSelector((state: RootState) => state.modal.isOpenSucursalModal);
  const empresas = useSelector((state: RootState) => state.empresa.empresas);
  const selectedEmpresaId = useSelector((state: RootState) => state.empresa.empresaActiva);
  const sucursalesFiltradas = useSelector((state: RootState) => state.empresa.sucursalesActivas);

  const [isViewSucursalOpen, setIsViewSucursalOpen] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState<ISucursales | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const { values, handleChange, handleSubmitForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: "",
  });
  const { nombre, razonSocial, cuit } = values;

  useEffect(() => {
    // Aquí puedes cargar empresas desde tu JSON o API y despachar la acción setEmpresas
    // Ejemplo: dispatch(setEmpresas(dataEmpresas));
  }, [dispatch]);

  const handleSelectEmpresa = (empresa: IEmpresa) => {
    dispatch(setEmpresaActiva(empresa.id));
  };

  const handleAddSucursal = (sucursal: ISucursales) => {
    console.log("Sucursal añadida:", sucursal);
    // Añade lógica aquí para actualizar el estado global si es necesario.
  };

  const handleViewSucursal = (sucursal: ISucursales) => {
    setSelectedSucursal(sucursal);
    setIsViewSucursalOpen(true);
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage) {
      const nuevaEmpresa: IEmpresa = {
        id: Date.now(),
        nombre,
        razonSocial,
        cuit,
        logo: selectedImage,  // Asegúrate de que `logo` sea de tipo `File`
        sucursales: []
      };
      dispatch(setEmpresas([...empresas, nuevaEmpresa]));
      handleCloseModal();
    }
  };

  return (
    <>
      <div className={`${styles.containerView} ${isOpenModal || isOpenSucursalModal || isViewSucursalOpen ? styles.blurredBackground : ""}`}>
        <aside className={styles.asideContainer}>
          <h1 style={{ fontSize: "1.8rem" }}>Empresas</h1>
          <button onClick={() => dispatch(openModal())}>Agregar Empresa</button>
          {empresas.length > 0 && (
            <div className={styles.empresaContainer}>
              {empresas.map((empresa) => (
                <div key={empresa.id} className={styles.empresaCard} onClick={() => handleSelectEmpresa(empresa)}>
                  <h3 style={{ color: "white" }}>{empresa.nombre}</h3>
                  <div className={styles.iconsContainer}>
                    <i className="fa-solid fa-eye" style={{ color: "#086A87" }}></i>
                    <i className="fa-solid fa-trash" style={{ color: "#c9410b" }}></i>
                    <i className="fa-solid fa-pencil" style={{ color: "#17985A" }}></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <div className={styles.mainContainer}>
          <h2>Lista de sucursales de la empresa: {selectedEmpresaId ? empresas.find(e => e.id === selectedEmpresaId)?.nombre : "Seleccione una empresa"}</h2>
          {selectedEmpresaId && (
            <button className={styles.containerButtonSucursal} onClick={() => dispatch(openSucursalModal())}>Agregar Sucursal</button>
          )}
          <div className={styles.containerSucursales}>
            {sucursalesFiltradas.map((sucursal) => (
              <CardSucursal
                key={sucursal.id}
                nombre={sucursal.nombre}
                horarioApertura={sucursal.horarioApertura}
                horarioCierre={sucursal.horarioCierre}
                imagen={sucursal.imagen}
                onView={() => handleViewSucursal(sucursal)}
              />
            ))}
          </div>
        </div>
      </div>

      {isOpenModal && (
        <Modal>
          <form onSubmit={handleSubmit} className={styles.modalContainer}>
            <h2>CREAR UNA EMPRESA</h2>
            <input name="nombre" type="text" placeholder="Ingrese nombre" value={nombre} onChange={handleChange} required />
            <input name="razonSocial" type="text" placeholder="Ingrese razon social" value={razonSocial} onChange={handleChange} required />
            <input name="cuit" type="text" placeholder="Ingrese Cuit" value={cuit} onChange={handleChange} required />
            <div className={styles.containerAgregarimagen}>
              <input type="file" accept="image/*" onChange={handleImageChange} id="file-upload" style={{ display: "none" }} required />
              <label htmlFor="file-upload" className={styles.customFileUpload}>Seleccionar imagen</label>
              {selectedImage ? (
                <img src={imagePreviewUrl!} alt="Vista previa" style={{ maxWidth: "90%", maxHeight: "90%", objectFit: "cover" }} />
              ) : (
                <span className="material-symbols-outlined">add_a_photo</span>
              )}
            </div>
            <div className={styles.containerButtonSubmit}>
              <button className={styles.buttonCancelar} onClick={handleCloseModal}>Cancelar</button>
              <button className={styles.buttonAgregar}>Agregar</button>
            </div>
          </form>
        </Modal>
      )}

      {isOpenSucursalModal && <PopUpSucursal isOpen={isOpenSucursalModal} onClose={() => dispatch(closeSucursalModal())} onAddSucursal={handleAddSucursal} />}
      {isViewSucursalOpen && <PopUpVerSucursal isOpen={isViewSucursalOpen} sucursal={selectedSucursal!} onClose={() => setIsViewSucursalOpen(false)} />}
    </>
  );
};
