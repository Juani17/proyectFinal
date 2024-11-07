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
import {
  setEmpresas,
  setEmpresaActiva,
  setSucursalActiva,
  addSucursalToEmpresa,
  updateEmpresa,
  deleteEmpresa,
  deleteSucursal,
  updateSucursal,
} from "../../../redux/slices/EmpresaSlice";
import PopUpVerEmpresa from "../../ui/PopUpVerEmpresa/PopUpVerEmpresa";

export const Home = () => {
  // Inicializamos el dispatch de Redux
  const dispatch = useDispatch();

  // Seleccionamos el estado de los modales de la aplicación
  const isOpenModal = useSelector(
    (state: RootState) => state.modal.isOpenModal
  );
  const isOpenSucursalModal = useSelector(
    (state: RootState) => state.modal.isOpenSucursalModal
  );

  // Seleccionamos las empresas y la empresa activa del estado de Redux
  const empresas = useSelector((state: RootState) => state.empresa.empresas);
  const selectedEmpresaId = useSelector(
    (state: RootState) => state.empresa.empresaActiva
  );
  const sucursalesFiltradas = useSelector(
    (state: RootState) => state.empresa.sucursalesActivas
  );

  // Estado local para manejar la visualización del modal de ver sucursal
  const [isViewSucursalOpen, setIsViewSucursalOpen] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState<ISucursales | null>(
    null
  );
    // State for PopUpVerEmpresa
    const [isViewEmpresaOpen, setIsViewEmpresaOpen] = useState(false);
    const [selectedEmpresaForView, setSelectedEmpresaForView] = useState<IEmpresa | null>(null);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Usamos el hook useForm para manejar los campos del formulario de creación de empresa
  const { values, handleChange, handleSubmitForm, setFormValues, resetForm } =
    useForm({
      nombre: "",
      razonSocial: "",
      cuit: "",
    });
  const { nombre, razonSocial, cuit } = values;

  // Carga inicial de empresas (puedes cargarlas desde un JSON o una API)
  useEffect(() => {
    // Aquí puedes cargar empresas desde tu JSON o API y despachar la acción setEmpresas
    // Ejemplo: dispatch(setEmpresas(dataEmpresas));
  }, [dispatch]);

  //EMRPESAS:
  // Función para seleccionar una empresa
  const handleSelectEmpresa = (empresa: IEmpresa) => {
    dispatch(setEmpresaActiva(empresa.id));
  };

  // Función para cerrar el modal de creación de empresa
  const handleCloseModal = () => {
    dispatch(closeModal());
    setSelectedImage(null);
    setImagePreviewUrl(null);
    setIsEditing(false);
    resetForm();
  };

  // Función para abrir el modal de ver empresa
  const handleViewEmpresa = (empresa: IEmpresa) => {
    setSelectedEmpresaForView(empresa);
    setIsViewEmpresaOpen(true);
  };
 // Function to close the PopUpVerEmpresa
 const handleCloseViewEmpresa = () => {
  setIsViewEmpresaOpen(false);
  setSelectedEmpresaForView(null);
};
 // Función para manejar la edición de empresa
  const handleEditEmpresa = (empresa: IEmpresa) => {
    setIsEditing(true);
    dispatch(setEmpresaActiva(empresa.id));
    dispatch(openModal());
    
    setFormValues({
      nombre: empresa.nombre,
      razonSocial: empresa.razonSocial,
      cuit: empresa.cuit,
    });

    // Manejar la imagen existente
    handleImagePreview(empresa.logo);
  };

  const handleSubmitEdit = () => {
    // Verifica que selectedEmpresaId no sea null
    if (selectedEmpresaId === null) {
      console.error("No se ha seleccionado una empresa para editar.");
      return; // Evita que se continúe si no hay un ID válido
    }

    // Busca la empresa activa usando selectedEmpresaId
    const empresaActiva = empresas.find(
      (empresa) => empresa.id === selectedEmpresaId
    );

    const empresaEditada = {
      id: selectedEmpresaId ?? 0, // Aquí estamos seguros de que es un número
      nombre: values.nombre,
      razonSocial: values.razonSocial,
      cuit: values.cuit,
      logo: empresaActiva?.logo ?? null,
      sucursales: sucursalesFiltradas,
    };

    dispatch(updateEmpresa(empresaEditada));
    dispatch(closeModal()); // Cierra el modal de edición
  };
  // Función para eliminar una empresa
  const handleDeleteEmpresa = (empresaId: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta empresa?")) {
      dispatch(deleteEmpresa(empresaId)); // Dispatch a la acción de eliminar empresa
    }
  };

  // Función para manejar el envío del formulario de creación de empresa
   const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (isEditing && selectedEmpresaId) {
      const empresaActiva = empresas.find(empresa => empresa.id === selectedEmpresaId);
      
      if (!empresaActiva) {
        console.error("No se encontró la empresa activa");
        return;
      }

      const empresaEditada: IEmpresa = {
        id: selectedEmpresaId,
        nombre: values.nombre,
        razonSocial: values.razonSocial,
        cuit: values.cuit,
        logo: selectedImage || empresaActiva.logo, // Mantener la imagen existente si no se seleccionó una nueva
        sucursales: empresaActiva.sucursales
      };

      dispatch(updateEmpresa(empresaEditada));
    } else {
      // Crear nueva empresa
      const nuevaEmpresa: IEmpresa = {
        id: Date.now(),
        nombre: values.nombre,
        razonSocial: values.razonSocial,
        cuit: values.cuit,
        logo: selectedImage,
        sucursales: []
      };
      dispatch(setEmpresas([...empresas, nuevaEmpresa]));
    }
    
    handleCloseModal();
  };
  //SUCURSALES:
  // Función para agregar una nueva sucursal
  const handleAddSucursal = (sucursal: ISucursales) => {
    if (selectedEmpresaId) {
      dispatch(
        addSucursalToEmpresa({ sucursal, empresaId: selectedEmpresaId })
      );
      dispatch(setSucursalActiva(sucursal.id));
    }
  };
  const handleEditSucursal = (sucursal: ISucursales) => {
    setIsEditing(true); // Activar modo edición
    setSelectedSucursal(sucursal); // Establecer la sucursal seleccionada
    dispatch(openSucursalModal()); // Abrir el modal para sucursales
  };

  const handleUpdateSucursal = (sucursalData: ISucursales) => {
    if (selectedEmpresaId !== null) {
        // Actualizar la sucursal en el estado usando Redux
        dispatch(updateSucursal({ empresaId: selectedEmpresaId, sucursal: sucursalData }));
        handleCloseModal(); // Cerrar el modal después de la actualización
    } else {
        console.error("No se ha seleccionado una empresa.");
    }
};
  // Función para eliminar una sucursal
