const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const userRoutes = require(('./routes/user'));

const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(cors())
app.use('/api', userRoutes);


// routes
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API')
})

// Mongodb conection
mongoose.connect(process.env.MONGODB_URI)
    .then( () => console.log('Se ha conectado a la base de datos de usuarios de pokemons'))
    .catch( (error) => console.error(error))

app.listen(port);

console.log(`El servidor esta abierto en la puerta ${port}`);