
const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExist, existeUsuarioPorId } = require('../helpers/db-validators');



const router = Router();

     
router.get('/', usuariosGet);

router.post('/', [
    check('name', 'El nombre es obligatrio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExist ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch );

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,usuariosDelete);

module.exports = router;