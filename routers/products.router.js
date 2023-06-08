const { Router } = require('express');
// const multer = require('multer');
const {
  deleteProduct,
  getProductById,
  getProducts,
  saveProduct,
  updateProduct,
  getProductByCat,
  getProductByName,
} = require('../controllers/products.controller.js');
// const productModel = require('../services/db/models/product.model.js');

const router = Router();
// const upload = multer({ dest: '../uploads/' });

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.get('/:cat', getProductByCat);
router.get('/search/:query', getProductByName);
// router.post('/add', upload.single('photo'), async (req, res) => {
//   try {
//     const { title, description, code, category } = req.body;
//     const photoPath = req.file.path;
//     const newProduct = new productModel({
//       title,
//       description,
//       thumbnail: photoPath,
//       code,
//       category,
//       status: 'pending',
//     });
//     await newProduct.save();
//     res.status(201).json({ message: 'Producto creado exitosamente' });
//   } catch (error) {
//     console.error('Error al crear el producto:', error);
//     res.status(500).json({ error: 'Error al crear el producto' });
//   }
// });
router.post('/add', saveProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

module.exports = router;
