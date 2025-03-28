const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es Obligatorio']
    }, 
    correo: {
        type: String,
        required: [true, 'El correo es Obbligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es Obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );