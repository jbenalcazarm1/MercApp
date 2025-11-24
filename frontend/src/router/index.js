// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Eager loaded views
import HomeView from "@/views/HomeView.vue";
import ProductDetailView from "@/views/ProductDetailView.vue";

// Lazy loaded views (for Suspense demonstration)
const CartView = () => import("@/views/CartView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const AdminView = () => import("@/views/AdminView.vue");
const NotFoundView = () => import("@/views/NotFoundView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "MercApp - Catálogo de Productos",
      },
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetailView,
      meta: {
        title: "Detalle del Producto - MercApp",
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: {
        title: "Carrito de Compras - MercApp",
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminView,
      meta: {
        title: "Administrar Productos - MercApp",
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        title: "Acerca de - MercApp",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
      meta: {
        title: "404 - Página no encontrada",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guard to update page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "MercApp";
  next();
});

export default router;
