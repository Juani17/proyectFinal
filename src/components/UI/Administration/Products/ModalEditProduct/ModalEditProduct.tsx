import { ChangeEvent, FC, useEffect, useState } from "react";
import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos";
import { ICategorias } from "../../../../../endPoints/types/dtos/categorias/ICategorias";
import { IAlergenos } from "../../../../../endPoints/types/dtos/alergenos/IAlergenos";
import { IImagen } from "../../../../../endPoints/types/IImagen";
import { RootState } from "../../../../../redux/store/store";
import { IUpdateProducto } from "../../../../../endPoints/types/dtos/productos/IUpdateProducto";
import { categoryService } from "../../../../../Services/categoryServices";
import { alergenoService } from "../../../../../Services/alergenoServices";
import Swal from "sweetalert2";
import { articleService } from "../../../../../Services/articleServices";
import { Button } from "react-bootstrap";
import { UploadImage } from "../ModalAddProduct/UploadImage";
import styles from "./ModalEditProduct.module.css";
import { useSelector } from "react-redux";

interface IModalViewProduct {
    product: IProductos;
    modalClose: () => void
}

export const ModalEditProduct : FC<IModalViewProduct> = ({product, modalClose}) => {
  const [categories, setCategories] = useState<ICategorias[]>([])
  const arrayAlergenos = product.alergenos.map((alergeno) => alergeno.id);
  const [selectedAlergenos, setSelectedAlergenos] = useState<number[]>(arrayAlergenos)
  const [isAlergenosOpen, setIsAlergenosOpen] = useState(false);
  const [alergenos, setAlergenos] = useState<IAlergenos[]>([])
  const [imageProduct, setImageProduct] = useState<IImagen | null>(product.imagenes[0]);


  const storedSucursal = localStorage.getItem('sucursal');

  const selectedSucursal = storedSucursal ? JSON.parse(storedSucursal) : useSelector(
      (state: RootState) => state.sucursal.selectedSucursal
  )
  

  const [productToEdit, setProductToEdit] = useState<IUpdateProducto>({
    id: product.id,
    denominacion: product.denominacion,
    precioVenta: product.precioVenta,
    descripcion: product.descripcion, 
    habilitado: product.habilitado ?? false,
    imagenes: product.imagenes,
    codigo: product.codigo,
    idCategoria: product.categoria.id,
    idAlergenos: arrayAlergenos
  });


  useEffect(() => {
    const fetchCategories = async () => {
        const data = await categoryService.getCategoriesBySucursal(selectedSucursal.id);
        setCategories(data);
    }
    fetchCategories();
},[])

useEffect(() => {
  const fetchAlergenos = async () => {
      const data = await alergenoService.getAllAlergenos();
      setAlergenos(data);
  }
  fetchAlergenos();
},[])


const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  if (!productToEdit.denominacion || !productToEdit.descripcion || (productToEdit.idCategoria <= 0 || productToEdit.precioVenta <= 0)  || !productToEdit.codigo ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Rellene todos los campos.",
    });
    return;
  }



  try {
    const productToSend = {
      ...productToEdit,
      idAlergenos: selectedAlergenos,
      imagenes: imageProduct?[imageProduct] : productToEdit.imagenes
  }

    await articleService.updateArticle(product.id, productToSend);

    Swal.fire({
      icon: "success",
      title: "Producto actualizado",
      showConfirmButton: false,
      timer: 1500,
      willClose: () => {
        modalClose();
        window.location.reload();
      },
    });
  } catch (error) {
    console.error("El problema es: ", error);
    console.log("datos envidos", productToEdit);
    
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }
};


const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value, type, checked } = e.target;

  setProductToEdit({
      ...productToEdit,
      [name]: type === "checkbox" ? checked : value,
  });
};

const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
  setProductToEdit((prev) => ({
    ...prev,
    idCategoria: parseInt(e.target.value),
  }));
};

const toggleAlergeno = (alergenoid: number) => {
        
  setSelectedAlergenos((prev) => {
    if (prev.includes(alergenoid)) {
      return prev.filter((id) => id !== alergenoid);
    } else {
      return [...prev, alergenoid];
    }
  });
  
  
};

const handleAlergenosToggle = () => {
  setIsAlergenosOpen(!isAlergenosOpen);
  console.log(selectedAlergenos);
};

  return (
    <div className={styles.containerPrincipal}>
        <div className={styles.containerTitle}>
            <h2>Editar Producto</h2>
        </div>
        
        <div className={ styles.containerData }>
        <form action="" className={styles.containerForm} >
        <div className={styles.blockOne}>

                    <label htmlFor="">Denominacion</label>
                    <input type="text" placeholder="Nombre del Producto" name="denominacion" value={productToEdit.denominacion} onChange={handleChange}/>

                    <label htmlFor="">Precio venta</label>
                    <input type="text" placeholder="Razon Social de la empresa" name="precioVenta" value={productToEdit.precioVenta} onChange={handleChange}/>

                    <label htmlFor="">Descripcion</label>
                    <input type="text" placeholder="Descripcion del producto" name="descripcion" value={productToEdit.descripcion} onChange={handleChange}/>
        </div>

        <div className={styles.blockTwo}>

                    <label htmlFor="">Código</label>                    
                    <input type="text" placeholder="Link de imagen" name="codigo" value={productToEdit.codigo} onChange={handleChange}/>

                    <label htmlFor="categoria">Categoria: </label>
                      <select name="" id="" onChange={handleCategoryChange}>
                          <option value={productToEdit.idCategoria}>
                            {categories.find((category) => category.id === productToEdit.idCategoria)?.denominacion}
                          </option>
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>{category.denominacion}
                          </option>
                          ))}
                  </select>

                  <label htmlFor="">Habilitado</label>
                    <input type="checkbox" name="habilitado"id="habilitado" checked={productToEdit.habilitado}  onChange={handleChange}/>
                    

                  <div className={styles.alergenosDropdown}>
              <Button type="button" onClick={handleAlergenosToggle}>
                Seleccionar alérgenos
              </Button>
              {isAlergenosOpen && (
                <div className={styles.alergenosList}>
                    {alergenos.map((alergeno) => (
                      <div key={alergeno.id} className={styles.alergenoOption}>
                            <input
                                type="checkbox"
                                id={`alergeno-${alergeno.id}`}
                                checked={selectedAlergenos.includes(alergeno.id)}
                                onChange={() => toggleAlergeno(alergeno.id)}
                            />
                            <label htmlFor={`alergeno-${alergeno.id}`}>{alergeno.denominacion}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.uploadImage}>

              <UploadImage 
                imageObjeto={imageProduct}
                setImageObjeto={setImageProduct}
                typeElement="images"
                />
                </div>

              </div>
                </form>
            

           

        </div>
        <div className={styles.containerButton}>
            <Button onClick={handleSubmit}>Confirmar</Button>
            <Button onClick={modalClose}>Cerrar</Button>
        </div>

    </div>
  )
}
