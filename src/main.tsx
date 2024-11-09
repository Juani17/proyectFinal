import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter permite navegación entre rutas */}
    <BrowserRouter>
      {/* Provider conecta la app con Redux para el manejo global del estado */}
      <Provider store={store}>
        {/* Componente principal de la aplicación */}
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
