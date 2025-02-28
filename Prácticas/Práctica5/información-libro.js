class Libro {
    constructor(titulo, autor, anio, estado = "disponible") {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.estado = estado;
        this.capitulos = [];
    }

    describirLibro() {
        return `Libro titulado ${this.titulo}, escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`;
    }

    agregarCapitulo(tituloCapitulo) {
        this.capitulos.push(tituloCapitulo);
        console.log(`Se agregó el capítulo "${tituloCapitulo}" del libro "${this.titulo}"`);
        return `Se agregó el capítulo: "${tituloCapitulo}"`;
    }

    eliminarCapitulo(tituloCapitulo) {
        const indice = this.capitulos.indexOf(tituloCapitulo);
        if (indice !== -1) {
            this.capitulos.splice(indice, 1);
            return `Se eliminó el capítulo: "${tituloCapitulo}"`;
        } else {
            return `No se encontró el capítulo: "${tituloCapitulo}"`;
        }
    }

    listarCapitulos() {
        if (this.capitulos.length === 0) {
            return "El libro no tiene capítulos registrados.";
        }
        return `Capítulos de ${this.titulo}:\n${this.capitulos.map((cap, index) => `${index + 1}. ${cap}`).join('\n')}`;
    }
}

const libro1 = new Libro("El Principito", "Antoine de Saint-Exupéry", 1943);
const libro2 = new Libro("Cien años de soledad", "Gabriel García Márquez", 1967);
const libro3 = new Libro("Don Quijote de la Mancha", "Miguel de Cervantes", 1605, "prestado");
const libro4 = new Libro("El Hobbit", "J.R.R. Tolkien", 1937);

const biblioteca = [libro1, libro2, libro3, libro4];
biblioteca.forEach(libro => {
    console.log(libro.describirLibro());
});

libro1.agregarCapitulo("El encuentro con el zorro");
libro2.agregarCapitulo("Macondo");
libro2.agregarCapitulo("La familia Buendía");
libro4.agregarCapitulo("Una tertulia inesperada");
libro4.agregarCapitulo("Cordero asado");
libro4.agregarCapitulo("Un breve descanso");

console.log(libro4.listarCapitulos());

const resultado = libro4.eliminarCapitulo("Cordero asado");
console.log(resultado);
libro4.eliminarCapitulo("Capítulo inexistente");

console.log(libro4.listarCapitulos());

const librosDisponibles = biblioteca.filter(libro => libro.estado === "disponible");
console.log(`Hay ${librosDisponibles.length} libros disponibles.`);
