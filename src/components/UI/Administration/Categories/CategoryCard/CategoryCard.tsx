import { FC, useEffect, useState } from "react";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import styles from "./CardCategory.module.css";
import { categoryService } from "../../../../../Services/categoryServices";
import { Button } from "react-bootstrap";
import ModalAddSubCategory from "../ModalAddSubCategory/ModalAddSubCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import ModalEditCategory from "../ModalEditCategory/ModalEditCategory";

// Definimos la interfaz para las props del componente que contiene una categoría
interface ICategoryCard {
  category: ICategorias;
}

const CategoryCard: FC<ICategoryCard> = ({ category }) => {
  // Estado para almacenar las subcategorías de la categoría actual
  const [subCategories, setSubCategories] = useState<ICategorias[]>([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showModalSubCategory, setShowModalSubCategory] = useState(false);
  const [showModalEditCategory, setShowModalEditCategory] = useState(false); //Estado para ver el modal de editar


  // Traemos la sucursal seleccionada desde la store de Redux
  const selectedSucursal = useSelector((state: RootState) => state.sucursal.selectedSucursal);


  // Validamos si la categoría y la sucursal están disponibles antes de continuar
  if (!category || !selectedSucursal) {
    return <div>Error: No se encontró la categoría o sucursal seleccionada.</div>;
  }

  // useEffect para cargar las subcategorías cuando la categoría o sucursal cambian
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const subCategoriesFetched = await categoryService.getAllSubCategoriesPorCAtegoriaPadre(
          selectedSucursal.id,
          category.id
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
  const closeModalEdit = () => setShowModalEditCategory(false);

  const handleModalEdit = () =>{
    setShowModalEditCategory(true);
}

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
          <Button onClick={handleModalEdit}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
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
              idCategoriaPadre={category.id}
            />
          </>
        )}

        {showModalEditCategory && (
          <div onClick={(e) => e.stopPropagation()}>
            <div className={styles.backgroundDisabled}></div> 
                <ModalEditCategory closeModalEdit={closeModalEdit} category={category}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
