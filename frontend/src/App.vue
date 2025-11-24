<template>
  <div class="min-h-screen bg-gradient-dark">
    <!-- Navigation -->
    <nav class="glass-card sticky top-0 z-40 border-b border-white/10">
      <div class="container-custom">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center space-x-2">
            <div class="text-3xl">🛒</div>
            <span class="text-2xl font-bold text-gradient">MercApp</span>
          </router-link>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="nav-link"> Catálogo </router-link>
            <router-link to="/admin" class="nav-link"> Admin </router-link>
            <router-link to="/about" class="nav-link"> Acerca de </router-link>
          </div>

          <!-- Right Side: Cart + Mobile Menu Button -->
          <div class="flex items-center gap-4">
            <!-- Cart Button -->
            <router-link
              to="/cart"
              class="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
              <span
                v-if="itemCount > 0"
                class="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ itemCount }}
              </span>
            </router-link>

            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg
                v-if="!mobileMenuOpen"
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              <svg
                v-else
                class="w-6 h-6 text-white"
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
        </div>

        <!-- Mobile Menu -->
        <transition name="slide-down">
          <div
            v-if="mobileMenuOpen"
            class="md:hidden py-4 border-t border-white/10"
          >
            <div class="flex flex-col space-y-2">
              <router-link
                to="/"
                class="nav-link-mobile"
                @click="mobileMenuOpen = false"
              >
                Catálogo
              </router-link>
              <router-link
                to="/admin"
                class="nav-link-mobile"
                @click="mobileMenuOpen = false"
              >
                Admin
              </router-link>
              <router-link
                to="/about"
                class="nav-link-mobile"
                @click="mobileMenuOpen = false"
              >
                Acerca de
              </router-link>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Main Content with Suspense -->
    <main class="container-custom py-8">
      <Suspense>
        <template #default>
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </template>
        <template #fallback>
          <div class="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner />
          </div>
        </template>
      </Suspense>
    </main>

    <!-- Footer -->
    <footer class="glass-card border-t border-white/10 mt-16">
      <div class="container-custom py-8">
        <div class="text-center text-gray-400">
          <p class="text-sm">
            © 2025 MercApp - Desarrollado con
            <span class="text-red-400">❤️</span>
            usando Vue 3 y Tailwind CSS
          </p>
          <p class="text-xs mt-2">
            Actividad 3 - Aplicaciones Web - Universidad Politécnica Salesiana
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCart } from "@/composables/useCart";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { itemCount } = useCart();
const mobileMenuOpen = ref(false);
</script>

<style scoped>
.nav-link {
  @apply text-gray-300 hover:text-white transition-colors font-medium;
}

.nav-link.router-link-active {
  @apply text-white;
}

.nav-link-mobile {
  @apply text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-medium px-4 py-2 rounded-lg;
}

.nav-link-mobile.router-link-active {
  @apply text-white bg-white/10;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
