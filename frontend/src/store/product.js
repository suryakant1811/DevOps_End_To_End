
import { create } from 'zustand';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const apiFetch = (path, options = {}) => {
  return fetch(`${API_BASE_URL}${path}`, options);
};

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Fill all fields" };
    }

    try {
      const res = await apiFetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message || "Could not create product" };
      }

      set((state) => ({
        products: [...state.products, data.data],
      }));

      return { success: true, message: "Created successfully" };
    } catch (error) {
      return { success: false, message: error.message || "Error creating product" };
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiFetch('/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        set({ products: data.data });
      } else {
        set({ error: data.message || 'Could not fetch products' });
      }
    } catch (error) {
      set({ error: error.message || 'Error fetching products' });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await apiFetch(`/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: data.message || "Deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error deleting product" };
    }
  },

  updateProduct: async (pid, updateProduct) => {
    try {
      const res = await apiFetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateProduct),
      });

      if (!res.ok) {
        return { success: false, message: "Failed to update product" };
      }

      const data = await res.json();

      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Updated successfully" };
    } catch (error) {
      return { success: false, message: "Error updating product" };
    }
  },

}));



//product.js
