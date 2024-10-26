import React, { ReactNode } from "react"
import styles from "./Modal.module.css"


interface ModalProps {
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className={styles.modalView} >
        <div  >
          {children}
        </div>
    </div>
  )
}

export default Modal 