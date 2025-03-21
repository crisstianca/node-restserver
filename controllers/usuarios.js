const { response, request } = require('express')

const usuariosGet = (req = request, res = response) => {
    // Ejemplo de URL: http://localhost:8080/api/usuarios?nombre=cristian&apikey=123&age=26
    const { name = 'No name', apikey = 1, age = 0 } = req.query;

    res.json({
        msg: 'get API - Controller ',
        name,
        apikey,
        age
    });
}

const usuariosPost = (req, res = response) => {

    const { name, age, apikey} = req.body;

    res.json({
        msg: 'post API - Controller',
        name, 
        age, 
        apikey
    });
}

const usuariosPut = (req, res = response) => {

    const  {id} = req.params;

    res.json({
        msg: 'put API - Controller',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
}

const usuariosDelete =  (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}