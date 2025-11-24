<template>
  <div class="glass-card p-6 text-center animate-fade-in">
    <div class="text-red-400 text-5xl mb-4">⚠️</div>
    <h3 class="text-xl font-semibold text-white mb-2">Error</h3>
    <p class="text-gray-400 mb-4">{{ message }}</p>
    <button v-if="showRetry" @click="$emit('retry')" class="btn-primary">
      Reintentar
    </button>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: "Ha ocurrido un error. Por favor, intenta de nuevo.",
  },
  showRetry: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["retry"]);
</script>
