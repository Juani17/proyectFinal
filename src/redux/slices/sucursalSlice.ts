import { createSlice, PayloadAction } from "@reduxjs/toolkit"; // Importa createSlice y PayloadAction de Redux Toolkit
import { ISucursal } from "../../endPoints/types/dtos/sucursal/ISucursal"; // Importa la interfaz de la sucursal

// Define la estructura del estado inicial para la sucursal
interface SucursalState {
    selectedSucursal: ISucursal | null; // Representa la sucursal seleccionada o null si no hay ninguna seleccionada
}

// Estado inicial con selectedSucursal establecido en null
const initialState: SucursalState = {
    selectedSucursal: null,
};

// Crea un slice de Redux para manejar el estado de la sucursal
const sucursalSlice = createSlice({
    name: "sucursal", // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para establecer la sucursal seleccionada
        setSelectedSucursal: (state, action: PayloadAction<ISucursal>) => {
            state.selectedSucursal = action.payload; // Actualiza el estado con la sucursal proporcionada en la acción
        },
        // Reducer para limpiar la sucursal seleccionada
        clearSelectedSucursal: (state) => {
            state.selectedSucursal = null; // Restablece el estado a null
        },
    },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { setSelectedSucursal, clearSelectedSucursal } = sucursalSlice.actions;

// Exporta el reducer para integrarlo en el store de Redux
export default sucursalSlice.reducer;
