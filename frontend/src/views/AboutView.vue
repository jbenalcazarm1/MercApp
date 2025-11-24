<template>
  <div class="animate-fade-in max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h1 class="text-5xl font-bold text-gradient mb-4">Acerca de MercApp</h1>
      <p class="text-gray-400 text-lg">Tu tienda en línea de confianza</p>
    </div>

    <!-- About Content -->
    <div class="space-y-8">
      <!-- Project Info -->
      <div class="glass-card p-8">
        <h2
          class="text-2xl font-semibold text-white mb-4 flex items-center gap-3"
        >
          <span class="text-3xl">🚀</span>
          Sobre el Proyecto
        </h2>
        <p class="text-gray-300 leading-relaxed mb-4">
          MercApp es una aplicación web de una sola página (SPA) desarrollada
          con Vue 3 y Tailwind CSS, diseñada para ofrecer una experiencia de
          compra moderna y fluida. El proyecto demuestra el uso de tecnologías
          web modernas y mejores prácticas de desarrollo.
        </p>
        <p class="text-gray-300 leading-relaxed">
          Esta aplicación consume un API REST propio desarrollado con Node.js y
          Express, proporcionando funcionalidades completas de gestión de
          productos, categorías y carrito de compras.
        </p>
      </div>

      <!-- Student Info -->
      <div class="glass-card p-8">
        <h2
          class="text-2xl font-semibold text-white mb-4 flex items-center gap-3"
        >
          <span class="text-3xl">👨‍🎓</span>
          Información del Estudiante
        </h2>
        <div class="space-y-2 text-gray-300">
          <p><strong class="text-white">Nombre:</strong> Julián Benalcázar</p>
          <p>
            <strong class="text-white">Universidad:</strong> Universidad
            Politécnica Salesiana
          </p>
          <p><strong class="text-white">Materia:</strong> Aplicaciones Web</p>
          <p>
            <strong class="text-white">Actividad:</strong> Desarrollo de una
            aplicación web para el Catálogo de Productos SPA + API propia
          </p>
        </div>
      </div>

      <!-- Technologies -->
      <div class="glass-card p-8">
        <h2
          class="text-2xl font-semibold text-white mb-6 flex items-center gap-3"
        >
          <span class="text-3xl">🛠️</span>
          Tecnologías Utilizadas
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Frontend -->
          <div>
            <h3 class="text-lg font-semibold text-primary-400 mb-3">
              Frontend
            </h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Vue 3 (Composition API)
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Vue Router 4
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Pinia (State Management)
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Tailwind CSS
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Vite
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Axios
              </li>
            </ul>
          </div>

          <!-- Backend -->
          <div>
            <h3 class="text-lg font-semibold text-accent-400 mb-3">Backend</h3>
            <ul class="space-y-2 text-gray-300">
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Node.js
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Express.js
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                MongoDB
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                Mongoose
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-400">✓</span>
                REST API
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="glass-card p-8">
        <h2
          class="text-2xl font-semibold text-white mb-6 flex items-center gap-3"
        >
          <span class="text-3xl">✨</span>
          Características Implementadas
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300"
              >Catálogo de productos con búsqueda y filtros</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300">Vista detallada de productos</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300"
              >Carrito de compras con persistencia</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300">Lazy loading de vistas</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300">Componentes reutilizables</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300"
              >Manejo de estados de carga y errores</span
            >
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300">Diseño responsive y moderno</span>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-primary-400 text-xl">•</span>
            <span class="text-gray-300">Animaciones y transiciones suaves</span>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="glass-card p-8 text-center">
        <h2 class="text-2xl font-semibold text-white mb-4">
          ¿Listo para explorar?
        </h2>
        <p class="text-gray-400 mb-6">
          Descubre nuestra selección de productos premium
        </p>
        <router-link to="/" class="btn-primary"> Ver catálogo </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component
</script>
