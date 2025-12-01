require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Rutas
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Configuración
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mercapp';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // En desarrollo, permitir localhost
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En producción, permitir solo el frontend configurado
    const allowedOrigins = [FRONTEND_URL];
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Endpoint de salud
app.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
    
    res.status(200).json({
      status: 'OK',
      database: dbStatus,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      database: 'error',
      message: error.message
    });
  }
});

// Rutas de API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'API de MercApp',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      products: '/api/products',
      categories: '/api/categories'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Conexión a MongoDB y arranque del servidor
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✓ Conectado a MongoDB');
    console.log(`  Base de datos: ${mongoose.connection.name}`);
    
    app.listen(PORT, () => {
      console.log(`✓ Servidor corriendo en puerto ${PORT}`);
      console.log(`  Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`  CORS configurado para: ${FRONTEND_URL}`);
      console.log(`\n  Endpoints disponibles:`);
      console.log(`  - Health check: http://localhost:${PORT}/health`);
      console.log(`  - Productos: http://localhost:${PORT}/api/products`);
      console.log(`  - Categorías: http://localhost:${PORT}/api/categories`);
    });
  })
  .catch((error) => {
    console.error('✗ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  });

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  console.log('\n⚠ Cerrando servidor...');
  await mongoose.connection.close();
  console.log('✓ Desconectado de MongoDB');
  process.exit(0);
});

module.exports = app;
