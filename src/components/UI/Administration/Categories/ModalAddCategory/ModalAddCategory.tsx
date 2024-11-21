import { ChangeEvent, FC, useState } from 'react';
import styles from './ModalAddCategory.module.css';
import { ICreateCategoria } from '../../../../../endPoints/types/dtos/categorias/ICreateCategoria';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store/store';

interface IModalAddCategory {
  closeModalAdd: () => void;
  onAddCategory: (newCategory: ICreateCategoria) => void;
}

const ModalAddCategory: FC<IModalAddCategory> = ({
  closeModalAdd,
  onAddCategory,
}) => {
  // Obtener la sucursal seleccionada desde Redux
  const selectedSucursal = useSelector(
    (state: RootState) => state.sucursal.selectedSucursal
  );

  if (!selectedSucursal) {
    // Mostrar alerta si no hay sucursal seleccionada
    Swal.fire({
      icon: 'warning',
      title: 'Sucursal no seleccionada',
      text: 'Por favor selecciona una sucursal antes de agregar una categoría.',
    });
    closeModalAdd(); // Cerrar el modal
    return null; // No renderizar el modal
  }

  // Estado local para manejar los datos de la nueva categoría
  const [newCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: '',
    idEmpresa: selectedSucursal.empresa?.id,
    idCategoriaPadre: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!newCategory.denominacion) {
      Swal.fire({
        icon: 'warning',
        title: 'Información incompleta',
        text: 'Por favor, complete el campo antes de continuar.',
      });
      return;
    }

    try {
      // Simulación de creación de categoría.
      console.log('Categoría creada:', newCategory);

      Swal.fire({
        icon: 'success',
        title: '¡Categoría creada!',
        text: 'La categoría se ha creado exitosamente.',
        showConfirmButton: false,
        timer: 1500,
      });

      // Llama a la función de callback para actualizar la lista
      onAddCategory(newCategory);
      closeModalAdd();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la categoría. Intenta nuevamente más tarde.',
      });
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Categoría</h1>
      </div>
      <div className={styles.containerBody}>
        <label>Ingrese un nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={newCategory.denominacion}
          name="denominacion"
          onChange={handleChange}
        />
      </div>
      <div className={styles.containerButtons}>
        <button onClick={handleSubmit}>Aceptar</button>
        <button onClick={closeModalAdd}>Cancelar</button>
      </div>
    </div>
  );
};

export default ModalAddCategory;
