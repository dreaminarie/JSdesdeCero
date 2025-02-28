document.addEventListener('DOMContentLoaded', function() {
    const deslizadorLongitud = document.getElementById('longitud-slider');
    const valorLongitud = document.getElementById('longitud-valor');
    const incluirMayusculas = document.getElementById('incluir-mayusculas');
    const incluirMinusculas = document.getElementById('incluir-minusculas');
    const incluirNumeros = document.getElementById('incluir-numeros');
    const incluirSimbolos = document.getElementById('incluir-simbolos');
    const contraseñaGenerada = document.getElementById('contraseña-generada');
    const botonGenerar = document.getElementById('generar-btn');
    const botonCopiar = document.getElementById('copiar-btn');
    const textoNivel = document.getElementById('nivel-texto');
    const barraFortaleza = document.getElementById('barra-fortaleza');
    const mensajeCopiado = document.getElementById('mensaje-copiado');
    
    deslizadorLongitud.addEventListener('input', function() {
        valorLongitud.textContent = deslizadorLongitud.value;
        actualizarIndicadorFortaleza();
    });
    
    const letrasMAYUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
    
    [incluirMayusculas, incluirMinusculas, incluirNumeros, incluirSimbolos].forEach(opcion => {
        opcion.addEventListener('change', actualizarIndicadorFortaleza);
    });
    
    function calcularFortaleza() {
        let puntaje = 0;
        let opcionesSeleccionadas = 0;
        
        if (incluirMayusculas.checked) opcionesSeleccionadas++;
        if (incluirMinusculas.checked) opcionesSeleccionadas++;
        if (incluirNumeros.checked) opcionesSeleccionadas++;
        if (incluirSimbolos.checked) opcionesSeleccionadas++;
        
        const longitud = parseInt(deslizadorLongitud.value);
        
        if (longitud >= 8 && longitud < 12) puntaje += 1;
        else if (longitud >= 12 && longitud < 16) puntaje += 2;
        else if (longitud >= 16) puntaje += 3;
        
        puntaje += opcionesSeleccionadas;
        
        if (opcionesSeleccionadas === 0) return 0;
        
        return puntaje;
    }
    
    function actualizarIndicadorFortaleza() {
        const puntaje = calcularFortaleza();
        
        barraFortaleza.classList.remove('debil', 'normal', 'fuerte', 'super-fuerte');
        
        if (puntaje === 0) {
            textoNivel.textContent = 'Selecciona';
            barraFortaleza.classList.add('debil');
        } else if (puntaje <= 2) {
            textoNivel.textContent = 'Débil';
            barraFortaleza.classList.add('debil');
        } else if (puntaje === 3) {
            textoNivel.textContent = 'Normal';
            barraFortaleza.classList.add('normal');
        } else if (puntaje === 4) {
            textoNivel.textContent = 'Fuerte';
            barraFortaleza.classList.add('fuerte');
        } else if (puntaje > 4) {
            textoNivel.textContent = 'Muy Fuerte';
            barraFortaleza.classList.add('super-fuerte');
        }
    }
    
    actualizarIndicadorFortaleza();
    
    function generarContraseña() {
        let caracteresDisponibles = '';
        
        if (incluirMayusculas.checked) caracteresDisponibles += letrasMAYUSCULAS;
        if (incluirMinusculas.checked) caracteresDisponibles += letrasMinusculas;
        if (incluirNumeros.checked) caracteresDisponibles += numeros;
        if (incluirSimbolos.checked) caracteresDisponibles += simbolos;
        
        if (caracteresDisponibles === '') {
            contraseñaGenerada.textContent = 'Selecciona al menos un tipo de carácter';
            contraseñaGenerada.classList.add('placeholder');
            return;
        }
        
        const longitud = parseInt(deslizadorLongitud.value);
        let contraseña = '';
        
        if (incluirMayusculas.checked) {
            contraseña += letrasMAYUSCULAS.charAt(Math.floor(Math.random() * letrasMAYUSCULAS.length));
        }
        if (incluirMinusculas.checked) {
            contraseña += letrasMinusculas.charAt(Math.floor(Math.random() * letrasMinusculas.length));
        }
        if (incluirNumeros.checked) {
            contraseña += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }
        if (incluirSimbolos.checked) {
            contraseña += simbolos.charAt(Math.floor(Math.random() * simbolos.length));
        }
        
        for (let i = contraseña.length; i < longitud; i++) {
            contraseña += caracteresDisponibles.charAt(Math.floor(Math.random() * caracteresDisponibles.length));
        }
        
        contraseña = mezclarCadena(contraseña);
        
        contraseñaGenerada.textContent = contraseña;
        contraseñaGenerada.classList.remove('placeholder');
    }
    
    function mezclarCadena(cadena) {
        const caracteres = cadena.split('');
        for (let i = caracteres.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [caracteres[i], caracteres[j]] = [caracteres[j], caracteres[i]];
        }
        return caracteres.join('');
    }
    
    botonGenerar.addEventListener('click', generarContraseña);
    
    botonCopiar.addEventListener('click', function() {
        if (contraseñaGenerada.classList.contains('placeholder')) return;
        
        navigator.clipboard.writeText(contraseñaGenerada.textContent)
            .then(() => {
                mensajeCopiado.classList.add('visible');
                setTimeout(() => {
                    mensajeCopiado.classList.remove('visible');
                }, 2000);
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
            });
    });
    
    generarContraseña();
});