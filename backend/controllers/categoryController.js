const Category = require('../models/Category');

/**
 * Obtener todas las categorías
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las categorías',
      error: error.message
    });
  }
};

/**
 * Obtener categoría por ID
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error al obtener categoría:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la categoría',
      error: error.message
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById
};
