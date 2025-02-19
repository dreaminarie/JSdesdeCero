let nota = Number(prompt('Ingresa tu nota'))

if (nota >= 0 && nota <= 100) {
    let mensaje;
    
    if (nota >= 90) {
        mensaje = 'Excelente';
    } else if (nota >= 75) {
        mensaje = 'Bien';
    } else if (nota >= 60) {
        mensaje = 'Suficiente';
    } else {
        mensaje = 'No aprobado';
    }
    
    console.log(`El estudiante obtuvo una nota de ${nota}: ${mensaje}`);
} else {
    console.log(`Error: La nota debe estar entre 0 y 100`);
}