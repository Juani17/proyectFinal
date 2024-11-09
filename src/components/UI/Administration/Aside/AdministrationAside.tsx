import { Button } from 'react-bootstrap'
import styles from '../../../UI/Administration/Aside/AdministrationAside.module.css'
import { useNavigate } from 'react-router-dom'

export const AdministrationAside = () => {
  // Inicializamos el hook 'useNavigate' para permitir la navegación entre rutas
  const navigate = useNavigate()

  // Funciones para manejar la navegación a diferentes rutas de administración
  const handleNavigateToCategories = () => {
    navigate('/administracion/categorias') // Navega a la ruta de categorías
  }

  const handleNavigateToProducts = () => {
    navigate('/administracion/productos') // Navega a la ruta de productos
  }

  const handleNavigateToAlergenos = () => {
    navigate('/administracion/alergenos') // Navega a la ruta de alergenos
  }

  return (
    // El contenedor principal de la barra lateral (aside)
    <aside className={styles.aside}>
      
      {/* Título de la sección de administración */}
      <h1 className={styles.asideTitle}>Administración</h1>

      {/* Contenedor de botones, cada uno lleva a una sección distinta de administración */}
      <div className={styles.asideButtons}>
        {/* Botón para navegar a la sección de Categorías */}
        <Button onClick={handleNavigateToCategories} className={styles.asideBtn}>
          Categorías
        </Button>

        {/* Botón para navegar a la sección de Productos */}
        <Button onClick={handleNavigateToProducts} className={styles.asideBtn}>
          Productos
        </Button>

        {/* Botón para navegar a la sección de Alergenos */}
        <Button onClick={handleNavigateToAlergenos} className={styles.asideBtn}>
          Alergenos
        </Button>
      </div>
    </aside>
  )
}