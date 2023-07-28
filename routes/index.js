var express = require('express');
var router = express.Router();

// Importando los controladores
const autor_controller = require('../controllers/autorController');
const editorial_controller = require('../controllers/editorialController');
const instancia_libro_controller = require('../controllers/instanciaLibroController');
const libro_controller = require('../controllers/libroController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * AUTORES
 */

router.get('/autores',autor_controller.index);
router.get('/autores/create',autor_controller.create_get);
router.post('/autores/create', autor_controller.create_post);
router.get('/autores/:id', autor_controller.show);
router.get('/autores/:id/edit', autor_controller.update_get);
router.post('/autores/:id', autor_controller.update_post);
router.get('/autores/:id/delete', autor_controller.delete);

/**
 * Editoriales
 */

router.get('/editoriales', editorial_controller.index);
router.get('/editoriales/create', editorial_controller.create_get);
router.post('/editoriales/create', editorial_controller.create_post);
router.get('/editoriales/:id', editorial_controller.show);
router.get('/editoriales/:id/edit', editorial_controller.update_get);
router.post('/editoriales/:id', editorial_controller.update_post);
router.get('/editoriales/:id/delete', editorial_controller.delete);

/**
 * Libro
 */

router.get('/libros', libro_controller.index);
router.get('/libros/create', libro_controller.create_get);
router.post('/libros/create', libro_controller.create_post);
router.get('/libros/:id', libro_controller.show);
router.get('/libros/:id/edit', libro_controller.update_get);
router.post('/libros/:id', libro_controller.update_post);
router.get('/libros/:id/delete', libro_controller.delete);

/**
 * Instancia de libro
 */

router.get('/instancia_libros', instancia_libro_controller.index);
router.get('/instancia_libros/create', instancia_libro_controller.create_get);
router.post('/instancia_libros/create', instancia_libro_controller.create_post);
router.get('/instancia_libros/:id', instancia_libro_controller.show);
router.get('/instancia_libros/:id/edit', instancia_libro_controller.update_get);
router.post('/instancia_libros/:id', instancia_libro_controller.update_post);
router.get('/instancia_libros/:id/delete', instancia_libro_controller.delete);

module.exports = router;
