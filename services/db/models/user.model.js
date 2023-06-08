const mongoose = require('mongoose');

const userCollection = 'users';

const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};
const stringTypeSchemaRequired = {
  type: String,
  unique: true,
  required: true,
};
const numberTypeSchemaRequired = {
  type: String,
  unique: true,
  required: true,
};

const userSchema = new mongoose.Schema({
  first_name: stringTypeSchemaRequired,
  last_name: stringTypeSchemaRequired,
  email: stringTypeSchemaUniqueRequired,
  password: stringTypeSchemaRequired,
  telephone: numberTypeSchemaRequired,
  localidad: stringTypeSchemaRequired,
  codigo_postal: numberTypeSchemaRequired,
  role: { type: String, default: 'user', enum: ['admin', 'user'] },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    default: [],
  },
});
// userSchema.pre("findOne", function () {
//   this.populate("cart.cartId");
// });
const userModel = mongoose.model(userCollection, userSchema);
module.exports = userModel;
