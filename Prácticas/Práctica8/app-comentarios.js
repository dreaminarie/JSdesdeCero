document.addEventListener('DOMContentLoaded', function() {
    const entradaComentario = document.getElementById('entrada-comentario');
    const botonAgregarComentario = document.getElementById('agregar-comentario');
    const listaComentarios = document.getElementById('lista-comentarios');
    const mensajeSinComentarios = document.getElementById('sin-comentarios');
    
    cargarComentarios();
    
    botonAgregarComentario.addEventListener('click', agregarComentario);
    
    entradaComentario.addEventListener('keydown', function(evento) {
        if (evento.key === 'Enter' && !evento.shiftKey) {
            evento.preventDefault();
            agregarComentario();
        }
    });
    
    function agregarComentario() {
        const textoComentario = entradaComentario.value.trim();
        
        if (textoComentario === '') {
            return;
        }
        
        const comentario = {
            texto: textoComentario,
            fecha: new Date().toISOString(),
            id: Date.now() 
        };
        
        renderizarComentario(comentario);
        
        guardarComentario(comentario);
        
        entradaComentario.value = '';
        
        mensajeSinComentarios.style.display = 'none';
    }
    
    function renderizarComentario(comentario) {
        const elementoComentario = document.createElement('div');
        elementoComentario.className = 'comentario';
        elementoComentario.dataset.id = comentario.id;
        
        const fecha = new Date(comentario.fecha);
        const fechaFormateada = `${fecha.toLocaleDateString()} a las ${fecha.toLocaleTimeString()}`;
        
        elementoComentario.innerHTML = `
            <div class="cabecera-comentario">
                <span>Publicado el ${fechaFormateada}</span>
            </div>
            <div class="texto-comentario">${escaparHTML(comentario.texto)}</div>
            <button class="boton-eliminar" aria-label="Eliminar comentario">×</button>
        `;
        
        listaComentarios.prepend(elementoComentario);
        
        const botonEliminar = elementoComentario.querySelector('.boton-eliminar');
        botonEliminar.addEventListener('click', function() {
            eliminarComentario(comentario.id);
        });
    }
    
    function guardarComentario(comentario) {
        let comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
        comentarios.push(comentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }
    
    function cargarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
        
        if (comentarios.length > 0) {
            comentarios.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            
            comentarios.forEach(comentario => {
                renderizarComentario(comentario);
            });
            
            mensajeSinComentarios.style.display = 'none';
        }
    }
    
    function eliminarComentario(id) {
        const elementoComentario = document.querySelector(`.comentario[data-id="${id}"]`);
        if (elementoComentario) {
            elementoComentario.remove();
        }
        
        let comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
        comentarios = comentarios.filter(comentario => comentario.id != id);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        
        if (comentarios.length === 0) {
            mensajeSinComentarios.style.display = 'block';
        }
    }
    
    function escaparHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .replace(/\n/g, '<br>');
    }
});