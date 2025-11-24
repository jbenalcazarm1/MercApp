<template>
  <div class="animate-fade-in">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gradient mb-4">
        Catálogo de Productos
      </h1>
      <p class="text-gray-400 text-lg">
        Descubre nuestra selección de productos premium
      </p>
    </div>

    <!-- Search and Filters -->
    <div class="glass-card p-6 mb-8 space-y-4">
      <SearchBar v-model="searchQuery" />

      <div v-if="categories.length > 0">
        <h3 class="text-sm font-semibold text-gray-400 mb-3">CATEGORÍAS</h3>
        <CategoryFilter v-model="selectedCategory" :categories="categories" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <LoadingSpinner />
    </div>

    <!-- Error State -->
    <ErrorMessage v-else-if="error" :message="error" @retry="loadData" />

    <!-- Products Grid -->
    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
        @added-to-cart="handleAddToCart"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="glass-card p-12 text-center">
      <div class="text-6xl mb-4">🔍</div>
      <h3 class="text-2xl font-semibold text-white mb-2">
        No se encontraron productos
      </h3>
      <p class="text-gray-400 mb-6">Intenta ajustar los filtros de búsqueda</p>
      <button @click="clearFilters" class="btn-primary">Limpiar filtros</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useProducts } from "@/composables/useProducts";
import { useCart } from "@/composables/useCart";
import ProductCard from "@/components/ProductCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const { products, categories, loading, error, fetchProducts, fetchCategories } =
  useProducts();
const { addToCart } = useCart();
const toast = useToast();

const searchQuery = ref("");
const selectedCategory = ref("all");

// Computed property for filtered products
const filteredProducts = computed(() => {
  let filtered = products.value;

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((product) => {
      const name = (product.name || product.nombre || "").toLowerCase();
      const description = (
        product.description ||
        product.descripcion ||
        ""
      ).toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }

  // Filter by category
  if (selectedCategory.value && selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (product) =>
        product.categoryId?._id === selectedCategory.value ||
        product.categoryId === selectedCategory.value
    );
  }

  return filtered;
});

const loadData = async () => {
  try {
    await Promise.all([fetchProducts(), fetchCategories()]);
  } catch (err) {
    console.error("Error loading data:", err);
  }
};

const handleAddToCart = (product) => {
  addToCart(product, 1);

  const productName = product.name || product.nombre || "Producto";
  toast.success(`${productName} añadido al carrito`, {
    icon: "🛒",
  });
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
};

onMounted(() => {
  loadData();
});
</script>

<style scoped></style>
