// 1. Al cargar la página, recuperar comentarios guardados
window.onload = function() {
    const comentariosGuardados = JSON.parse(localStorage.getItem('misComentarios')) || [];
    const lista = document.getElementById('listaComentarios');
    
    comentariosGuardados.forEach(texto => {
        agregarElementoALista(texto);
    });
};

function enviarComentario() {
    const textarea = document.getElementById('userComment');
    const texto = textarea.value.trim();

    if (texto === "") {
        alert("Por favor, escribe algo.");
        return;
    }

    // Guardar en LocalStorage
    guardarComentarioEnStorage(texto);

    // Mostrar en la pantalla
    agregarElementoALista(texto);

    textarea.value = "";
}

// Función auxiliar para crear el HTML del comentario
function agregarElementoALista(texto) {
    const lista = document.getElementById('listaComentarios');
    const div = document.createElement('div');
    div.className = 'comentario-item';
    
    div.innerHTML = `
        <p>${texto}</p>
        <button class="btn-borrar" onclick="borrarComentario(this, '${texto}')">Borrar</button>
    `;

    lista.appendChild(div);
}

// Función para guardar en la memoria del navegador
function guardarComentarioEnStorage(nuevoTexto) {
    let comentarios = JSON.parse(localStorage.getItem('misComentarios')) || [];
    comentarios.push(nuevoTexto);
    localStorage.setItem('misComentarios', JSON.stringify(comentarios));
}

// Función para borrar de la pantalla y de la memoria
function borrarComentario(boton, textoABorrar) {
    // Borrar de la pantalla
    boton.parentElement.remove();

    // Borrar de LocalStorage
    let comentarios = JSON.parse(localStorage.getItem('misComentarios')) || [];
    const nuevosComentarios = comentarios.filter(t => t !== textoABorrar);
    localStorage.setItem('misComentarios', JSON.stringify(nuevosComentarios));
}

// El botón de descarga ahora solo redirige sin alertas
document.getElementById('downloadBtn').onclick = () => {
    console.log("Descarga directa activada.");
};