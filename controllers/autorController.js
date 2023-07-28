const Autor = require("../models/autor");
const Libro = require("../models/libro");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const autores = await Autor.find({}).exec();
  res.render('autores/index', {
    autores: autores
  });
});

exports.show = asyncHandler(async (req, res, next) => {
  const autor = await Autor.findById(req.params.id).exec();
  const libros = await Libro.find({ autor: autor.id }).exec();

  res.render('autores/show', {
    autor: autor,
    libros: libros,
  });
})

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render('autores/create');
});

exports.create_post = asyncHandler(async (req, res, next) => {
  const autor = new Autor(req.body);
  await autor.save();

  return res.redirect(`/autores/${autor.id}`);
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const autor = await Autor.findById(req.params.id).exec();
  res.render('autores/update', { autor: autor });
});

exports.update_post = asyncHandler(async (req, res, next) => {
  const autor = new Autor({
    nombres: req.body.nombres,
    apellidos: req.body.apellidos,
    nacimiento: req.body.nacimiento,
    muerte: req.body.muerte,
    _id: req.params.id,
  });

  const autor_editado = await Autor.findByIdAndUpdate(req.params.id, autor);

  res.redirect(`/autores/${autor.id}`);

});

exports.delete = asyncHandler(async (req, res, next) => {
  await Autor.findOneAndDelete({ _id: req.params.id }).exec()
  res.redirect('/autores');
});
