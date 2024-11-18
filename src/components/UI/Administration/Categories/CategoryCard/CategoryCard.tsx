import { FC, useEffect, useState } from "react";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import styles from "./CardCategory.module.css";
import { categoryService } from "../../../../../Services/categoryServices";
import { Button } from "react-bootstrap";
import ModalAddSubCategory from "../ModalAddSubCategory/ModalAddSubCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";

// Definimos la interfaz para las props del componente que contiene una categoría
interface ICategoryCard {
  category: ICategorias;
}

const CategoryCard: FC<ICategoryCard> = ({ category }) => {
  // Estado para almacenar las subcategorías de la categoría actual
  const [subCategories, setSubCategories] = useState<ICategorias[]>([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showModalSubCategory, setShowModalSubCategory] = useState(false);

  // Recuperamos la sucursal seleccionada desde el localStorage o el store de Redux
  const storedSucursal = localStorage.getItem("sucursal");
  const selectedSucursal = storedSucursal
    ? JSON.parse(storedSucursal)
    : useSelector((state: RootState) => state.sucursal.selectedSucursal);

  // Validamos si la categoría y la sucursal están disponibles antes de continuar
  if (!category || !selectedSucursal) {
    return <div>Error: No se encontró la categoría o sucursal seleccionada.</div>;
  }

  // useEffect para cargar las subcategorías cuando la categoría o sucursal cambian
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategoriesFetched = await categoryService.getAllSubCategoriesByCategoryId(
          category.id,
          selectedSucursal.id
        );
        setSubCategories(subCategoriesFetched);
      } catch (error) {
        console.error("Error al obtener las subcategorías:", error);
      }
    };

    fetchSubCategories();
  }, [category, selectedSucursal]);

  const handleShowSubCategory = () => setShowSubCategory(!showSubCategory);
  const handleShowModalSubCategory = () => setShowModalSubCategory(true);
  const closeModal = () => setShowModalSubCategory(false);

  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.containerTitle}>
        <h1>{category.denominacion}</h1>
        <div className={styles.buttonsEdit}>
          <Button onClick={handleShowModalSubCategory}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="#e8eaed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </div>
      <div className={styles.containerBody} onClick={handleShowSubCategory}>
        <div className={styles.containerSubTitle}>
          <span
            className={`material-icons ${styles.arrowIcon} ${showSubCategory ? styles.rotated : ""}`}
          >
            arrow_right
          </span>
          <h2>Subcategorías</h2>
        </div>
        {subCategories.length > 0 ? (
          <div className={showSubCategory ? styles.containerSubcategoryTrue : styles.containerSubcategoryFalse}>
            <ul>
              {subCategories.map((subCategory) => (
                <li key={subCategory.id} className={styles.subcategoryItem}>
                  {subCategory.denominacion}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={showSubCategory ? styles.containerSubcategoryTrue : styles.containerSubcategoryFalse}>
            <p>No hay subcategorías</p>
          </div>
        )}
        {showModalSubCategory && (
          <>
            <div className={styles.backgroundDisabled}></div>
            <ModalAddSubCategory
              closeModalAdd={closeModal}
              idSucursal={selectedSucursal.id}
              idCategoriaPadre={category.id}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
