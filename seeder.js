// Importando modelos
const Autor = require('./models/autor');
const Editorial = require('./models/editorial');
const InstanciaLibro = require('./models/instanciaLibro');
const Libro = require('./models/libro');
const mongoose = require("mongoose");

// Obtener la conexión como argumento
const userArgs = process.argv.slice(2);
// recibo el parámetro de la url para conectarme a la base de datos
const db = userArgs[0];

// Eliminando datos previos
Autor.deleteMany({}).exec();
Libro.deleteMany({}).exec();
Editorial.deleteMany({}).exec();
InstanciaLibro.deleteMany({}).exec();

// variables con los objetos que son creados para ser usados para crear otros objetos
const editoriales = [];
const autores = [];
const libros = [];
const instancias_libros = [];

// función para ejecutar el programa
async function main() {
    await mongoose.connect(db);
    console.log("Agregando data . . .");
    await crearEditoriales();
    await crearAutores();
    await crearLibros();
    await crearInstanciasDeLibros();
    console.log("Base de datos lista");
    process.exit();
}

main().catch((err) => console.log(err));

/**
 * Editoriales
 */
async function crearEditorial(i, nombre, acerca_de, pais, web) {
    const editorial = new Editorial({nombre: nombre, acerca_de: acerca_de, pais: pais, web: web });
    await editorial.save();
    editoriales[i] = editorial;
    console.log(`editorial añadida: ${editorial.nombre}`);
}

async function crearEditoriales(){
    console.log("Añadiendo editoriales . . .");
    await Promise.all([
        crearEditorial(0, "DEBOLSILLO", "Germán Plaza, en 1957, se lanzó a editar libros de bolsillo en su editorial, que por aquellos entonces tenía el nombre de Cliper. La edición de libros en pequeño formato fue una de las características principales de la editorial que formó, dos años después, junto a Josep Janés i Olivé, la conocidísima Plaza & Janés. La edición de la colección del Coyote fue una de las más exitosas de la época. La edición en formato bolsillo fue uno de los emblemas de Plaza & Janés a lo largo de toda su trayectoria, y así se mantuvo hasta que en 1984 el grupo Berstelmann adquiriño la empresa. En 2001, cuando se produjo la joint venture con la italiana Mondadori, bajo el nombre Random House Mondadori, se lanzó el sello Debolsillo para vender todo el catálogo de bolsillo heredado de Plaza y también de los nuevos libros que iban poniendo en circulación los distintos sellos del grupo. Desde entonces, los editores que cogieron ese testigo han invertido todo su esfuerzo en conseguir que el libro de formato ocupe el lugar que le corresponde en las librerías y los hogares. Dignificar el libro de bolsillo con ediciones de calidad a precio popular fue, es y seguirá siendo la prioridad de Debolsillo, algo que ha convertido al sello en referencia indiscutible en el mundo de habla hispana. Los cerca de 2.500 títulos que componen el catálogo de la división de bolsillo de Penguin Random House Grupo Editorial están reunidos en tres sellos: Debolsillo, Cisne y Penguin Clásicos. A sus editores les gusta pensar que en un catálogo donde Julia Navarro puede conversar con Virginia Woolf, Ken Follett con Umberto Eco, John Grisham con W. Somerset Maugham, Javier Marías con Henry James, Carlos Giménez con Paul Preston, Robin S. Sharma con Rabindranath Tagore, Nora Roberts con Pearl S. Buck, Enrique Vila-Matas con Franz Kafka, Toni Hill con Jerzy Kosinski, Elísabet Benavent con Jane Austen o Albert Espinosa con Carlo Collodi, entre otros. Los lectores y lectoras pueden encontrar todo lo que necesitan para agitar sus mentes o pasar un buen rato, o ambas cosas, puesto que no son incompatibles.", "España", "https://www.penguinrandomhousegrupoeditorial.com/sello/debolsillo/"),
        crearEditorial(1, "RAE", "La Real Academia Española, fundada en 1713 por iniciativa de Juan Manuel Fernández Pacheco y Zúñiga, marqués de Villena, es una institución con personalidad jurídica propia que tiene como misión principal velar por que los cambios que experimente la lengua española en su constante adaptación a las necesidades de sus hablantes no quiebren la esencial unidad que mantiene en todo el ámbito hispánico, según establece el artículo primero de sus actuales estatutos.", "España", "https://www.rae.es/"),
        crearEditorial(2, "Trotalibros", "Trotalibros es una editorial joven, radicalmente independiente y especializada en recuperar obras fundamentales de la literatura universal injustamente olvidadas.Trotalibros nace en 2012 como el blog de reseñas literarias de un estudiante de derecho que identifica el interminable viaje de los lectores en el de los trotamundos. En 2021, con la publicación de La guardia, de Nikos Kavadías, se reinventa como editorial.", "Andorra", "https://trotalibros.com/")
    ]);
}

