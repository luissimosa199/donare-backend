const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const productsCollection = 'products';

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};
const stringTypeSchemaNonUniqueRequired = {
  type: String,
  required: true,
};
const arrayTypeSchemaNonUniqueRequired = {
  type: Array,
  required: true,
};
const productSchema = new mongoose.Schema({
  title: stringTypeSchemaNonUniqueRequired,
  description: stringTypeSchemaNonUniqueRequired,
  thumbnail: String,
  code: stringTypeSchemaUniqueRequired,
  category: stringTypeSchemaNonUniqueRequired,
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'reserved', 'complete'],
  },
});

// productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollection, productSchema);
module.exports = productModel;
