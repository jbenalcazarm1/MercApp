// src/composables/useCart.js
import { useCartStore } from "@/stores/cart";
import { storeToRefs } from "pinia";

export function useCart() {
  const cartStore = useCartStore();
  const { items, itemCount, totalPrice } = storeToRefs(cartStore);

  const addToCart = (product, quantity = 1) => {
    cartStore.addItem(product, quantity);
  };

  const removeFromCart = (productId) => {
    cartStore.removeItem(productId);
  };

  const updateItemQuantity = (productId, quantity) => {
    cartStore.updateQuantity(productId, quantity);
  };

  const clearCart = () => {
    cartStore.clearCart();
  };

  const isInCart = (productId) => {
    return items.value.some((item) => item._id === productId);
  };

  const getItemQuantity = (productId) => {
    const item = items.value.find((item) => item._id === productId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
}
