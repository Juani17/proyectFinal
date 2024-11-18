import { useEffect, useState } from "react";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import CategoryCard from "../CategoryCard/CategoryCard";
import styles from "./ListCategories.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useSelector } from "react-redux";
import { categoryService } from "../../../../../Services/categoryServices";
import { Button } from "react-bootstrap";
import ModalAddCategory from "../ModalAddCategory/ModalAddCategory";
import { ICreateCategoria } from "../../../../../endPoints/types/dtos/categorias/ICreateCategoria";

const ListCategories = () => {
  const storedSucursal = localStorage.getItem('sucursal'); 
  const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
    (state: RootState) => state.sucursal.selectedSucursal
  );

  const [showModalAddCategory, setShowModalAddCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategorias[]>([]);

  // Fetch categorías al montar el componente y cuando cambia la sucursal seleccionada
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategoriesBySucursal(selectedSucursal?.id);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (selectedSucursal?.id) {
      fetchCategories();
    }
  }, [selectedSucursal]);

  // Abrir el modal para agregar una nueva categoría
  const handleModal = () => {
    setShowModalAddCategory(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setShowModalAddCategory(false);
  };

  // Agregar la nueva categoría a la lista después de recibir la respuesta de la API
  const handleAddCategory = (newCategory: ICreateCategoria) => {
    categoryService.createCategory(newCategory).then((createdCategory) => {
      // Actualizar el estado con la categoría recién creada, con el ID de la API
      setCategories((prevCategories) => [
        ...prevCategories,
        createdCategory, // La categoría creada con su ID único
      ]);
      // Cerrar el modal después de agregar la categoría
      closeModal();
    }).catch((error) => {
      console.error("Error al agregar categoría:", error);
    });
  };

  return (
    <div className={styles.contentHero}>
      <div className={styles.categoryHeader}>
        <h1>Categorías</h1>
        <Button onClick={handleModal}>Agregar Categoría</Button>
      </div>

      <ul className={styles.containerList}>
                {categories.filter(category => (!category.categoriaPadre)).map(category => (
                    <li key={category.id} className={styles.containerPrincipal}>
                        <CategoryCard category={category} />
                    </li>
                ))}
            </ul>

      {showModalAddCategory && (
        <>
          <div className={styles.backgroundDisabled}></div>
          <ModalAddCategory 
            closeModalAdd={closeModal} 
            idSucursal={selectedSucursal.id} 
            onAddCategory={handleAddCategory} 
          />
        </>
      )}
    </div>
  );
};

export default ListCategories;
