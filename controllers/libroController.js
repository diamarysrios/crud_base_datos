const Libro = require("../models/libro");
const Autor = require("../models/autor");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const libros = await Libro.find({}).exec();
  res.render('libros/index', { libros: libros });
});

exports.show = asyncHandler(async (req, res, next) => {
  const libro = await Libro.findById(req.params.id).populate('autor').exec();
  res.render('libros/show', { libro: libro });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  const autores = await Autor.find({}).exec();
  res.render('libros/create', { autores: autores });
});

exports.create_post = asyncHandler(async (req, res, next) => {
  req.body.generos.split(",");
  const libro = new Libro(req.body);

  await libro.save();

  return res.redirect(`/libros/${libro.id}`);
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const libro = await Libro.findById(req.params.id).populate('autor').exec();
  const autores = await Autor.find({}).exec();
  res.render('libros/update', { libro: libro, autores: autores });
});

exports.update_post = asyncHandler(async (req, res, next) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    isbn: req.body.isbn,
    generos: req.body.generos,
    _id: req.params.id,
  });

  const libro_editado = await Libro.findByIdAndUpdate(req.params.id, libro);

  res.redirect(`/libros/${libro.id}`);
});

exports.delete = asyncHandler(async (req, res, next) => {
  await Libro.findOneAndDelete({ _id: req.params.id }).exec()
  res.redirect('/libros');
});
