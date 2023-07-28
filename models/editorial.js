const mongoose = require("mongoose");
const Libro = require("./libro");

const Schema = mongoose.Schema;

const EditorialSchema = new Schema({
  nombre: { type: String, required: true },
  acerca_de: { type: String, required: true },
  pais: { type: String },
  web: { type: String },
});

// Eliminando datos que dependen de este registro
EditorialSchema.post('findOneAndDelete', async function (editorial) {
  const libros = await Libro.find({ editorial: editorial.id }).exec();

  libros.forEach(libro => {
    Libro.findOneAndDelete({ _id: libro.id }).exec();
  });
});

module.exports = mongoose.model("Editorial", EditorialSchema);
