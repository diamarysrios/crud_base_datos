const mongoose = require("mongoose");
const InstanciaLibro = require("./instanciaLibro");

const Schema = mongoose.Schema;

const LibroSchema = new Schema({
	titulo: { type: String, required: true },
	autor: { type: Schema.Types.ObjectId, ref: "Autor", required: true },
	isbn: { type: String, required: true },
	generos: [{ type: String }],
});

// Eliminando datos que dependen de este registro
LibroSchema.post('findOneAndDelete', async function (libro) {
	await InstanciaLibro.deleteMany({ libro: libro.id }).exec();
});

// Separando generos en un array antes de guardar a la base de datos
LibroSchema.pre('save', function () {
	this.generos = this.generos[0].split(',');
});

// Separando generos en un array antes de actualizar el registro
LibroSchema.pre('findOneAndUpdate', async function (next) {
	this.set({'generos': this.getUpdate().generos[0].split(',') })
	next()
});

module.exports = mongoose.model("Libro", LibroSchema);
