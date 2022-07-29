const express = require('express');
const router = express.Router();

const { login, register } = require('../app/controllers/Middlewares/AuthController');
const { cursosCtr } = require('../app/controllers/Index');

router.get('/', (req, res) => res.send('Bienvenido'));

// <============= Registro de Auth =================>
router.post('/login', login);
router.post('/register', register);

// <============= Cursos =================>
router.get('/cursos', cursosCtr.getCursos);
router.post('/cursos', cursosCtr.postCursos);
router.get('/cursos/:id', cursosCtr.getById);

module.exports = router;