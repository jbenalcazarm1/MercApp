const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    maxlength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
    maxlength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo'],
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'El precio debe ser un número positivo'
    }
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es obligatoria']
  },
  image: {
    type: String,
    trim: true,
    default: 'https://via.placeholder.com/300x300?text=Producto'
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    min: [0, 'El stock no puede ser negativo'],
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'products'
});

// Índice para búsquedas de texto
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
