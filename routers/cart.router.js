const { Router } = require('express');
const {
  addProductToCart,
  deleteProduct,
  emptyCart,
  getCart,
  saveCart,
  updateCart,
} = require('../controllers/cart.controller.js');

const router = Router();

router.get('/:cid', getCart);
router.post('/', saveCart);
router.post('/:cid/products/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.delete('/:cid/products/:pid', deleteProduct);
router.delete('/:cid', emptyCart);

module.exports = router;
