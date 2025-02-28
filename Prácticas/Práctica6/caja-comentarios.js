const textoComentario = document.getElementById('texto-comentario');
const botonAgregarComentario = document.getElementById('agregar-comentario');
const contenedorComentarios = document.getElementById('contenedor-comentarios');
const mensajeSinComentarios = document.getElementById('sin-comentarios');

function agregarComentario() {
    const texto = textoComentario.value.trim();
    
    if (texto === '') {
        return;
    }
    
    mensajeSinComentarios.style.display = 'none';
    
    const comentario = document.createElement('div');
    comentario.className = 'comentario';
    
    comentario.textContent = texto;
    
    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'boton-eliminar';
    botonEliminar.textContent = 'X';
    
    botonEliminar.addEventListener('click', function() {
        contenedorComentarios.removeChild(comentario);
        
        if (contenedorComentarios.children.length === 1) {
            mensajeSinComentarios.style.display = 'block';
        }
    });
    
    comentario.appendChild(botonEliminar);
    
    contenedorComentarios.appendChild(comentario);
    
    textoComentario.value = '';
}

botonAgregarComentario.addEventListener('click', agregarComentario);

textoComentario.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        agregarComentario();
    }
});