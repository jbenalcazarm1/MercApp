<template>
  <div class="animate-fade-in">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-4xl font-bold text-gradient mb-2">
          Administrar Productos
        </h1>
        <p class="text-gray-400">
          Crea, edita y elimina productos del catálogo
        </p>
      </div>

      <button @click="showCreateForm = true" class="btn-primary">
        <span class="text-xl mr-2">+</span>
        Nuevo Producto
      </button>
    </div>

    <!-- Modal de Formulario -->
    <div
      v-if="showCreateForm || editingProduct"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeForm"
    >
      <div class="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ProductForm
          :product="editingProduct"
          @success="handleFormSuccess"
          @cancel="closeForm"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-20">
      <LoadingSpinner />
    </div>

    <!-- Error State -->
    <ErrorMessage v-else-if="error" :message="error" @retry="loadProducts" />

    <!-- Products Table -->
    <div v-else class="glass-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-white/5 border-b border-white/10">
            <tr>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Imagen
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Producto
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Categoría
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Precio
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Stock
              </th>
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-300"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/10">
            <tr
              v-for="product in products"
              :key="product._id"
              class="hover:bg-white/5 transition-colors"
            >
              <td class="px-6 py-4">
                <img
                  :src="product.imageUrl || product.imagen"
                  :alt="product.name || product.nombre"
                  class="w-16 h-16 object-cover rounded-lg"
                  @error="handleImageError"
                />
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold text-white">
                  {{ product.name || product.nombre }}
                </div>
                <div class="text-sm text-gray-400 line-clamp-1">
                  {{ product.description || product.descripcion }}
                </div>
              </td>
              <td class="px-6 py-4 text-gray-300">
                {{ product.categoryId?.name || "Sin categoría" }}
              </td>
              <td class="px-6 py-4">
                <span class="text-primary-400 font-semibold">
                  ${{ (product.price || product.precio || 0).toFixed(2) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'badge',
                    product.stock > 10
                      ? 'badge-success'
                      : product.stock > 0
                      ? 'badge-warning'
                      : 'badge-danger',
                  ]"
                >
                  {{ product.stock }} unidades
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex gap-2">
                  <button
                    @click="handleEdit(product)"
                    class="p-2 rounded-lg bg-primary-500/20 text-primary-400 hover:bg-primary-500/30 transition-colors"
                    title="Editar"
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    @click="handleDelete(product)"
                    class="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    title="Eliminar"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="products.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📦</div>
          <h3 class="text-xl font-semibold text-white mb-2">
            No hay productos
          </h3>
          <p class="text-gray-400 mb-6">Comienza creando tu primer producto</p>
          <button @click="showCreateForm = true" class="btn-primary">
            Crear Producto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useProducts } from "@/composables/useProducts";
import ProductForm from "@/components/ProductForm.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ErrorMessage from "@/components/ErrorMessage.vue";

const { products, loading, error, fetchProducts, deleteProduct } =
  useProducts();
const toast = useToast();

const showCreateForm = ref(false);
const editingProduct = ref(null);

const loadProducts = async () => {
  await fetchProducts();
};

const handleEdit = (product) => {
  editingProduct.value = product;
};

const handleDelete = async (product) => {
  const productName = product.name || product.nombre;

  if (!confirm(`¿Estás seguro de eliminar "${productName}"?`)) {
    return;
  }

  try {
    await deleteProduct(product._id);
    await loadProducts();

    toast.success("Producto eliminado exitosamente", {
      icon: "🗑️",
    });
  } catch (err) {
    toast.error("Error al eliminar el producto");
  }
};

const handleFormSuccess = async () => {
  closeForm();
  await loadProducts();

  const message = editingProduct.value
    ? "Producto actualizado exitosamente"
    : "Producto creado exitosamente";

  toast.success(message, {
    icon: editingProduct.value ? "✏️" : "✨",
  });
};

const closeForm = () => {
  showCreateForm.value = false;
  editingProduct.value = null;
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/64?text=No+Image";
};

onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
