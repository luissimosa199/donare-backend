const CartService = require('../services/db/dao/cart.service.js');

const cartService = new CartService();

const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    let filterCart = await cartService.getCartAndPop(cid);
    res.send({ status: 'success', message: filterCart });
  } catch (error) {
    console.error('error getting cart');
    res.status(500).send({ error: error, message: 'Invalid cart id' });
  }
};
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let isInCart = await cartService.getProdInCart(pid);
    let cart = await cartService.getCartById(cid);
    if (isInCart.length == 0) {
      cart.products.push({ product: pid, quantity: 1 });
      let result = await cartService.updateCart(cid, cart);
      res.send({ status: 'success', message: result });
    } else {
      let prodQuantity = cart.products.filter(
        (oneProd) => oneProd.product == pid
      );
      let result = await cartService.updateProdQuantity(
        cid,
        pid,
        prodQuantity[0]
      );
      res.send({ status: 'success', message: result });
    }
  } catch (error) {
    res.status(500).send({ error: error, message: 'error adding product' });
  }
};

const updateCart = async (req, res) => {
  try {
    let { newProducts } = req.body;
    let { cid } = req.params;
    let updateCart = await cartService.updateCart(cid, newProducts);
    res.send({ status: 'success', message: updateCart });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error updating cart' });
  }
};

const saveCart = async (req, res) => {
  try {
    let newCart = await cartService.addCart();
    res.send({ status: 'success', message: newCart });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error saving cart' });
  }
};

const emptyCart = async (req, res) => {
  try {
    let { cid } = req.params;
    let result = await cartService.deleteAllProducts({ _id: cid });
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error deleting cart' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    let result = await cartService.deleteProduct(cid, pid);
    res.send({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error deleting product' });
  }
};
module.exports = {
  getCart,
  addProductToCart,
  updateCart,
  saveCart,
  emptyCart,
  deleteProduct,
};
