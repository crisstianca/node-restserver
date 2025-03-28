const { response, request } = require('express')
const bcryptjs = require('bcryptjs')


const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ state: true })
    //     .skip( Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments({ state: true })

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ state: true }),
        Usuario.find({ state: true })
        .skip( Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { name, correo, password, rol } = req.body;
    const usuario = new Usuario({name, correo, password, rol});

    // Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    await usuario.save();

    res.json({
        msg: 'post API - Controller',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const  {id} = req.params;

    //Esta desestructuracion Indica que password y google no seran tomados en cuenta si decido utilizar "resto"
    const { _id, password, google, correo, ...resto } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    //En esta constante queda todo guardado del nuevo usuario actualizado
    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usuariosDelete =  async(req, res = response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate( id, { state: false })

    res.json( usuario );
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}