const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InstanciaLibroSchema = new Schema({
    libro: { type: Schema.Types.ObjectId, ref: "Libro", required: true },
    editorial: { type: Schema.Types.ObjectId, ref: "Editorial", required: true },
    estatus: {
        type: String,
        required: true,
        enum: ["Disponible", "Prestado", "Reservado", "En Mantenimiento"],
        default: "En Mantenimiento",
    },
    deterioro: { type: String, default: undefined }
});

module.exports = mongoose.model("InstanciaLibro", InstanciaLibroSchema);
