const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const key = require('../../../configs/config');

const { UserModel } = require('../../models/Index')

exports.login = async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).exec();
    if(!user) return res.json({ err: 'Correo incorrecto' });

    const match = await bcrypt.compare(password, user.password)
    
    if(match){

        const payload = {
            userId: user._id,
            name: user.name,
            email: user.email
        }

        jwt.sign(payload, key.admin, (err, token) => {
            res.json( (!err) ? { token } : err)
        });
        
    } else {
        res.json({ err: "Contrasena incorrecto" })
    }
}

exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    const existUser = await UserModel.findOne({ email: email }).exec();
    if(existUser) return res.json({ err: 'ya existe un usuario con este email' });

    const passHash = await bcrypt.hash(password, 10);

    const user = new UserModel({ name, email, password: passHash });
    await user.save();

    const payload = {
        userId: user._id,
        name: user.name,
        email: user.email
    }

    jwt.sign(payload, key.admin, (err, token) => {
        res.json((!err) ? { token } : err)
    });
}

exports.verifyToken = async (req, res, next) => {

    const token = req.headers['access-token'];
    if(token == null) return res.json({ error: 'acceso denegado' });

    jwt.verify(token, key.admin, err => {
        if(err) return res.json({ err: 'TokenExpiredError' })

        next()
    });
    
}