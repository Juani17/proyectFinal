# Javachispas — Panel de administración

Frontend académico grupal para administrar empresas, sucursales, categorías, productos y alérgenos mediante una API externa. Desarrollado con React y TypeScript.

## Tecnologías y alcance

React 18, TypeScript, Vite, React Router, Redux Toolkit, Axios, Formik, Yup, Material UI y React Bootstrap. Incluye pantallas de administración, formularios, modales y servicios HTTP. El backend no está incluido en este repositorio.

## Ejecución

Requisitos: Node.js, npm y un backend compatible en funcionamiento. El proyecto no declara una versión específica de Node.js.

```bash
npm install
cp .env.example .env
npm run dev
```

En PowerShell: `Copy-Item .env.example .env`. Configurar `VITE_API_URL` con la URL base del backend. Las variables `VITE_*` quedan visibles en el navegador y no deben contener secretos. Consultar la dirección local que informa Vite al iniciar.

Scripts disponibles: `npm run build`, `npm run lint` y `npm run preview`.

## Organización

- `src/components/`: pantallas y componentes de administración.
- `src/Services/`: acceso HTTP al backend.
- `src/redux/`: estado compartido.
- `src/routes/`: navegación.
- `src/endPoints/types/`: tipos y DTO de la API.

## Autoría y estado

Proyecto del grupo Javachispas: Francisco Barraco, Franco Sardi, Joaquín Redondo y Juan Emilio Frery.

Se conserva la implementación académica original. La integración necesita el backend correspondiente y no fue validada contra un servicio activo.
