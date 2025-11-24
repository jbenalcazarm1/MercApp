<template>
  <div class="glass-card p-4 flex items-center gap-4 animate-fade-in">
    <!-- Product Image -->
    <img
      :src="item.imageUrl || item.imagen || 'https://via.placeholder.com/100'"
      :alt="itemName"
      class="w-20 h-20 object-cover rounded-lg"
      @error="handleImageError"
    />

    <!-- Product Info -->
    <div class="flex-1">
      <h4 class="font-semibold text-white mb-1">{{ itemName }}</h4>
      <p class="text-sm text-gray-400">${{ itemPrice.toFixed(2) }} c/u</p>
    </div>

    <!-- Quantity Controls -->
    <div class="flex items-center gap-3">
      <button
        @click="decreaseQuantity"
        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
      >
        -
      </button>

      <span class="text-white font-semibold w-8 text-center">{{
        item.quantity
      }}</span>

      <button
        @click="increaseQuantity"
        class="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
      >
        +
      </button>
    </div>

    <!-- Subtotal -->
    <div class="text-right min-w-[100px]">
      <p class="text-sm text-gray-400">Subtotal</p>
      <p class="text-lg font-bold text-primary-400">
        ${{ subtotal.toFixed(2) }}
      </p>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove')"
      class="text-red-400 hover:text-red-300 transition-colors"
      title="Eliminar del carrito"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-quantity", "remove"]);

const itemName = computed(
  () => props.item.name || props.item.nombre || "Sin nombre"
);
const itemPrice = computed(() => props.item.price || props.item.precio || 0);
const subtotal = computed(() => itemPrice.value * props.item.quantity);

const increaseQuantity = () => {
  emit("update-quantity", props.item.quantity + 1);
};

const decreaseQuantity = () => {
  if (props.item.quantity > 1) {
    emit("update-quantity", props.item.quantity - 1);
  }
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/100";
};
</script>
