const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const initializePassport = require('./config/passport.config.js');
const cartRouter = require('./routers/cart.router.js');
const productRouter = require('./routers/products.router.js');
const userRouter = require('./routers/users.router.js');

// yarn add cors => importar el modulo cors
const cors = require('cors');

const app = express();

// se pasa cors como middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(truedirname + '/public'));
app.use(cookieParser('blablabla'));

initializePassport();
app.use(passport.initialize());
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', userRouter);

const SERVER_PORT = 3030;
app.listen(SERVER_PORT, () => {
  console.log(`server ${SERVER_PORT}`);
});

const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://renzonlacovara:Cofi2022@nocountry.xht26b6.mongodb.net/NoCountry?retryWrites=true&w=majority'
    );
    console.log('Conectado con exito a MongoDB usando Moongose.');
  } catch (error) {
    console.error('No se pudo conectar a la BD usando Moongose: ' + error);
    process.exit();
  }
};
connectMongoDB();
