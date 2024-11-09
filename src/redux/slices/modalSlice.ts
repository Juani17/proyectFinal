import { createSlice } from "@reduxjs/toolkit"; // Importa createSlice de Redux Toolkit

// Define la estructura del estado inicial para el modal
interface ModalState {
    isOpen: boolean; // Indica si el modal está abierto (true) o cerrado (false)
}

// Estado inicial con el modal cerrado
const initialState: ModalState = {
    isOpen: false,
};

// Crea un slice de Redux para manejar el estado del modal
const modalSlice = createSlice({
    name: "modal", // Nombre del slice
    initialState, // Estado inicial
    reducers: {
        // Reducer para abrir el modal
        openModal: (state) => {
            state.isOpen = true; // Cambia el estado a true para indicar que el modal está abierto
        },
        // Reducer para cerrar el modal
        closeModal: (state) => {
            state.isOpen = false; // Cambia el estado a false para indicar que el modal está cerrado
        },
    },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { openModal, closeModal } = modalSlice.actions;

// Exporta el reducer para integrarlo en el store de Redux
export default modalSlice.reducer;
