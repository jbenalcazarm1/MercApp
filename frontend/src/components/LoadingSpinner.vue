<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <!-- Outer ring -->
      <div class="w-16 h-16 border-4 border-primary-500/20 rounded-full"></div>

      <!-- Spinning ring -->
      <div
        class="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"
      ></div>

      <!-- Inner glow -->
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-500/20 rounded-full blur-md"
      ></div>
    </div>
  </div>
</template>

<script setup>
// Loading spinner component
</script>
