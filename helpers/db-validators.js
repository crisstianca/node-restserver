const Role = require('../models/role')
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if( !existRol ) {
        throw new Error( `El rol ${ rol } No esta registrado en la base de datos`)
    }
}

const emailExist = async( correo = '') => {
    //Verificar si el correo existe
    const existEmail = await Usuario.findOne({ correo });
    if( existEmail ) {
        throw new Error(`El correo ${ correo }, ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {
    //Verificar si el Usuario con ese Id existe
    const existeUsuarioById = await Usuario.findById(id);
    if( !existeUsuarioById ) {
        throw new Error(`El id ${ id }, No existe en la BD`);
    }
}

module.exports = {
    esRoleValido,
    emailExist,
    existeUsuarioPorId
}