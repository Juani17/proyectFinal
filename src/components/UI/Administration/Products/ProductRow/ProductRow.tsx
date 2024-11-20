import { TableCell, TableRow } from "@mui/material"; // Importa componentes de la tabla de Material UI
import { FC, useState } from "react"; // Importa FC (Functional Component) y useState de React
import { Button } from "react-bootstrap"; // Importa el componente Button de React Bootstrap
import { ModalViewProduct } from "../ModalViewProduct/ModalViewProduct"; // Importa el componente ModalViewProduct
import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos"; // Importa la interfaz del tipo de producto
import styles from "./ProductRow.module.css"; // Importa los estilos CSS
import { ModalEditProduct } from "../ModalEditProduct/ModalEditProduct"; // Importa el componente ModalEditProduct

// Interfaz que define las propiedades esperadas para el componente
interface IProductRow {
  product: IProductos; // Producto que se mostrará en la fila de la tabla
}

// Componente funcional que representa una fila de la tabla con detalles de productos
export const ProductRow: FC<IProductRow> = ({ product }) => {
  // Estado para controlar la visibilidad del modal de vista de producto
  const [showModalViewProduct, setShowModalViewProduct] =
    useState<boolean>(false);
  // Estado para controlar la visibilidad del modal de edición de producto
  const [showModalEditProduct, setShowModalEditProduct] =
    useState<boolean>(false);

  // Funciones para abrir y cerrar el modal de vista de producto
  const handleShowModalViewProduct = () => {
    setShowModalViewProduct(true);
  };
  const handleCloseModalViewProduct = () => {
    setShowModalViewProduct(false);
  };

  // Funciones para abrir y cerrar el modal de edición de producto
  const handleShowModalEditProduct = () => {
    setShowModalEditProduct(true);
  };
  const handleCloseModalEditProduct = () => {
    setShowModalEditProduct(false);
  };

  return (
    <>
      {/* Renderiza una fila de la tabla con los detalles del producto */}
      <TableRow key={product.id}>
        {/* Celdas de la tabla que muestran información del producto */}
        <TableCell>{product.denominacion}</TableCell>
        <TableCell>{product.precioVenta}</TableCell>
        <TableCell>{product.descripcion}</TableCell>
        <TableCell>{product.categoria.denominacion}</TableCell>
        <TableCell>{product.habilitado ? "Si" : "No"}</TableCell>
        <TableCell>
          {/* Botones de acción con íconos SVG */}
          <Button className={styles.buttonView} onClick={handleShowModalViewProduct}>
            {/* Ícono de visualización */}
            <span className="material-symbols-outlined">visibility</span>
          </Button>

          <Button className={styles.buttonEdit} onClick={handleShowModalEditProduct}>
            {/* Ícono de edición */}
            <span className="material-symbols-outlined">edit_square</span>
          </Button>
        </TableCell>

        {/* Renderiza el modal de vista de producto si showModalViewProduct es true */}
        {showModalViewProduct && (
          <>
            <div className={styles.backgroundDisabled}></div>{" "}
            {/* Fondo semitransparente detrás del modal */}
            <ModalViewProduct
              product={product}
              modalClose={handleCloseModalViewProduct}
            />
          </>
        )}

        {/* Renderiza el modal de edición de producto si showModalEditProduct es true */}
        {showModalEditProduct && (
          <>
            <div className={styles.backgroundDisabled}></div>{" "}
            {/* Fondo semitransparente detrás del modal */}
            <ModalEditProduct
              product={product}
              modalClose={handleCloseModalEditProduct}
            />
          </>
        )}
      </TableRow>
    </>
  );
};
