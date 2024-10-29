// Configuración del contexto ModalContext: gestiona el estado y control de apertura/cierre de dos modales
// - ModalContext define el contexto con dos modales (isOpenModal e isOpenSucursalModal) y sus funciones.
// - ModalProvider es un proveedor que envuelve la app o componentes hijos, permitiendo acceso global al contexto.
// - Usa useState para manejar el estado de apertura/cierre de cada modal.
// - Define openModal y closeModal para el modal principal, y openSucursalModal y closeSucursalModal para el modal de sucursal.
// - useModalContext es un hook que facilita el acceso al contexto ModalContext en los componentes, lanzando un error si el hook se usa fuera de un ModalProvider.
// El componente devuelve el estado y los métodos para abrir/cerrar cada modal para usarlos en la aplicación.

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  isOpenModal: boolean;
  isOpenSucursalModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  openSucursalModal: () => void;
  closeSucursalModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSucursalModal, setIsOpenSucursalModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const openSucursalModal = () => setIsOpenSucursalModal(true);
  const closeSucursalModal = () => setIsOpenSucursalModal(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        isOpenSucursalModal,
        openModal,
        closeModal,
        openSucursalModal,
        closeSucursalModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook para usar el contexto de modal
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext debe usarse dentro de un ModalProvider");
  }
  return context;
};
