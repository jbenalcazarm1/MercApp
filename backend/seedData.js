require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mercapp';

// Datos de categorías
const categories = [
  {
    name: 'Electrónica',
    description: 'Dispositivos electrónicos y gadgets',
    icon: '💻'
  },
  {
    name: 'Ropa',
    description: 'Prendas de vestir y accesorios',
    icon: '👕'
  },
  {
    name: 'Hogar',
    description: 'Artículos para el hogar y decoración',
    icon: '🏠'
  },
  {
    name: 'Deportes',
    description: 'Equipamiento deportivo y fitness',
    icon: '⚽'
  },
  {
    name: 'Libros',
    description: 'Libros y material educativo',
    icon: '📚'
  }
];

// Datos de productos (serán asociados a categorías después de crearlas)
const productsTemplate = [
  {
    name: 'Laptop Dell XPS 13',
    description: 'Laptop ultradelgada con procesador Intel Core i7, 16GB RAM y 512GB SSD. Perfecta para trabajo y entretenimiento.',
    price: 1299.99,
    stock: 15,
    featured: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300&h=300&fit=crop',
    categoryName: 'Electrónica'
  },
  {
    name: 'iPhone 14 Pro',
    description: 'Smartphone de última generación con cámara de 48MP, chip A16 Bionic y pantalla ProMotion de 6.1 pulgadas.',
    price: 999.99,
    stock: 25,
    featured: true,
    image: 'https://images.unsplash.com/photo-1678685888221-cda269d91b75?w=300&h=300&fit=crop',
    categoryName: 'Electrónica'
  },
  {
    name: 'Auriculares Sony WH-1000XM5',
    description: 'Auriculares inalámbricos con cancelación de ruido líder en la industria y sonido de alta resolución.',
    price: 399.99,
    stock: 30,
    featured: false,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300&h=300&fit=crop',
    categoryName: 'Electrónica'
  },
  {
    name: 'Camiseta Nike Dri-FIT',
    description: 'Camiseta deportiva con tecnología de absorción de humedad. 100% poliéster reciclado.',
    price: 34.99,
    stock: 50,
    featured: false,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    categoryName: 'Ropa'
  },
  {
    name: 'Jeans Levi\'s 501',
    description: 'Jeans clásicos de corte recto, confeccionados en denim 100% algodón. Un ícono atemporal.',
    price: 89.99,
    stock: 40,
    featured: false,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
    categoryName: 'Ropa'
  },
  {
    name: 'Zapatillas Adidas Ultraboost',
    description: 'Zapatillas running con tecnología Boost para máxima amortiguación y retorno de energía.',
    price: 189.99,
    stock: 20,
    featured: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    categoryName: 'Deportes'
  },
  {
    name: 'Lámpara LED Philips Hue',
    description: 'Bombilla LED inteligente con 16 millones de colores y control por app. Compatible con Alexa y Google Home.',
    price: 49.99,
    stock: 35,
    featured: false,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop',
    categoryName: 'Hogar'
  },
  {
    name: 'Sofá Modular IKEA',
    description: 'Sofá de 3 plazas con diseño modular, tapizado en tela gris claro. Incluye cojines decorativos.',
    price: 799.99,
    stock: 8,
    featured: false,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop',
    categoryName: 'Hogar'
  },
  {
    name: 'Balón de Fútbol Adidas',
    description: 'Balón oficial de competición, construcción sin costuras y diseño térmicamente adherido.',
    price: 29.99,
    stock: 45,
    featured: false,
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aac?w=300&h=300&fit=crop',
    categoryName: 'Deportes'
  },
  {
    name: 'Bicicleta de Montaña Trek',
    description: 'Bicicleta MTB con suspensión delantera, 21 velocidades y cuadro de aluminio ligero.',
    price: 549.99,
    stock: 12,
    featured: true,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=300&fit=crop',
    categoryName: 'Deportes'
  },
  {
    name: 'Libro "El Principito"',
    description: 'Edición ilustrada del clásico de Antoine de Saint-Exupéry. Tapa dura, 96 páginas.',
    price: 19.99,
    stock: 60,
    featured: false,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
    categoryName: 'Libros'
  },
  {
    name: 'Cafetera Nespresso',
    description: 'Cafetera de cápsulas con sistema de alta presión. Incluye espumador de leche Aeroccino.',
    price: 199.99,
    stock: 18,
    featured: false,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300&h=300&fit=crop',
    categoryName: 'Hogar'
  },
  {
    name: 'Apple Watch Series 8',
    description: 'Reloj inteligente con monitor de salud avanzado, GPS y resistencia al agua. Tu compañero ideal para el día a día.',
    price: 399.99,
    stock: 22,
    featured: true,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
    categoryName: 'Electrónica'
  },
  {
    name: 'Mat de Yoga Premium',
    description: 'Colchoneta de yoga antideslizante, ecológica y de alta densidad. Incluye correa de transporte.',
    price: 45.99,
    stock: 30,
    featured: false,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop',
    categoryName: 'Deportes'
  },
  {
    name: 'Set de Macetas Cerámica',
    description: 'Juego de 3 macetas de cerámica blanca con diseño minimalista. Perfectas para suculentas y plantas pequeñas.',
    price: 24.99,
    stock: 15,
    featured: false,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop',
    categoryName: 'Hogar'
  }
];

async function seedDatabase() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('✓ Conectado a MongoDB');
    
    // Limpiar base de datos
    console.log('\n🗑️  Limpiando base de datos...');
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('✓ Base de datos limpiada');
    
    // Crear categorías
    console.log('\n📁 Creando categorías...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✓ ${createdCategories.length} categorías creadas`);
    
    // Crear mapa de categorías por nombre
    const categoryMap = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });
    
    // Preparar productos con IDs de categorías
    const products = productsTemplate.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      featured: product.featured,
      image: product.image,
      category: categoryMap[product.categoryName]
    }));
    
    // Crear productos
    console.log('\n📦 Creando productos...');
    const createdProducts = await Product.insertMany(products);
    console.log(`✓ ${createdProducts.length} productos creados`);
    
    // Resumen
    console.log('\n✅ ¡Seed completado exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`   - Categorías: ${createdCategories.length}`);
    console.log(`   - Productos: ${createdProducts.length}`);
    console.log(`   - Productos destacados: ${createdProducts.filter(p => p.featured).length}`);
    
    // Mostrar productos por categoría
    console.log('\n📋 Productos por categoría:');
    for (const category of createdCategories) {
      const count = createdProducts.filter(p => 
        p.category.toString() === category._id.toString()
      ).length;
      console.log(`   ${category.icon} ${category.name}: ${count} productos`);
    }
    
  } catch (error) {
    console.error('\n✗ Error al poblar la base de datos:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✓ Desconectado de MongoDB');
    process.exit(0);
  }
}

// Ejecutar seed
seedDatabase();
