const ProductService = require('../services/db/dao/product.service.js');
const productService = new ProductService();

const getProducts = async (req, res) => {
  let result = await productService.getProductList();
  console.log(result);
  try {
    res.send({ status: 'success', message: result });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error getting products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.pid;
    let filterProd = await productService.getProductById(productId);
    if (filterProd) {
      res.send({ status: 'success', message: filterProd });
    } else {
      res.send({ status: 'error', message: 'Invalid product id' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error, message: 'error getting product by id' });
  }
};
const getProductByCat = async (req, res) => {
  try {
    const productCat = req.params.cat;
    let filterProd = await productService.getProductByCat(productCat);
    if (filterProd) {
      res.send({ status: 'success', message: filterProd });
    } else {
      res.send({ status: 'error', message: 'Invalid product id' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error, message: 'error getting product by id' });
  }
};
const getProductByName = async (req, res) => {
  try {
    const productName = req.params.query;

    let filterProd = await productService.getProductByName(productName);

    if (filterProd) {
      res.send({ status: 'success', message: filterProd });
    } else {
      res.send({ status: 'error', message: 'Invalid product id' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: error, message: 'error getting product by id' });
  }
};

const saveProduct = async (req, res) => {
  let data = req.body;
  try {
    let newProd = await productService.addProduct(data);
    res.send({ status: 'success', message: newProd });
  } catch (error) {
    res.status(500).send({ error: error, message: 'error creating product' });
  }
};
const updateProduct = async (req, res) => {
  try {
    const prodId = req.params.pid;
    const newProd = req.body;
    await productService.updateProduct(prodId, newProd);
    res.send({
      status: 'success',
      message: `product with id: ${prodId} updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error, message: 'Error updating product.' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.pid;
    let prodDeleted = await productService.deleteProduct(productId);
    res.status(201).send(prodDeleted);
  } catch (error) {
    res.status(500).send({ error: error, message: 'Error deleting product.' });
  }
};
module.exports = {
  getProducts,
  getProductById,
  getProductByCat,
  saveProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};
