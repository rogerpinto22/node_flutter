const { request, response } = require('express');
const Curso = require('../models/Cursos');

const CursosController = {};

CursosController.getCursos = async (req = request, res = response) => {
    const cursos = await Curso.find();
    res.json( cursos )
}

CursosController.postCursos = async (req = request, res = response) => {
    const { titulo, desc, linkVideo, imgCurso } = req.body;

    await Curso.create({ titulo, desc, linkVideo, imgCurso });
    res.json({
        msg: 'Curso creado'
    })
}

CursosController.getById = async (req = request, res = response) => {
    const cursoDB = await Curso.findById(req.params.id);
    res.json(cursoDB);
}

module.exports = {
    CursosController
}