// Función para eliminar una sucursal
const handleDeleteSucursal = (sucursalId: number) => {
  if (!selectedEmpresaId) {
    alert("Error: No hay una empresa seleccionada");
    return;
  }

  const sucursal = sucursalesFiltradas.find(s => s.id === sucursalId);
  if (!sucursal) {
    alert("Error: No se encontró la sucursal");
    return;
  }

  if (window.confirm(`¿Estás seguro de que quieres eliminar la sucursal "${sucursal.nombre}"?`)) {
    try {
      dispatch(deleteSucursal({ 
        empresaId: selectedEmpresaId, 
        sucursalId 
      }));
      // Opcional: Mostrar mensaje de éxito
      alert("Sucursal eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar la sucursal:", error);
      alert("Hubo un error al eliminar la sucursal");
    }
  }
};
  // Función para ver los detalles de una sucursal
  const handleViewSucursal = (sucursal: ISucursales) => {
    setSelectedSucursal(sucursal);
    setIsViewSucursalOpen(true);
  };
// Función auxiliar para manejar la previsualización de imagen
const handleImagePreview = (imageSource: File | string | null) => {
  if (!imageSource) {
    setSelectedImage(null);
    setImagePreviewUrl(null);
    return;
  }
  if (imageSource instanceof File) {
    setSelectedImage(imageSource);
    setImagePreviewUrl(URL.createObjectURL(imageSource));
  } else if (typeof imageSource === 'string') {
    // Si es una URL existente
    setImagePreviewUrl(imageSource);
    // No establecemos selectedImage porque no tenemos el File
    setSelectedImage(null);
  }
};
// Función para manejar el cambio de imagen
const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    handleImagePreview(file);
  }
};

  return (
    <>
       <div
        className={`${styles.containerView} ${
          isOpenModal || isOpenSucursalModal || isViewSucursalOpen || isViewEmpresaOpen
            ? styles.blurredBackground
            : ""
        }`}
      >
        <aside className={styles.asideContainer}>
          <h1 style={{ fontSize: "1.8rem" }}>Empresas</h1>
          <button onClick={() => dispatch(openModal())}>Agregar Empresa</button>
          {empresas.length > 0 && (
            <div className={styles.empresaContainer}>
              {empresas.map((empresa) => (
                <div
                  key={empresa.id}
                  className={styles.empresaCard}
                  onClick={() => handleSelectEmpresa(empresa)}
                >
                  <h3 style={{ color: "white" }}>{empresa.nombre}</h3>
                  <div className={styles.iconsContainer}>
                    <i
                      className="fa-solid fa-eye"
                      onClick={() => handleViewEmpresa(empresa)}
                      style={{ color: "#086A87" }}
                    ></i>
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => handleDeleteEmpresa(empresa.id)}
                      style={{ color: "#c9410b" }}
                    ></i>
                    <i
                      className="fa-solid fa-pencil"
                      onClick={() => handleEditEmpresa(empresa)}
                      style={{ color: "#17985A" }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <div className={styles.mainContainer}>
          <h2>
            Lista de sucursales de la empresa:{" "}
            {selectedEmpresaId
              ? empresas.find((e) => e.id === selectedEmpresaId)?.nombre
              : "Seleccione una empresa"}
          </h2>
          {selectedEmpresaId && (
            <button
              className={styles.containerButtonSucursal}
              onClick={() => dispatch(openSucursalModal())}
            >
              Agregar Sucursal
            </button>
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
                onDelete={() => handleDeleteSucursal(sucursal.id)}
                onEdit={() => handleEditSucursal(sucursal)}

              />
            ))}
          </div>
        </div>
      </div>

      {isOpenModal && (
        <Modal>
          <form onSubmit={handleSubmit} className={styles.modalContainer}>
            <h2>{isEditing ? "EDITAR EMPRESA" : "CREAR UNA EMPRESA"}</h2>
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
                required={!isEditing} 
              />
              <label htmlFor="file-upload" className={styles.customFileUpload}>
              {isEditing ? 'Cambiar imagen' : 'Seleccionar imagen'}
              </label>
              {imagePreviewUrl ? (
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
                <span className="material-symbols-outlined">add_a_photo</span>
              )}
            </div>
            <div className={styles.containerButtonSubmit}>
              <button
                className={styles.buttonCancelar}
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.buttonAgregar}>{isEditing ? 'Guardar Cambios' : 'Agregar'}</button>
            </div>
          </form>
        </Modal>
      )}


{/* Add PopUpVerEmpresa component */}
{isViewEmpresaOpen && selectedEmpresaForView && (
        <PopUpVerEmpresa
          isOpen={isViewEmpresaOpen}
          onClose={handleCloseViewEmpresa}
          empresa={selectedEmpresaForView}
        />
      )}
      {isOpenSucursalModal && (
        <PopUpSucursal
        isOpen={isOpenSucursalModal}
        onClose={() => dispatch(closeSucursalModal())}
        onAddSucursal={handleAddSucursal}
        onUpdateSucursal={handleUpdateSucursal}  // Pasar la función para actualizar
        onDeleteSucursal={handleDeleteSucursal}
        isEditing={isEditing}  // Pasar el estado de edición
        sucursalToEdit={selectedSucursal}  // Pasar la sucursal seleccionada, si hay alguna
    
        />
      )}
      {isViewSucursalOpen && (
        <PopUpVerSucursal
          isOpen={isViewSucursalOpen}
          sucursal={selectedSucursal!}
          onClose={() => setIsViewSucursalOpen(false)}
        />
      )}
    </>
  );
};
