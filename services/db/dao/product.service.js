const productModel = require('../models/product.model.js');

class ProductService {
  getProductList = async () => await productModel.find({});
  getProductById = async (id) => await productModel.findById(id);
  getProductByCategory = async (cat) =>
    await productModel.find({ category: cat });
  getProductByName = async (name) =>
    await productModel.find({ title: { $regex: name, $options: 'i' } });
  addProduct = async (body) => {
    return await productModel.create(body);
  };
  deleteProduct = async (id) => {
    return await productModel.deleteOne({ _id: id });
  };
  updateProduct = async (id, newProd) => {
    return await productModel.updateOne({ _id: id }, newProd);
  };
}
module.exports = ProductService;
