// Datos de acceso (puedes cambiar estos valores)
const usuarios = {
    'carlos': 'password123',
    'admin': 'admin123',
    'usuario': '12345'
};

// Contenido para cada sección
const contenidos = {
    videos: '<h3>VIDEOS</h3><p>Aquí encontrarás tutoriales en video sobre temas de interés.</p><ul style="text-align: left;"><li>Video 1: Introducción</li><li>Video 2: Conceptos básicos</li><li>Video 3: Casos avanzados</li></ul>',
    tutoriales: '<h3>TUTORIALES</h3><p>Guías paso a paso para aprender nuevas habilidades.</p><ul style="text-align: left;"><li>Tutorial 1: Primeros pasos</li><li>Tutorial 2: Técnicas intermedias</li><li>Tutorial 3: Temas avanzados</li></ul>',
    documentos: '<h3>DOCUMENTOS</h3><p>Acceso a documentación técnica y recursos importantes.</p><ul style="text-align: left;"><li>Manual de usuario</li><li>Guía de referencia</li><li>Especificaciones técnicas</li></ul>',
    configuracion: '<h3>CONFIGURACIÓN</h3><p>Ajusta las preferencias de tu cuenta.</p><ul style="text-align: left;"><li>Cambiar contraseña</li><li>Perfil de usuario</li><li>Preferencias de privacidad</li></ul>'
};

// Variables globales
let usuarioActual = null;

// Función de validación y login
function entrar(event) {
    event.preventDefault();
    
    const usuario = document.getElementById('user').value.trim();
    const contraseña = document.getElementById('pass').value.trim();
    const userError = document.getElementById('userError');
    const passError = document.getElementById('passError');
    
    // Limpiar errores previos
    userError.textContent = '';
    passError.textContent = '';
    
    // Validaciones
    let esValido = true;
    
    if (usuario === '') {
        userError.textContent = 'El usuario es requerido';
        esValido = false;
    } else if (usuario.length < 3) {
        userError.textContent = 'El usuario debe tener al menos 3 caracteres';
        esValido = false;
    }
    
    if (contraseña === '') {
        passError.textContent = 'La contraseña es requerida';
        esValido = false;
    } else if (contraseña.length < 5) {
        passError.textContent = 'La contraseña debe tener al menos 5 caracteres';
        esValido = false;
    }
    
    // Si las validaciones pasan, verificar credenciales
    if (esValido) {
        if (usuarios[usuario] && usuarios[usuario] === contraseña) {

    const flash = document.getElementById("flash");
    const loginBox = document.getElementById("loginBox");
    const panel = document.getElementById("panel");

    flash.classList.add("animar-flash");
    loginBox.classList.add("ocultar-login");

    setTimeout(() => {
        usuarioActual = usuario;
        mostrarPanel(usuario);
        limpiarFormulario();
    }, 500);

} else {
            // Credenciales incorrectas
            passError.textContent = 'Usuario o contraseña incorrectos';
        }
    }
}

// Mostrar panel principal
function mostrarPanel(usuario) {
    const loginBox = document.getElementById('loginBox');
    const panel = document.getElementById('panel');
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    loginBox.style.display = 'none';
    panel.style.display = 'block';
    
    // Capitalizar primera letra del nombre
    const nombreUsuario = usuario.charAt(0).toUpperCase() + usuario.slice(1);
    welcomeMessage.textContent = `Bienvenido, ${nombreUsuario}`;
    
    // Mostrar contenido por defecto
    mostrarSeccion('videos');
}

// Mostrar sección
function mostrarSeccion(seccion) {
    const contenido = document.getElementById('contenido');
    contenido.innerHTML = contenidos[seccion] || '<p>Sección no disponible</p>';
}

// Cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const loginBox = document.getElementById('loginBox');
        const panel = document.getElementById('panel');
        
        panel.style.display = 'none';
        loginBox.style.display = 'block';
        
        limpiarFormulario();
        usuarioActual = null;
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('user').value = '';
    document.getElementById('pass').value = '';
    document.getElementById('userError').textContent = '';
    document.getElementById('passError').textContent = '';
}

// Permitir login con Enter
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                entrar(event);
            }
        });
    }
});
// EFECTO LLUVIA MATRIX
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = "アァカサタナハマヤャラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasArray = letras.split("");

const fontSize = 16;
const columnas = canvas.width / fontSize;

const gotas = [];

for (let x = 0; x < columnas; x++) {
    gotas[x] = 1;
}

function dibujarMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const texto = letrasArray[Math.floor(Math.random() * letrasArray.length)];
        ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

        if (gotas[i] * fontSize > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }

        gotas[i]++;
    }
}

setInterval(dibujarMatrix, 50);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});// =========================
// SUBIR ARCHIVO A SUPABASE
// =========================

async function subirArchivo() {
    const archivo = document.getElementById("fileInput").files[0];

    if (!archivo) {
        alert("Selecciona un archivo primero");
        return;
    }

    const { data, error } = await window.supabaseClient.storage
        .from("archivos") // ← el nombre debe ser igual a tu bucket
        .upload(archivo.name, archivo);

    if (error) {
        alert("Error al subir: " + error.message);
        console.error(error);
    } else {
        alert("Archivo subido correctamente");
        console.log(data);
    }
}