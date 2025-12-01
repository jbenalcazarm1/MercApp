# MercApp - Catálogo de Productos SPA

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

Aplicación web de una sola página (SPA) para catálogo de productos con carrito de compras, desarrollada con Vue 3 y conectada a una API REST con Node.js, Express y MongoDB.

## 📋 Información del Estudiante

- **Nombre:** Julián Benalcázar
- **Universidad:** Universidad Politécnica Salesiana
- **Materia:** Aplicaciones Web
- **Actividad:** Unidad 4 - Despliegue y Publicación de Aplicaciones

## 🚀 Aplicación Desplegada

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🌐 **Frontend** | [Netlify](https://mercapp-ups.netlify.app) *(actualizar después del despliegue)* | Aplicación Vue 3 en producción |
| ⚡ **Backend API** | [Railway](https://mercapp-api.up.railway.app) *(actualizar después del despliegue)* | API REST Node.js/Express |
| 📚 **Documentación** | [GitHub Pages](https://jbenalcazarm1.github.io/MercApp) | Micrositio del proyecto |
| 📦 **Repositorio** | [GitHub](https://github.com/jbenalcazarm1/MercApp) | Código fuente completo |

## ✨ Características Implementadas

### Frontend (Vue 3 + Vite)
- ✅ **SPA con Vue Router** - Navegación fluida sin recargas
- ✅ **Búsqueda y filtros** - Buscar productos por nombre/descripción y filtrar por categoría
- ✅ **Catálogo de productos** - Vista de grid responsive con tarjetas de productos
- ✅ **Detalle de producto** - Vista individual con información completa
- ✅ **Carrito de compras** - Agregar, quitar, actualizar cantidades
- ✅ **Persistencia local** - Carrito guardado en localStorage
- ✅ **State management** - Pinia para gestión de estado global
- ✅ **Lazy loading** - Vistas cargadas bajo demanda
- ✅ **Diseño responsive** - Optimizado para mobile, tablet y desktop
- ✅ **Animaciones** - Transiciones suaves con Tailwind CSS

### Backend (Node.js + Express + MongoDB)
- ✅ **API REST completa** - CRUD de productos y categorías
- ✅ **Mongoose ODM** - Modelos con validaciones
- ✅ **Búsqueda y filtros** - Query parameters para filtrar resultados
- ✅ **Validación de datos** - Express Validator
- ✅ **Manejo de errores** - Respuestas estandarizadas con códigos HTTP apropiados
- ✅ **CORS configurado** - Seguridad para peticiones cross-origin
- ✅ **Health endpoint** - Monitoreo del estado del servidor y BD
- ✅ **Variables de entorno** - Configuración segura con dotenv
- ✅ **Seed data** - Script para poblar la base de datos

### Despliegue
- ✅ **MongoDB Atlas** - Base de datos en la nube (cluster M0 gratuito)
- ✅ **Railway** - Backend desplegado con CI/CD automático
- ✅ **Netlify** - Frontend desplegado con HTTPS y CDN
- ✅ **GitHub Pages** - Micrositio de documentación

## 🛠️ Stack Tecnológico

### Frontend
- Vue 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Tailwind CSS
- Axios (HTTP Client)
- Vite (Build Tool)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Express Validator
- CORS
- dotenv

### Infraestructura
- MongoDB Atlas (Database)
- Railway (Backend Hosting)
- Netlify (Frontend Hosting)
- GitHub Pages (Documentation)

## 📦 Instalación y Uso Local

### Prerrequisitos
- Node.js 18+ y npm
- MongoDB (local) o cuenta en MongoDB Atlas
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/jbenalcazarm1/MercApp.git
cd MercApp
```

### 2. Configurar el Backend

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y configurar MONGO_URI con tu base de datos

# Poblar la base de datos con datos de prueba
npm run seed

# Iniciar servidor en modo desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:8000`

**Endpoints disponibles:**
- Health check: `http://localhost:8000/health`
- Productos: `http://localhost:8000/api/products`
- Categorías: `http://localhost:8000/api/categories`

### 3. Configurar el Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional en desarrollo)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Build de Producción

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Productos

| Método | Endpoint | Descripción | Params |
|--------|----------|-------------|--------|
| GET | `/api/products` | Listar todos los productos | `?search=texto&category=id` |
| GET | `/api/products/:id` | Obtener producto por ID | - |
| POST | `/api/products` | Crear nuevo producto | Body: JSON |
| PUT | `/api/products/:id` | Actualizar producto | Body: JSON |
| DELETE | `/api/products/:id` | Eliminar producto | - |

### Categorías

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categories` | Listar todas las categorías |
| GET | `/api/categories/:id` | Obtener categoría por ID |

### Sistema

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verificar estado del servidor y BD |

**Ejemplo de respuesta (GET /api/products):**

```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "_id": "...",
      "name": "Laptop Dell XPS 13",
      "description": "Laptop ultradelgada con procesador Intel Core i7...",
      "price": 1299.99,
      "stock": 15,
      "featured": true,
      "image": "https://...",
      "category": {
        "_id": "...",
        "name": "Electrónica",
        "icon": "💻"
      },
      "createdAt": "2025-01-15T...",
      "updatedAt": "2025-01-15T..."
    }
  ]
}
```

## 🌍 Variables de Entorno

### Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/mercapp  # o mongodb+srv://... para Atlas
PORT=8000
FRONTEND_URL=http://localhost:5173  # En producción: URL de Netlify
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000  # En producción: URL de Railway
```

## 📁 Estructura del Proyecto

```
MercApp/
├── backend/
│   ├── controllers/
│   │   ├── productController.js
│   │   └── categoryController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   └── categoryRoutes.js
│   ├── app.js
│   ├── seedData.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── views/
│   │   ├── router/
│   │   ├── stores/
│   │   ├── services/
│   │   ├── App.vue
│   │   └── main.js
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── netlify.toml
│   ├── .env.example
│   └── .gitignore
├── docs/
│   ├── index.html
│   └── styles.css
├── README.md
├── readme.txt
└── .gitignore
```

## 🎨 Capturas de Pantalla

*(Agregar capturas después del despliegue)*

## 📝 Notas de Desarrollo

- El proyecto utiliza **Composition API** de Vue 3 para mejor organización del código
- **Pinia** maneja el estado global del carrito de compras
- **Tailwind CSS** proporciona un sistema de diseño consistente y responsivo
- El **proxy de Vite** evita problemas de CORS en desarrollo local
- **CORS** está configurado en el backend para permitir solo orígenes autorizados
- **MongoDB Atlas** ofrece 512MB de almacenamiento gratuito (cluster M0)
- **Railway** y **Netlify** ofrecen planes gratuitos suficientes para este proyecto

## 🚀 Despliegue

### MongoDB Atlas
1. Crear cuenta y organización
2. Crear cluster M0 (gratuito)
3. Configurar usuario de base de datos
4. Configurar IP allowlist (0.0.0.0/0 para Railway)
5. Obtener cadena de conexión

### Railway (Backend)
1. Conectar repositorio de GitHub
2. Configurar variables de entorno:
   - `MONGO_URI`: cadena de conexión de Atlas
   - `FRONTEND_URL`: URL de Netlify
3. Deploy automático

### Netlify (Frontend)
1. Conectar repositorio de GitHub
2. Configurar build:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
3. Configurar variable de entorno:
   - `VITE_API_URL`: URL de Railway
4. Deploy automático

### GitHub Pages (Documentación)
1. Ir a Settings → Pages
2. Source: main branch, /docs folder
3. Save

## 📄 Licencia

Este proyecto es de uso académico para la materia de Aplicaciones Web de la Universidad Politécnica Salesiana.

---

**Desarrollado con ❤️ por Julián Benalcázar - 2025**
