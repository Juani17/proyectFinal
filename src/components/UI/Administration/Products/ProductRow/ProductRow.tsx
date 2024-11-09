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
  const [showModalViewProduct, setShowModalViewProduct] = useState<boolean>(false);
  // Estado para controlar la visibilidad del modal de edición de producto
  const [showModalEditProduct, setShowModalEditProduct] = useState<boolean>(false);

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
        <TableCell>{product.habilitado ? 'Si' : 'No'}</TableCell>
        <TableCell>
          {/* Botones de acción con íconos SVG */}
          <Button onClick={handleShowModalViewProduct}>
            {/* Ícono de visualización */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Z"/>
            </svg>
          </Button>

          <Button onClick={handleShowModalEditProduct}>
            {/* Ícono de edición */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M200-200h57l391-391-57-57-391 391v57Z"/>
            </svg>
          </Button>

          <Button>
            {/* Ícono de eliminación */}
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Z"/>
            </svg>
          </Button>
        </TableCell>

        {/* Renderiza el modal de vista de producto si showModalViewProduct es true */}
        {showModalViewProduct && (
          <>
            <div className={styles.backgroundDisabled}></div> {/* Fondo semitransparente detrás del modal */}
            <ModalViewProduct product={product} modalClose={handleCloseModalViewProduct} />
          </>
        )}

        {/* Renderiza el modal de edición de producto si showModalEditProduct es true */}
        {showModalEditProduct && (
          <>
            <div className={styles.backgroundDisabled}></div> {/* Fondo semitransparente detrás del modal */}
            <ModalEditProduct product={product} modalClose={handleCloseModalEditProduct} />
          </>
        )}
      </TableRow>
    </>
  );
};
