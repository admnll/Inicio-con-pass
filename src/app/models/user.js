const manguito = require('mongoose');
const encripta = require('bcrypt-nodejs');

const esquemaUsuario = new manguito.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    twitter: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    google: {
        email: String,
        password: String,
        id: String,
        token: String
    }

});

// Generar clave cifrada
//generateHash
esquemaUsuario.methods.generaHash = function (password) {

    return encripta.hashSync(password, encripta.genSaltSync(8), null);

};

// Transformar la contraseña encriptada

esquemaUsuario.methods.validaPass = function (password) {

    return encripta.compareSync(password, this.local.password);

};

module.exports = manguito.model('User', esquemaUsuario);