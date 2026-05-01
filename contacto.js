document.addEventListener('DOMContentLoaded', () => {
    // --- 1. CONFIGURACIÓN DE PRECIOS E IVA ---
    const CONFIG = {
        baseComision: 600,
        ivaUruguay: 0.22, // 22% de IVA
        estiloTecnica: {
            'bn': { 'tradicional': 300, 'digital': 200 },
            'color': { 'tradicional': 500, 'digital': 400 }
        },
        tamanos: {
            'a5': 0,
            'a4': 100,
            'a3': 300
        },
        envioImpresion: {
            'a5': 50,
            'a4': 100,
            'a3': 200
        },
        precioPersonajeExtra: 100,
        precioFondo: 300 
    };

    // Elementos del DOM
    const listaResumen = document.getElementById('listaResumen');
    const totalFinal = document.getElementById('totalFinal');
    const cantidadSpan = document.getElementById('cantidadPersonajes');
    const btnSumar = document.getElementById('btnSumar');
    const btnRestar = document.getElementById('btnRestar');

    // Variable para personajes extras (empezamos en 0 según tu lógica)
    let personajesExtras = 0;

    function calcular() {
        // Capturar selecciones de radios (verificar que existan)
        const estiloElegido = document.querySelector('input[name="estilo"]:checked');
        const tecnicaElegida = document.querySelector('input[name="tecnica"]:checked');
        const tamanoElegido = document.querySelector('input[name="tamano"]:checked');
        const metodoElegido = document.querySelector('input[name="metodo"]:checked');
        const fondoElegido = document.querySelector('input[name="fondo"]:checked');

        // Si falta alguna selección obligatoria, no calcular todavía
        if (!estiloElegido || !tecnicaElegida || !tamanoElegido || !metodoElegido || !fondoElegido) return;

        const estilo = estiloElegido.value;
        const tecnica = tecnicaElegida.value;
        const tamano = tamanoElegido.value;
        const metodo = metodoElegido.value;
        const fondo = fondoElegido.value;

        // 1. Cálculo del Subtotal (Suma de todos los conceptos)
        let subtotal = CONFIG.baseComision;

        let html = `
            <li class="d-flex justify-content-between mb-2 border-bottom pb-1">
                <span><b>Base de la Comisión</b></span> 
                <b>$${CONFIG.baseComision}</b>
            </li>
        `;

        // Estilo y Técnica
        const valorEstilo = CONFIG.estiloTecnica[estilo][tecnica];
        subtotal += valorEstilo;
        html += `<li class="d-flex justify-content-between mb-2"><span>Estilo: ${estilo.toUpperCase()} (${tecnica})</span> <b>+$${valorEstilo}</b></li>`;

        // Fondo
        if (fondo === 'con') {
            subtotal += CONFIG.precioFondo;
            html += `<li class="d-flex justify-content-between mb-2"><span>Con Fondo Detallado</span> <b>+$${CONFIG.precioFondo}</b></li>`;
        }

        // Tamaño
        const valorTamano = CONFIG.tamanos[tamano];
        if (valorTamano > 0) {
            subtotal += valorTamano;
            html += `<li class="d-flex justify-content-between mb-2"><span>Extra Tamaño ${tamano.toUpperCase()}</span> <b>+$${valorTamano}</b></li>`;
        }

        // Personajes Extras
        if (personajesExtras >= 1) {
            const valorExtras = personajesExtras * CONFIG.precioPersonajeExtra;
            subtotal += valorExtras;
            html += `<li class="d-flex justify-content-between mb-2"><span>${personajesExtras} Personaje(s) extra</span> <b>+$${valorExtras}</b></li>`;
        }

        // Envío / Impresión
        if (metodo === 'envio') {
            const valorEnvio = CONFIG.envioImpresion[tamano];
            subtotal += valorEnvio;
            html += `<li class="d-flex justify-content-between mb-2"><span>Envío e Impresión (${tamano.toUpperCase()})</span> <b>+$${valorEnvio}</b></li>`;
        }

        // --- 2. CÁLCULO DE IMPUESTOS (IVA URUGUAY) ---
        const montoIva = subtotal * CONFIG.ivaUruguay;
        const totalConIva = subtotal + montoIva;

        // Añadir Subtotal e IVA al resumen antes del total final
        html += `
            <li class="d-flex justify-content-between mt-3 border-top pt-2">
                <span>Subtotal</span> 
                <span>$${subtotal.toFixed(2)}</span>
            </li>
            <li class="d-flex justify-content-between text-muted">
                <span>IVA (22%)</span> 
                <span>$${montoIva.toFixed(2)}</span>
            </li>
        `;

        // --- 3. ACTUALIZAR PANTALLA ---
        listaResumen.innerHTML = html;
        totalFinal.innerText = `$${totalConIva.toFixed(2)}`;
        cantidadSpan.innerText = personajesExtras.toString().padStart(2, '0');
    }

    // --- EVENTOS ---

    btnSumar.addEventListener('click', (e) => {
        e.preventDefault();
        personajesExtras++;
        calcular();
    });

    btnRestar.addEventListener('click', (e) => {
        e.preventDefault();
        if (personajesExtras > 0) {
            personajesExtras--;
            calcular();
        }
    });

    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', calcular);
    });

    // Botón Cancelar (Reset)
    document.getElementById('btnAplicar').onclick = (e) => {
        e.preventDefault();
        personajesExtras = 0;
        document.getElementById('color').checked = true;
        document.getElementById('acuarela').checked = true;
        document.getElementById('a5').checked = true;
        document.getElementById('envio').checked = true;
        document.getElementById('sin_fondo').checked = true;
        if(document.getElementById('notas')) document.getElementById('notas').value = '';
        calcular();
    };

    calcular(); // Cálculo inicial
});



function agregarIdea() {
    const input = document.getElementById('nuevaIdeaInput');
    const texto = input.value.trim();

    if (texto === "") return; // No agregar si está vacío

    const lista = document.getElementById('listaIdeas');

    // Crear el elemento li con clases de Bootstrap
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeIn';

    // Contenedor para el texto (permite tachar al hacer clic)
    const spanTexto = document.createElement('span');
    spanTexto.textContent = texto;
    spanTexto.style.cursor = "pointer";
    spanTexto.onclick = function() {
        this.classList.toggle('text-decoration-line-through');
        this.classList.toggle('text-muted');
    };

    // Botón de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.innerHTML = '&times;'; // Es una "X"
    btnEliminar.className = 'btn btn-sm btn-danger rounded-pill';
    btnEliminar.onclick = function() {
        li.remove();
    };

    // Armar el item
    li.appendChild(spanTexto);
    li.appendChild(btnEliminar);
    lista.appendChild(li);

    // Limpiar input
    input.value = "";
    input.focus();
}


const btnCancelar = document.getElementById('btnAplicar');

// Cambiar estilo mediante JS
btnCancelar.style.backgroundColor = "#4a0000";
btnCancelar.style.borderColor = "#4a0000";
btnCancelar.style.color = "#ffffff";

// Ejemplo: Limpiar el formulario al hacer clic
btnCancelar.addEventListener('click', () => {
    const form = btnCancelar.closest('form');
    if (form) {
        form.reset();
        // Si usas la función actualizarEstilos de antes, llámala aquí:
        // actualizarEstilos(); 
    }
});