<template>
  <div
    class="glass-card-hover overflow-hidden group cursor-pointer"
    @click="navigateToDetail"
  >
    <!-- Product Image -->
    <div class="relative h-64 overflow-hidden bg-dark-800">
      <img
        :src="
          product.imageUrl ||
          product.imagen ||
          'https://via.placeholder.com/400x300?text=No+Image'
        "
        :alt="productName"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="handleImageError"
      />

      <!-- Stock Badge -->
      <div class="absolute top-3 right-3">
        <span v-if="product.stock > 0" class="badge-success">
          {{ product.stock }} en stock
        </span>
        <span v-else class="badge-danger"> Agotado </span>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-5">
      <h3
        class="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors"
      >
        {{ productName }}
      </h3>

      <p class="text-gray-400 text-sm mb-4 line-clamp-2">
        {{ productDescription }}
      </p>

      <div class="flex items-center justify-between">
        <div class="text-2xl font-bold text-gradient">
          ${{ productPrice.toFixed(2) }}
        </div>

        <button
          @click.stop="handleAddToCart"
          :disabled="product.stock <= 0"
          class="btn-primary text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="product.stock > 0">Añadir</span>
          <span v-else>Agotado</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["added-to-cart"]);

const router = useRouter();

const productName = computed(
  () => props.product.name || props.product.nombre || "Sin nombre"
);
const productDescription = computed(
  () =>
    props.product.description || props.product.descripcion || "Sin descripción"
);
const productPrice = computed(
  () => props.product.price || props.product.precio || 0
);

const navigateToDetail = () => {
  router.push(`/product/${props.product._id}`);
};

const handleAddToCart = () => {
  emit("added-to-cart", props.product);
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/400x300?text=No+Image";
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
