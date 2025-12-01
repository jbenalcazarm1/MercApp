const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre de la categoría es obligatorio'],
    unique: true,
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    maxlength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'La descripción no puede exceder 200 caracteres']
  },
  icon: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'categories'
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
