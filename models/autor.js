const mongoose = require("mongoose");
//const { DateTime } = require("luxon"); // for date handling

const Libro = require("./libro");

const Schema = mongoose.Schema;

const AutorSchema = new Schema({
  nombres: { type: String, required: true, maxLength: 50 },
  apellidos: { type: String, required: true, maxLength: 50 },
  nacimiento: { type: Date, default: undefined, 
    get: (fecha) => {
      if(fecha != undefined){
        const fechaFormateada = new Date(fecha)
        console.log(fechaFormateada)
        
        return fechaFormateada.toISOString().split('T') [0]
      }
    }
  },
  muerte: { type: Date, default: undefined, 
    get: (fecha) => {
      if(fecha != undefined){
        const fechaFormateada = new Date(fecha)
        return fechaFormateada.toISOString().split('T') [0]
      }
    }
  },
});

// Creando una pequeña función para obtener el nombre completo de tener nombre y apellido
AutorSchema.virtual("nombre_completo").get(function(){
    if(this.nombres && this.apellidos){
        return `${this.apellidos}, ${this.nombres}`
    }

    return this.nombre;
})

// Mostrando fechas
AutorSchema.virtual("fecha_nacimiento").get(function(){
  var fecha = new Date(this.nacimiento)
  var dia = fecha.getUTCDate();
  var mes = fecha.getUTCMonth() + 1;
  var anho = fecha.getUTCFullYear();
  return `${dia}/${mes}/${anho}`;
})

AutorSchema.virtual("fecha_muerte").get(function(){
  var fecha = new Date(this.muerte)
  var dia = fecha.getUTCDate();
  var mes = fecha.getUTCMonth() + 1;
  var anho = fecha.getUTCFullYear();
  return `${dia}/${mes}/${anho}`;
})

// Eliminando datos que dependen de este registro
AutorSchema.post('findOneAndDelete', async function(autor){
  const libros = await Libro.find({ autor: autor.id }).exec();

  libros.forEach(libro => {
    Libro.findOneAndDelete({ _id: libro.id }).exec();
  });
});

// Exportando modelo
module.exports = mongoose.model("Autor", AutorSchema);
