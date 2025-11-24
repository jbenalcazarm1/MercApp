<template>
  <div class="flex flex-wrap gap-2">
    <button
      @click="selectCategory('all')"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
        modelValue === 'all'
          ? 'bg-primary-500 text-white shadow-glow'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
      ]"
    >
      Todas las categorías
    </button>

    <button
      v-for="category in categories"
      :key="category._id"
      @click="selectCategory(category._id)"
      :class="[
        'px-4 py-2 rounded-lg font-medium transition-all duration-200',
        modelValue === category._id
          ? 'bg-primary-500 text-white shadow-glow'
          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
      ]"
    >
      {{ category.name }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "all",
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectCategory = (categoryId) => {
  emit("update:modelValue", categoryId);
};
</script>
