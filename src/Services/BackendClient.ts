import Swal from "sweetalert2";
import { AbstractBackendClient } from "./AbstractBackendClient";

export abstract class BackendClient<T> extends AbstractBackendClient<T> {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}`);
    if (!response.ok) {
      throw new Error(`Error`);
    }
    const data = await response.json();
    return data as T[];
  }

  async getById(id: string): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Error`);
    }
    const data = await response.json();
    return data as T;
  }

  async post(data: T): Promise<T> {
    Swal.fire({
      title: "Enviando datos...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error`);
      }
      const newData = await response.json();
      return newData as T;
    } finally {
      Swal.close();
    }
  }

  async put(id: number, data: T): Promise<T> {
    Swal.fire({
      title: "Editando datos...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error`);
      }
      const newData = await response.json();
      return newData as T;
    } finally {
      Swal.close();
    }
  }

  // Método para eliminar un elemento por su ID
  async delete(id: number): Promise<void> {
    Swal.fire({
      title: "Eliminando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error`);
      }
    } finally {
      Swal.close();
    }
  }
}
