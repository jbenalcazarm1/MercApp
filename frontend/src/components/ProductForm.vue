<template>
  <div class="glass-card p-8 max-w-2xl mx-auto animate-fade-in">
    <h2 class="text-3xl font-bold text-gradient mb-6">
      {{ isEditing ? "Editar Producto" : "Nuevo Producto" }}
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Nombre -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Nombre del Producto *
        </label>
        <input
          v-model="formData.name"
          type="text"
          required
          class="input-field w-full"
          placeholder="Ej: Laptop Gaming Pro"
        />
        <p v-if="errors.name" class="text-red-400 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <!-- Precio -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Precio ($) *
        </label>
        <input
          v-model.number="formData.price"
          type="number"
          step="0.01"
          min="0"
          required
          class="input-field w-full"
          placeholder="0.00"
        />
        <p v-if="errors.price" class="text-red-400 text-sm mt-1">
          {{ errors.price }}
        </p>
      </div>

      <!-- Descripción -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Descripción
        </label>
        <textarea
          v-model="formData.description"
          rows="4"
          class="input-field w-full resize-none"
          placeholder="Descripción detallada del producto..."
        ></textarea>
      </div>

      <!-- Categoría -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Categoría *
        </label>
        <select
          v-model="formData.categoryId"
          required
          class="input-field w-full"
        >
          <option value="">Selecciona una categoría</option>
          <option
            v-for="category in categories"
            :key="category._id"
            :value="category._id"
          >
            {{ category.name }}
          </option>
        </select>
        <p v-if="errors.categoryId" class="text-red-400 text-sm mt-1">
          {{ errors.categoryId }}
        </p>
      </div>

      <!-- Stock -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Stock *
        </label>
        <input
          v-model.number="formData.stock"
          type="number"
          min="0"
          required
          class="input-field w-full"
          placeholder="0"
        />
        <p v-if="errors.stock" class="text-red-400 text-sm mt-1">
          {{ errors.stock }}
        </p>
      </div>

      <!-- URL de Imagen -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          URL de Imagen *
        </label>
        <input
          v-model="formData.imageUrl"
          type="url"
          required
          class="input-field w-full"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        <p v-if="errors.imageUrl" class="text-red-400 text-sm mt-1">
          {{ errors.imageUrl }}
        </p>

        <!-- Preview de imagen -->
        <div v-if="formData.imageUrl" class="mt-3">
          <img
            :src="formData.imageUrl"
            alt="Preview"
            class="w-32 h-32 object-cover rounded-lg border border-white/10"
            @error="handleImageError"
          />
        </div>
      </div>

      <!-- Botones -->
      <div class="flex gap-4 pt-4">
        <button type="submit" :disabled="loading" class="btn-primary flex-1">
          <span v-if="!loading"
            >{{ isEditing ? "Actualizar" : "Crear" }} Producto</span
          >
          <span v-else>Guardando...</span>
        </button>

        <button
          type="button"
          @click="$emit('cancel')"
          class="btn-outline flex-1"
        >
          Cancelar
        </button>
      </div>

      <!-- Error general -->
      <div
        v-if="submitError"
        class="glass-card p-4 bg-red-500/10 border-red-500/30"
      >
        <p class="text-red-400 text-sm">{{ submitError }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProducts } from "@/composables/useProducts";

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["success", "cancel"]);

const {
  createProduct,
  updateProduct,
  fetchCategories,
  categories,
  loading,
  error,
} = useProducts();

const formData = ref({
  name: "",
  price: 0,
  description: "",
  categoryId: "",
  stock: 0,
  imageUrl: "",
});

const errors = ref({});
const submitError = ref("");

const isEditing = computed(() => !!props.product);

// Cargar datos del producto si estamos editando
if (props.product) {
  formData.value = {
    name: props.product.name || props.product.nombre || "",
    price: props.product.price || props.product.precio || 0,
    description: props.product.description || props.product.descripcion || "",
    categoryId: props.product.categoryId?._id || props.product.categoryId || "",
    stock: props.product.stock || 0,
    imageUrl: props.product.imageUrl || props.product.imagen || "",
  };
}

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.name || formData.value.name.trim().length < 3) {
    errors.value.name = "El nombre debe tener al menos 3 caracteres";
    isValid = false;
  }

  if (formData.value.price <= 0) {
    errors.value.price = "El precio debe ser mayor a 0";
    isValid = false;
  }

  if (!formData.value.categoryId) {
    errors.value.categoryId = "Debes seleccionar una categoría";
    isValid = false;
  }

  if (formData.value.stock < 0) {
    errors.value.stock = "El stock no puede ser negativo";
    isValid = false;
  }

  if (!formData.value.imageUrl || !isValidUrl(formData.value.imageUrl)) {
    errors.value.imageUrl = "Debes proporcionar una URL válida";
    isValid = false;
  }

  return isValid;
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const handleSubmit = async () => {
  submitError.value = "";

  if (!validateForm()) {
    return;
  }

  try {
    if (isEditing.value) {
      await updateProduct(props.product._id, formData.value);
    } else {
      await createProduct(formData.value);
    }

    emit("success");
  } catch (err) {
    submitError.value =
      err.response?.data?.error || "Error al guardar el producto";
  }
};

const handleImageError = (event) => {
  event.target.src = "https://via.placeholder.com/128?text=Error";
};

onMounted(() => {
  fetchCategories();
});
</script>
