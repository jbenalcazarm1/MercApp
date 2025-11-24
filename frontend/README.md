# MercApp - Catálogo de Productos SPA

![MercApp](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)

Aplicación web de una sola página (SPA) para catálogo de productos con carrito de compras, desarrollada con Vue 3 (Composition API) y Tailwind CSS, consumiendo un API REST propio.

## 📋 Información del Estudiante

- **Nombre:** Julián Benalcázar
- **Universidad:** Universidad Politécnica Salesiana
- **Materia:** Aplicaciones Web
- **Actividad:** Actividad 3 - Desarrollo de una aplicación web para el Catálogo de Productos SPA + API propia

## 🚀 Características Implementadas

### Backend API (Actividad 2 + Extensiones)
- ✅ **Modelos de datos:** Product y Category con Mongoose
- ✅ **API REST completa:**
  - `GET /api/products` - Listar productos con filtros opcionales
  - `GET /api/products/:id` - Obtener producto por ID
  - `POST /api/products` - Crear producto
  - `PUT/PATCH /api/products/:id` - Actualizar producto
  - `DELETE /api/products/:id` - Eliminar producto
  - `GET /api/categories` - Listar categorías
- ✅ **Validación de datos** (campos obligatorios, tipos, rangos)
- ✅ **Manejo de errores** (400/404/500)
- ✅ **CORS** habilitado para comunicación con frontend
- ✅ **Seed data** con 12 productos y 5 categorías

### Frontend Vue 3
- ✅ **Routing SPA:**
  - `/` - Home/Catálogo con búsqueda y filtros
  - `/product/:id` - Detalle de producto
  - `/cart` - Carrito de compras (lazy loaded)
  - `/about` - Acerca de (lazy loaded)
  - `404` - Página no encontrada
- ✅ **Componentes reutilizables:**
  - `ProductCard` con props y eventos personalizados
  - `SearchBar` con debounce
  - `CategoryFilter` con estado activo
  - `CartItem` con controles de cantidad
  - `LoadingSpinner` y `ErrorMessage`
- ✅ **Composables:**
  - `useFetch` - Peticiones genéricas con retry y cancelación
  - `useProducts` - Lógica específica de productos
  - `useCart` - Gestión del carrito
- ✅ **State Management:**
  - Pinia store para el carrito
  - Persistencia en localStorage
  - Computed properties para totales
- ✅ **Características avanzadas:**
  - Lazy loading de vistas con `<Suspense>`
  - Estados de carga, error y vacío
  - Reactividad con propiedades computadas
  - Validación de formularios
  - Animaciones y transiciones suaves
  - Diseño responsive mobile-first

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue 3** (Composition API, SFC)
- **Vue Router 4** (Lazy loading, guards)
- **Pinia** (State management)
- **Tailwind CSS** (Utility-first styling)
- **Axios** (HTTP client)
- **Vite** (Build tool)

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **Express Validator**
- **Multer** (File uploads)
- **Socket.io** (Real-time chat)

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js 18+ y npm
- MongoDB instalado y corriendo

### Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env con:
# MONGO_URI=mongodb://localhost:27017/mercapp
# SESSION_SECRET=tu_secreto_aqui
# PORT=3000

# Poblar la base de datos con datos de prueba
node seedData.js

# Iniciar el servidor
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Frontend

```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
Actividad2_Benalcazar_Julian/
├── backend/
│   ├── controllers/
│   │   ├── apiProductController.js
│   │   └── categoryController.js
│   ├── models/
│   │   ├── Products.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── apiProductRoutes.js
│   │   └── categoryRoutes.js
│   ├── app.js
│   └── seedData.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductCard.vue
    │   │   ├── CartItem.vue
    │   │   ├── SearchBar.vue
    │   │   ├── CategoryFilter.vue
    │   │   ├── LoadingSpinner.vue
    │   │   └── ErrorMessage.vue
    │   ├── composables/
    │   │   ├── useFetch.js
    │   │   ├── useProducts.js
    │   │   └── useCart.js
    │   ├── views/
    │   │   ├── HomeView.vue
    │   │   ├── ProductDetailView.vue
    │   │   ├── CartView.vue
    │   │   ├── AboutView.vue
    │   │   └── NotFoundView.vue
    │   ├── router/
    │   │   └── index.js
    │   ├── stores/
    │   │   └── cart.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.vue
    │   └── main.js
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## 🎨 Diseño y UX

- **Tema oscuro** con efectos glassmorphism
- **Paleta de colores** vibrante (azul primary, magenta accent)
- **Tipografía** Inter de Google Fonts
- **Animaciones** suaves con Tailwind
- **Responsive** mobile-first
- **Micro-interacciones** en hover y click

## 🔌 API Endpoints

### Productos
- `GET /api/products?search=query&category=id` - Listar con filtros
- `GET /api/products/:id` - Obtener uno
- `POST /api/products` - Crear
- `PUT /api/products/:id` - Actualizar
- `DELETE /api/products/:id` - Eliminar

### Categorías
- `GET /api/categories` - Listar todas

## ✅ Funcionalidades Verificadas

- [x] Búsqueda de productos por nombre/descripción
- [x] Filtrado por categoría
- [x] Vista detallada de productos
- [x] Añadir/quitar productos del carrito
- [x] Actualizar cantidades en el carrito
- [x] Persistencia del carrito en localStorage
- [x] Lazy loading de vistas Cart y About
- [x] Manejo de estados de carga y error
- [x] Retry automático en peticiones fallidas
- [x] Navegación con Vue Router
- [x] Diseño responsive
- [x] Animaciones y transiciones

## 📝 Notas de Desarrollo

- El proyecto utiliza **Composition API** de Vue 3 para mejor organización del código
- **Pinia** se usa para el state management global del carrito
- **Tailwind CSS** proporciona un sistema de diseño consistente
- El **API proxy** en Vite evita problemas de CORS en desarrollo
- **Suspense** se usa para lazy loading con fallback de carga

## 🤝 Contribución

Este es un proyecto académico desarrollado como parte de la materia Aplicaciones Web de la Universidad Politécnica Salesiana.

## 📄 Licencia

Este proyecto es de uso académico.

---

**Desarrollado con ❤️ por Julián Benalcázar (JulianDev) - 2025** 
