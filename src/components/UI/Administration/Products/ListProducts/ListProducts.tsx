import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { RootState } from "../../../../../redux/store/store";
import { useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";

import { IProductos } from "../../../../../endPoints/types/dtos/productos/IProductos";
import { articleService } from "../../../../../Services/articleServices";
import { ProductRow } from "../ProductRow/ProductRow";
import { Button } from "react-bootstrap";
import styles from "./ListProducts.module.css";
import { ModalAddProduct } from "../ModalAddProduct/ModalAddProduct";
import { ICategorias } from "../../../../../endPoints/types/dtos//categorias/ICategorias";
import { categoryService } from "../../../../../Services/categoryServices";

export const ListProducts = () => {
  const storedSucursal = localStorage.getItem("sucursal");

  const selectedSucursal = storedSucursal
    ? JSON.parse(storedSucursal)
    : useSelector((state: RootState) => state.sucursal.selectedSucursal);

  const [products, setProducts] = useState<IProductos[]>([]);
  const [categories, setCategories] = useState<ICategorias[]>([]);
  const [showModalAddProduct, setShowModalAddProduct] =
    useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategorias | undefined
  >(undefined);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.categoria.denominacion === selectedCategory.denominacion
      )
    : products;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (!productsLoaded) {
        try {
          const data = await articleService.getPagedArticles(
            selectedSucursal?.id,
            page - 1
          );
          setProducts(data.content);
          setTotalPages(data.totalPages);
          setTotalElements(data.totalElements);
          setProductsLoaded(true);
        } catch (error) {
          console.error("Error al cargar productos:", error);
        }
      }
    };

    fetchProducts();
    setLoading(false);
  }, [selectedSucursal, productsLoaded, page]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!categoriesLoaded) {
        try {
          const data = await categoryService.getCategoriesBySucursal(
            selectedSucursal?.id
          );
          setCategories(data);
          setCategoriesLoaded(true);
        } catch (error) {
          console.error("Error al cargar categorías:", error);
        }
      }
    };

    fetchCategories();
  }, [selectedSucursal, categoriesLoaded]);

  const handleShowModalAddProduct = () => {
    setShowModalAddProduct(true);
  };
  const handleCloseModalAddProduct = () => {
    setShowModalAddProduct(false);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const filtredCategories = categories.find(
      (category) => category.denominacion === e.target.value
    );

    if (filtredCategories?.denominacion === "") {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(filtredCategories);
    }
  };

  return (
    <div className={styles.heroContainer}>
      <div className={styles.upContainer}>
        <Button
          className={styles.addButton}
          onClick={handleShowModalAddProduct}
        >
          + Producto
        </Button>
        <div className={styles.filterContainer}>
          <select
            className={styles.categorySelect}
            onChange={handleCategoryChange}
          >
            <option value="">🔍 Filtrar por categoría</option>
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id}>{category.denominacion}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", height: "73vh" }}
      >
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableName}>Nombre</TableCell>
              <TableCell className={styles.tableHeadCell}>Precio</TableCell>
              <TableCell className={styles.tableDescriptionCell}>Descripción</TableCell>
              <TableCell className={styles.tableHeadCell}>Categoría</TableCell>
              <TableCell className={styles.tableHeadCell}>Habilitado</TableCell>
              <TableCell className={styles.tableHeadCell}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showModalAddProduct && (
        <div className={styles.backgroundDisabled}>
          <ModalAddProduct
            closeModal={handleCloseModalAddProduct}
            sucursal={selectedSucursal}
          />
        </div>
      )}
    </div>
  );
};

export default ListProducts;
