<template>
  <div class="relative">
    <input
      type="text"
      :value="modelValue"
      @input="handleInput"
      placeholder="Buscar productos..."
      class="input-field w-full pl-12 pr-10"
    />

    <!-- Search Icon -->
    <div
      class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
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
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>

    <!-- Clear Button -->
    <button
      v-if="modelValue"
      @click="clear"
      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
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
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

let debounceTimer = null;

const handleInput = (event) => {
  const value = event.target.value;

  // Debounce the input
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit("update:modelValue", value);
  }, 300);
};

const clear = () => {
  emit("update:modelValue", "");
};
</script>
