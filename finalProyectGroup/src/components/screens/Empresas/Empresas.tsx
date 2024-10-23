import styles from "./Empresas.module.css"
export const Empresas = () => {
  return (
    <div className={styles.containerPrincipal}>
        <div className={styles.ContainerBarra}>
            <h3>EMPRESAS</h3>
            <button className={styles.buttonAgregar}>AGREGAR UNA EMPRESA</button>
        </div>
        <div className={styles.ContainerContenido}>
            <h3>Lista de sucursales: </h3>

        </div>
    </div>
  )
}
