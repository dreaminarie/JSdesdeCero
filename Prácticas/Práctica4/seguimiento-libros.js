let librosLeidos = [];

function agregarLibro(titulo) {
    librosLeidos.push(titulo);
}

function mostrarLibrosLeidos() {
    if (librosLeidos.length === 0) {
    console.log('No has leído ningún libro aún.');
    } else {
    console.log('Libros leídos:');
    librosLeidos.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro}`);
        });
    }
}

agregarLibro('Rebelión en la granja');
agregarLibro('El coronel no tiene quién le escriba');
agregarLibro('Los juegos del hambre');
agregarLibro('La metamorfosis');
agregarLibro('La divina comedia');
agregarLibro('El mito de Sísifo');
agregarLibro('Pedro Páramo');

mostrarLibrosLeidos();