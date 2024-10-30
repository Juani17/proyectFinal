import { useState } from "react";
import Modal from "../../ui/modal/Modal";
import styles from "./Home.module.css";
import { useForm } from "../../../hooks/useForm/useForm";
import { IEmpresa } from "../../../types/IEmpresa";
import { ISucursales } from "../../../types/ISucursales";
import PopUpSucursal from "../../ui/PopUpSucursal/PopUpSucursal";
import { CardSucursal } from "../../ui/CardSucursal/CardSucursal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import {
  openModal,
  closeModal,
  openSucursalModal,
  closeSucursalModal,
} from "../../../redux/slices/modalSlice";
export const Home = () => {
  // Contexto de modales
  const dispatch = useDispatch();
  const isOpenModal = useSelector(
    (state: RootState) => state.modal.isOpenModal
  );
  const isOpenSucursalModal = useSelector(
    (state: RootState) => state.modal.isOpenSucursalModal
  );

  // Estado de empresas
  const [empresas, setEmpresa] = useState<IEmpresa[]>([]);
  const [sucursales, setSucursales] = useState<ISucursales[]>([]); // Estado para sucursales

  const [selectedImage, setSelectedImage] = useState<File | null>(null); // Estado del logo de la empresa
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // Estado para el URL de la imagen

  // Formulario con useForm hook
  const { values, handleChange, handleSubmitForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: "",
  });

  const { nombre, razonSocial, cuit } = values;

  // Función para manejar el botón de agregar sucursal
  const handleAddSucursal = (sucursal: ISucursales) => {
    console.log("Sucursal añadida:", sucursal);
    setSucursales((prev) => [...prev, sucursal]);
  };

  // Manejador de cierre del modal
  const handleCloseModal = () => {
    dispatch(closeModal());
    setSelectedImage(null);
    setImagePreviewUrl(null);
  };

  // Manejador del cambio de imagen
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Crea la URL de la imagen
    }
  };

  // Manejador del envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedImage) {
      setEmpresa((prev) => [
        ...prev,
        { nombre, razonSocial, cuit, logo: selectedImage },
      ]);
      handleCloseModal(); // Cierra el modal después de enviar
    }
  };

  return (
    <>
      <div
        className={`${styles.containerView} ${
          isOpenModal || isOpenSucursalModal ? styles.blurredBackground : ""
        }`}
      >
        <aside className={styles.asideContainer}>
          <div>
            <h1 style={{ fontSize: "1.8rem" }}>Empresas</h1>
          </div>
          <div>
            <button onClick={() => dispatch(openModal())}>Agregar Empresa</button>
          </div>
          {empresas.length > 0 && (
            <div className={styles.empresaContainer}>
              {empresas.map((empresa, index) => (
                <div key={index} className={styles.empresaCard}>
                  {" "}
                  {/* Añade una clase para el estilo de cada empresa */}
                  <h3 style={{ color: "white" }}>{empresa.nombre}</h3>
                  <div className={styles.iconsContainer}>
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "#086A87" }}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#c9410b" }}
                    ></i>
                    <i
                      className="fa-solid fa-pencil"
                      style={{ color: "#17985A" }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <div className={styles.mainContainer}>
          <div>
            <button
              className={styles.containerButtonSucursal}
              onClick={() => dispatch(openSucursalModal())}
            >
              Agregar Sucursal
            </button>
          </div>
          <div className={styles.containerSucursales}>
            {sucursales.map((sucursal, index) => (
              <CardSucursal
                key={index}
                nombre={sucursal.nombre}
                horarioApertura={sucursal.horarioApertura}
                horarioCierre={sucursal.horarioCierre}
                imagen={sucursal.imagen}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal para agregar empresa */}
      {isOpenModal && (
        <Modal>
          <form onSubmit={handleSubmit} className={styles.modalContainer}>
            <h2>CREAR UNA EMPRESA</h2>
            <input
              name="nombre"
              type="text"
              placeholder="Ingrese nombre"
              value={nombre}
              onChange={handleChange}
              required
            />
            <input
              name="razonSocial"
              type="text"
              placeholder="Ingrese razon social"
              value={razonSocial}
              onChange={handleChange}
              required
            />
            <input
              name="cuit"
              type="text"
              placeholder="Ingrese Cuit"
              value={cuit}
              onChange={handleChange}
              required
            />
            <div className={styles.containerAgregarimagen}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="file-upload"
                style={{ display: "none" }}
                required
              />
              <label htmlFor="file-upload" className={styles.customFileUpload}>
                Seleccionar imagen
              </label>
              {selectedImage ? (
                <img
                  src={imagePreviewUrl!}
                  alt="Vista previa"
                  style={{
                    maxWidth: "90%",
                    maxHeight: "90%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  className="material-symbols-outlined"
                  style={{ scale: "3.8" }}
                >
                  no_photography
                </span>
              )}
            </div>
            <div className={styles.containerButton}>
              <button
                style={{ backgroundColor: "#F80000" }}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button style={{ backgroundColor: "#26E200" }} type="submit">
                Confirmar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal para agregar sucursal */}
      {isOpenSucursalModal && (
        <PopUpSucursal
          isOpen={isOpenSucursalModal}
          onClose={() => dispatch(closeSucursalModal())}
          onAddSucursal={handleAddSucursal}
        />
      )}
    </>
  );
};