/**
 * Autores
 */
async function crearAutor(i, nombre, apellido, nacimiento, muerte ) {
    const autor = new Autor({ nombres:nombre, apellidos: apellido, nacimiento: nacimiento, muerte: muerte });
    await autor.save();
    autores[i] = autor;
    console.log(`autor añadido: ${autor.nombre}`);
}

async function crearAutores() {
    console.log("Añadiendo autores . . .");
    await Promise.all([
        crearAutor(0, 'Gabriel', 'García Márquez', '1927-3-6', '2014-4-17'),
        crearAutor(1, 'Mario', 'Vargas Llosa', '1936-3-28'),
        crearAutor(2, 'Miguel', 'Otero Silva', '1908-10-26', '1985-08-28')
    ]);
}

/**
 * Libros
 */
async function crearLibro(i, titulo, autor, isbn, generos) {
    const libro = new Libro({ titulo: titulo, autor: autor, isbn: isbn, generos: generos });
    await libro.save();
    libros[i] = libro;
    console.log(`libro añadido: ${libro.titulo}`);
}

async function crearLibros() {
    console.log("Añadiendo libros . . .");
    await Promise.all([
        crearLibro(0, "Cien años de soledad", autores[0], "978-8497592208", ['Novela,Ficción']),
        crearLibro(1, "El amor en los tiempos del cólera", autores[0], "978-8497592451", ['Novela']),
        crearLibro(2, "Crónica de una muerte anunciada", autores[0], "978-8497592437", ['Novela']),
        crearLibro(3, "La ciudad y los perros", autores[1], "978-8420412337", ['Novela']),
        crearLibro(4, "Casas muertas | Oficina N° 1", autores[2], "978-99920-76-22-4", ['Novela']),
    ]);
}

/** 
 * Instancias de libro
 */
async function crearInstanciaLibro(i, libro, editorial, estatus, deterioro) {
    const instancia = new InstanciaLibro({ libro: libro, editorial: editorial, estatus: estatus, deterioro: deterioro });
    await instancia.save();
    instancias_libros[i] = instancia;
    console.log(`instancia de libro añadida: ${libro.titulo}`);
}

async function crearInstanciasDeLibros() {
    console.log("Creando instancias de libros");
    await Promise.all([
        crearInstanciaLibro(0, libros[0], editoriales[0], "Prestado"),
        crearInstanciaLibro(1, libros[0], editoriales[0], "Disponible"),
        crearInstanciaLibro(2, libros[1], editoriales[0], "Disponible"),
        crearInstanciaLibro(3, libros[1], editoriales[0], "Reservado"),
        crearInstanciaLibro(4, libros[1], editoriales[0], "Prestado"),
        crearInstanciaLibro(5, libros[2], editoriales[0], "En Mantenimiento", "Cubierta mojada"),
        crearInstanciaLibro(6, libros[3], editoriales[1], "Disponible"),
        crearInstanciaLibro(7, libros[4], editoriales[2], "Prestado"),
        crearInstanciaLibro(8, libros[4], editoriales[2], "Prestado"),
    ])
}
