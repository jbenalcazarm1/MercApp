<template>
  <div class="animate-fade-in">
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <LoadingSpinner />
    </div>

    <!-- Error State -->
    <ErrorMessage
      v-else-if="error || !product"
      :message="error || 'Producto no encontrado'"
      @retry="loadProduct"
    />

    <!-- Product Detail -->
    <div v-else>
      <!-- Back Button -->
      <button @click="goBack" class="btn-ghost mb-6 flex items-center gap-2">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Volver al catálogo
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Product Image -->
        <div class="glass-card p-6">
          <img
            :src="
              product.imageUrl ||
              product.imagen ||
              'https://via.placeholder.com/600x400'
            "
            :alt="productName"
            class="w-full h-96 object-cover rounded-lg"
            @error="handleImageError"
          />
        </div>

        <!-- Product Info -->
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold text-white mb-2">
              {{ productName }}
            </h1>

            <div
              v-if="product.categoryId"
              class="flex items-center gap-2 text-gray-400 mb-4"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                ></path>
              </svg>
              <span>{{ categoryName }}</span>
            </div>
          </div>

          <div class="glass-card p-6">
            <div class="text-5xl font-bold text-gradient mb-4">
              ${{ productPrice.toFixed(2) }}
            </div>

            <div class="flex items-center gap-3 mb-6">
              <span
                v-if="product.stock > 0"
                class="badge-success text-base px-4 py-2"
              >
                ✓ {{ product.stock }} disponibles
              </span>
              <span v-else class="badge-danger text-base px-4 py-2">
                ✗ Agotado
              </span>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-400 mb-2">
                Cantidad
              </label>
              <div class="flex items-center gap-4">
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  -
                </button>

                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  :max="product.stock"
                  class="input-field w-24 text-center"
                />

                <button
                  @click="increaseQuantity"
                  :disabled="quantity >= product.stock"
                  class="w-12 h-12 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              @click="handleAddToCart"
              :disabled="product.stock <= 0"
              class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="product.stock > 0">Añadir al carrito</span>
              <span v-else>Producto agotado</span>
            </button>
          </div>

          <div class="glass-card p-6">
            <h2 class="text-xl font-semibold text-white mb-3">Descripción</h2>
            <p class="text-gray-300 leading-relaxed">
              {{ productDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useProducts } from "@/composables/useProducts";
import { useCart } from "@/composables/useCart";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { loading, error, fetchProductById } = useProducts();
const { addToCart } = useCart();

const product = ref(null);
const quantity = ref(1);

const productName = computed(
  () => product.value?.name || product.value?.nombre || "Sin nombre"
);
const productDescription = computed(
  () =>
    product.value?.description ||
    product.value?.descripcion ||
    "Sin descripción disponible"
);
const productPrice = computed(
  () => product.value?.price || product.value?.precio || 0
);
const categoryName = computed(
  () => product.value?.categoryId?.name || "Sin categoría"
);

const loadProduct = async () => {
  try {
    const data = await fetchProductById(route.params.id);
    product.value = data;
  } catch (err) {
    console.error("Error loading product:", err);
  }
};

const increaseQuantity = () => {
  if (quantity.value < product.value.stock) {
    quantity.value++;
  }
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const handleAddToCart = () => {
  addToCart(product.value, quantity.value);

  toast.success(`${quantity.value} unidad(es) añadidas al carrito`, {
    icon: "✓",
  });
};

const goBack = () => {
  router.push("/");
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/600x400?text=No+Image";
};

onMounted(() => {
  loadProduct();
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
</style>
