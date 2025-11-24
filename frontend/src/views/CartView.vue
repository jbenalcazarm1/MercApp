<template>
  <div class="animate-fade-in">
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gradient mb-2">
          Carrito de Compras
        </h1>
        <p class="text-gray-400">
          {{ itemCount }} {{ itemCount === 1 ? "producto" : "productos" }} en tu
          carrito
        </p>
      </div>

      <router-link to="/" class="btn-outline">
        Continuar comprando
      </router-link>
    </div>

    <!-- Empty Cart State -->
    <div v-if="items.length === 0" class="glass-card p-12 text-center">
      <div class="text-6xl mb-4">🛒</div>
      <h3 class="text-2xl font-semibold text-white mb-2">
        Tu carrito está vacío
      </h3>
      <p class="text-gray-400 mb-6">Agrega productos desde nuestro catálogo</p>
      <router-link to="/" class="btn-primary"> Ver catálogo </router-link>
    </div>

    <!-- Cart Items -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Items List -->
      <div class="lg:col-span-2 space-y-4">
        <CartItem
          v-for="item in items"
          :key="item._id"
          :item="item"
          @update-quantity="(qty) => updateItemQuantity(item._id, qty)"
          @remove="removeFromCart(item._id)"
        />
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="glass-card p-6 sticky top-24">
          <h2 class="text-2xl font-bold text-white mb-6">Resumen del pedido</h2>

          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>

            <div class="flex justify-between text-gray-300">
              <span>Envío</span>
              <span class="text-green-400">Gratis</span>
            </div>

            <div class="border-t border-white/10 pt-4">
              <div class="flex justify-between text-xl font-bold">
                <span class="text-white">Total</span>
                <span class="text-gradient">${{ totalPrice.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <button class="btn-primary w-full mb-3">Proceder al pago</button>

          <button
            @click="handleClearCart"
            class="btn-outline w-full text-red-400 border-red-400 hover:bg-red-400/10"
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from "@/composables/useCart";
import CartItem from "@/components/CartItem.vue";

const {
  items,
  itemCount,
  totalPrice,
  updateItemQuantity,
  removeFromCart,
  clearCart,
} = useCart();

const handleClearCart = () => {
  if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
    clearCart();
  }
};
</script>
