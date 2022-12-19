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

// update a user
router.put('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema.updateOne( {_id:id }, { $set: {name, age, email} } )
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