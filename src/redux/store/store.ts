import { configureStore } from '@reduxjs/toolkit'; // Importa configureStore desde Redux Toolkit
import companySlice from '../slices/companySlice'; // Importa el slice de la empresa
import sucursalSlice from '../slices/sucursalSlice'; // Importa el slice de la sucursal
import modalSlice from '../slices/modalSlice'; // Importa el slice del modal

// Configura el store de Redux combinando los slices que gestionan los estados de la empresa, sucursal y modal
export const store = configureStore({
  reducer: {
    company: companySlice, // Agrega el reducer de la empresa
    sucursal: sucursalSlice, // Agrega el reducer de la sucursal
    modal: modalSlice, // Agrega el reducer del modal
  },
});

// Inferir los tipos `RootState` y `AppDispatch` a partir de la configuración del store
export type RootState = ReturnType<typeof store.getState>; 
// `RootState` representa el estado global de la aplicación, que es el resultado de `getState()`.

// `AppDispatch` es el tipo inferido para el despachador de acciones de Redux
export type AppDispatch = typeof store.dispatch; 
// `AppDispatch` es usado cuando se despachan acciones a través de `dispatch`

// Exporta el store configurado para ser usado en toda la aplicación
export default store;
