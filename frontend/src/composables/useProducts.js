// src/composables/useProducts.js
import { ref, computed } from "vue";
import { useFetch } from "./useFetch";

export function useProducts() {
  const products = ref([]);
  const categories = ref([]);
  const { data, loading, error, execute } = useFetch();

  const fetchProducts = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.category && filters.category !== "all") {
      params.append("category", filters.category);
    }

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : "/products";

    try {
      const result = await execute(url);
      products.value = result || [];
      return result;
    } catch (err) {
      console.error("Error fetching products:", err);
      products.value = [];
      throw err;
    }
  };

  const fetchProductById = async (id) => {
    try {
      const result = await execute(`/products/${id}`);
      return result;
    } catch (err) {
      console.error("Error fetching product:", err);
      throw err;
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await execute("/categories");
      categories.value = result || [];
      return result;
    } catch (err) {
      console.error("Error fetching categories:", err);
      categories.value = [];
      throw err;
    }
  };

  const createProduct = async (productData) => {
    try {
      const result = await execute("/products", {
        method: "POST",
        data: productData,
      });
      return result;
    } catch (err) {
      console.error("Error creating product:", err);
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const result = await execute(`/products/${id}`, {
        method: "PUT",
        data: productData,
      });
      return result;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const result = await execute(`/products/${id}`, {
        method: "DELETE",
      });
      return result;
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchCategories,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
