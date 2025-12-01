const Product = require('../models/Product');
const { validationResult } = require('express-validator');

/**
 * Obtener todos los productos con filtros opcionales
 */
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    
    // Filtro por búsqueda de texto
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filtro por categoría
    if (category) {
      query.category = category;
    }
    
    const products = await Product.find(query)
      .populate('category', 'name icon')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener los productos',
      error: error.message
    });
  }
};

/**
 * Obtener producto por ID
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name icon description');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    
    // Error de ID inválido
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al obtener el producto',
      error: error.message
    });
  }
};

/**
 * Crear nuevo producto
 */
const createProduct = async (req, res) => {
  try {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array()
      });
    }
    
    const product = await Product.create(req.body);
    const populatedProduct = await Product.findById(product._id)
      .populate('category', 'name icon');
    
    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: populatedProduct
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    
    // Error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al crear el producto',
      error: error.message
    });
  }
};

/**
 * Actualizar producto
 */
const updateProduct = async (req, res) => {
  try {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Errores de validación',
        errors: errors.array()
      });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate('category', 'name icon');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    
    // Error de ID inválido
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido'
      });
    }
    
    // Error de validación
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al actualizar el producto',
      error: error.message
    });
  }
};

/**
 * Eliminar producto
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Producto eliminado exitosamente',
      data: product
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    
    // Error de ID inválido
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'ID de producto inválido'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
