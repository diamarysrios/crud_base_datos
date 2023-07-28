const Editorial = require("../models/editorial");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const editoriales = await Editorial.find({}).exec();
  res.render('editoriales/index', { editoriales: editoriales });
});

exports.show = asyncHandler(async (req, res, next) => {
  const editorial = await Editorial.findById(req.params.id).exec();
  res.render('editoriales/show', { editorial: editorial });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render('editoriales/create');
});

exports.create_post = asyncHandler(async (req, res, next) => {
  const editorial = new Editorial(req.body);
  await editorial.save();

  return res.redirect(`/editoriales/${editorial.id}`);
});

exports.update_get = asyncHandler(async (req, res, next) => {
  const editorial = await Editorial.findById(req.params.id).exec();
  res.render('editoriales/update', { editorial: editorial });
});

exports.update_post = asyncHandler(async (req, res, next) => {
  const editorial = new Editorial({
    nombre: req.body.nombre,
    acerca_de: req.body.acerca_de,
    pais: req.body.pais,
    web: req.body.web,
    _id: req.params.id,
  });

  const editorial_editada = await Editorial.findByIdAndUpdate(req.params.id, editorial);

  res.redirect(`/editoriales/${editorial.id}`);
});

exports.delete = asyncHandler(async (req, res, next) => {
  await Editorial.findOneAndDelete({ _id: req.params.id }).exec()
  res.redirect('/editoriales');
});
