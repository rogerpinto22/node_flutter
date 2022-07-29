const userCtr = require('./UserController');
const { CursosController } = require('./CursosController');

module.exports = {
    userCtr,
    cursosCtr: CursosController,
}