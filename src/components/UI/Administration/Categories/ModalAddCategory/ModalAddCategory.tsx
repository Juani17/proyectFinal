// ModalAddCategory.tsx
import { ChangeEvent, FC, useState } from 'react';
import styles from './ModalAddCategory.module.css';
import { Button } from 'react-bootstrap';
import { ICreateCategoria } from '../../../../../endPoints/types/dtos/categorias/ICreateCategoria';
import Swal from 'sweetalert2';

interface IModalAddCategory {
  closeModalAdd: () => void;
  idSucursal: number;
  onAddCategory: (newCategory: ICreateCategoria) => void; // Asegúrate de que esta función se pase correctamente
}

const ModalAddCategory: FC<IModalAddCategory> = ({
  idSucursal,
  closeModalAdd,
  onAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState<ICreateCategoria>({
    denominacion: '',
    idSucursales: [idSucursal], // Esto asume que se agrega la sucursal seleccionada
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
      alert('No puede dejar en blanco el campo');
      return;
    }

    try {
      // Llamar a la función para agregar la categoría
      onAddCategory(newCategory);

      // Mostrar un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Categoría creada',
        text: 'La categoría se ha creado exitosamente.',
      });
    } catch (error) {
      console.error('El problema es: ', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar categoría',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>Agregar Categoría</h1>
      </div>
      <div className={styles.containerBody}>
        <label>Ingrese Denominación</label>
        <input
          type="text"
          placeholder="Denominación"
          value={newCategory.denominacion}
          name="denominacion"
          onChange={handleChange}
        />
      </div>
      <div className={styles.containerButtons}>
        <Button onClick={handleSubmit}>Aceptar</Button>
        <Button onClick={closeModalAdd}>Cancelar</Button>
      </div>
    </div>
  );
};

export default ModalAddCategory;
