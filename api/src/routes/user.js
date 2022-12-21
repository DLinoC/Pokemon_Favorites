const express = require("express");
const userSchema = require('../models/user');
const router = express.Router();

// create user
router.post('/usuarios', (req, res) => {
    const user = userSchema(req.body);
    user.save()
        .then((data) => res.json(data))
        .catch( (e) => res.json({message: e}))
})


// get user all
router.get('/usuarios', (req, res) => {
    userSchema.find()
        .then((data) => res.json(data))
        .catch( (e) => res.json({message: e}))
})

// get user with id
router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params;

    userSchema.findById( id )
        .then((data) => res.json(data))
        .catch( (e) => res.json({message: e}))
})
// AGREGADO A ULTIMA HORA
// router.get('/usuarios/:user', (req, res) => {
//     const { user } = req.params;
//     userSchema.findOne( {usuario: user}, (usuario) =>{
//         console.log(usuario);
//     }).then((data) => res.json(data))
// })

// update a user
router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, usuario, email, password, pokefavoritos } = req.body;
    userSchema.updateOne( {_id:id }, { $set: {nombre, apellido, usuario, email, password, pokefavoritos} } )
        .then((data) => res.json(data))
        .catch( (e) => res.json({message: e}))
})

// Delete a user
router.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    userSchema.remove( {_id:id } )
        .then((data) => res.json(data))
        .catch( (e) => res.json({message: e}))
})

module.exports = router;