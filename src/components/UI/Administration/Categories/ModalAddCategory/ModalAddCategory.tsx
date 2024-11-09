import { ChangeEvent, FC, useState } from "react";
import styles from "./ModalAddCategory.module.css";
import { Button } from "react-bootstrap";
import { ICreateCategoria } from "../../../../../endPoints/types/dtos/categorias/ICreateCategoria";
import Swal from "sweetalert2";
import { categoryService } from "../../../../../Services/categoryServices";

interface IModalAddCategory {
  closeModalAdd: () => void; // Función para cerrar el modal
  idSucursal: number; // ID de la sucursal
}

const ModalAddCategory: FC<IModalAddCategory> = ({
  idSucursal,
  closeModalAdd,
}) => {
  // Estado para manejar los datos de la nueva categoría que se está creando
  const [newCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: "", // Nombre de la categoría
    idSucursales: [idSucursal], // ID de la sucursal donde se va a crear la categoría
    idCategoriaPadre: null, // ID de la categoría padre (si existe), inicialmente es null
  });

  // Función que maneja el cambio en los campos del formulario
  const handleCahge = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Actualiza el estado de la nueva categoría con el valor cambiado
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función que maneja el envío del formulario para crear la nueva categoría
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Verificación básica: si el campo denominación está vacío, muestra un mensaje de alerta
    if (!newCategory.denominacion) {
      alert("No puede dejar en blanco el campo");
      return;
    }

    try {
      // Verificamos los datos que vamos a enviar
      console.log("Enviando datos:", JSON.stringify(newCategory));

      // Llamada al servicio para crear la categoría
      await categoryService.createCategory(newCategory);

      // Muestra un mensaje de éxito con SweetAlert
      Swal.fire({
        icon: "success",
        title: "Categoría creada",
        text: "La categoría se ha creado exitosamente.",
      });

      // Cierra el modal después de crear la categoría
      closeModalAdd();
    } catch (error) {
      // Si ocurre un error, muestra el error y luego cierra el modal
      console.error("El problema es: ", error);
      Swal.fire({
        icon: "success",
        title: "Categoria agregada",
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModalAdd(); // Cierra el modal
          window.location.reload(); // Recarga la página
        },
      });
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Categoria</h1>
      </div>
      <div className={styles.containerBody}>
        <label htmlFor="">Ingrese Denominacion</label>
        {/* Campo de entrada para la denominación de la categoría */}
        <input
          type="text"
          placeholder="Denominacion"
          value={newCategory.denominacion}
          name="denominacion"
          onChange={handleCahge}
        />
      </div>
      <div className={styles.containerButtons}>
        {/* Botón de Aceptar para enviar la nueva categoría */}
        <Button onClick={handleSubmit}>Aceptar</Button>
        {/* Botón de Cancelar para cerrar el modal sin hacer cambios */}
        <Button onClick={closeModalAdd}>Cancelar</Button>
      </div>
    </div>
  );
};

export default ModalAddCategory;
