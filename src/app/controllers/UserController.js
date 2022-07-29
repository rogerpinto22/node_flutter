const User = require('../models/User');

exports.getUsuarios = async (req, res) => {
    
    const user = await User.find();

    res.json( user );
}

exports.postUsuarios = (req, res) => {
    
    let { nombre, email, password } = req.body;

    const user = new User({ nombre, email, password });
    user.save();

    res.json({ status:200, msj: 'Usuario agregado', body: req.body });
}