import { configureStore } from "@reduxjs/toolkit";
import empresaReducer from "../slices/EmpresaSlice";
import modalReducer from "../slices/modalSlice";

export const store = configureStore({
  reducer: {
    empresa: empresaReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
