const { model, Schema } = require('mongoose')

const cursoSchema = Schema({
    titulo: String,
    desc: String,
    linkVideo: String,
    imgCurso: String
});

module.exports = model('curso', cursoSchema);