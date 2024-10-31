import { createSlice } from "@reduxjs/toolkit";

// Estado inicial para los modales
interface ModalState {
  isOpenModal: boolean;
  isOpenSucursalModal: boolean;
}

const initialState: ModalState = {
  isOpenModal: false,
  isOpenSucursalModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
    openSucursalModal: (state) => {
      state.isOpenSucursalModal = true;
    },
    closeSucursalModal: (state) => {
      state.isOpenSucursalModal = false;
    },
  },
});

// Exporta las acciones
export const { openModal, closeModal, openSucursalModal, closeSucursalModal } =
  modalSlice.actions;

// Exporta el *reducer*
export default modalSlice.reducer;
