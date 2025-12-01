const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById
} = require('../controllers/categoryController');

// Rutas
router.get('/', getCategories);
router.get('/:id', getCategoryById);

module.exports = router;
