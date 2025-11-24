// src/stores/cart.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // State
  const items = ref([]);

  // Load from localStorage on initialization
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem("mercapp-cart");
      if (stored) {
        items.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading cart from storage:", error);
      items.value = [];
    }
  };

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem("mercapp-cart", JSON.stringify(items.value));
    } catch (error) {
      console.error("Error saving cart to storage:", error);
    }
  };

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      const price = item.price || item.precio || 0;
      return total + price * item.quantity;
    }, 0);
  });

  // Actions
  const addItem = (product, quantity = 1) => {
    const existingItem = items.value.find((item) => item._id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({
        ...product,
        quantity,
      });
    }

    saveToStorage();
  };

  const removeItem = (productId) => {
    items.value = items.value.filter((item) => item._id !== productId);
    saveToStorage();
  };

  const updateQuantity = (productId, quantity) => {
    const item = items.value.find((item) => item._id === productId);

    if (item) {
      if (quantity <= 0) {
        removeItem(productId);
      } else {
        item.quantity = quantity;
        saveToStorage();
      }
    }
  };

  const clearCart = () => {
    items.value = [];
    saveToStorage();
  };

  // Initialize cart from storage
  loadFromStorage();

  return {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    loadFromStorage,
  };
});
