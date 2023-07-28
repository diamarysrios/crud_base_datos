const Editorial = require("../models/editorial");
const Libro = require("../models/libro");
const InstanciaLibro = require("../models/instanciaLibro");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const instancia_libros = await InstanciaLibro.find({}).populate('libro').exec();
  res.render('instancia_libros/index', { instancia_libros: instancia_libros });
});

exports.show = asyncHandler(async (req, res, next) => {
  const instancia_libro = await InstanciaLibro.findById(req.params.id).populate(['libro','editorial']).exec();
  res.render('instancia_libros/show', { instancia_libro: instancia_libro });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  const editoriales = await Editorial.find({}).exec();
  const libros = await Libro.find({}).exec();

  res.render("instancia_libros/create", { libros: libros, editoriales: editoriales });
});

exports.create_post = asyncHandler(async (req, res, next) => {
  const instancia_libro = new InstanciaLibro(req.body);
  await instancia_libro.save();

  return res.redirect(`/instancia_libros/${instancia_libro.id}`);
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const instancia_libro = await InstanciaLibro.findById(req.params.id).populate(['libro','editorial']).exec();
  const editoriales = await Editorial.find({}).exec();
  const libros = await Libro.find({}).exec();

  res.render('instancia_libros/update', { 
    instancia_libro: instancia_libro, 
    editoriales: editoriales, 
    libros: libros 
  });
});

exports.update_post = asyncHandler(async (req, res, next) => {
  const instancia_libro = new InstanciaLibro({
    libro: req.body.libro,
    editorial: req.body.editorial,
    estatus: req.body.estatus,
    deterioro: req.body.deterioro,
    _id: req.params.id,
  });

  const instancia_libro_editada = await InstanciaLibro.findByIdAndUpdate(req.params.id, instancia_libro);

  res.redirect(`/instancia_libros/${instancia_libro.id}`);
});

exports.delete = asyncHandler(async (req, res, next) => {
  await InstanciaLibro.findOneAndDelete({ _id: req.params.id }).exec()
  res.redirect('/instancia_libros');
});
