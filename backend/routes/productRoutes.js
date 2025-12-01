const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Validaciones para crear/actualizar productos
const productValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 10, max: 500 }).withMessage('La descripción debe tener entre 10 y 500 caracteres'),
  body('price')
    .notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
  body('category')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isMongoId().withMessage('ID de categoría inválido'),
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo'),
  body('image')
    .optional()
    .trim()
    .isURL().withMessage('La URL de la imagen no es válida'),
  body('featured')
    .optional()
    .isBoolean().withMessage('El campo featured debe ser booleano')
];

// Rutas
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', productValidation, createProduct);
router.put('/:id', productValidation, updateProduct);
router.patch('/:id', productValidation, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
