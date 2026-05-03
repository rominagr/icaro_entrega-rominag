

 
document.querySelectorAll('a, button, .ilust-item, .grafico-card, .ux-project, .ndot').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('link'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('link'); });
});
 
/*  Progreso */
const pb = document.getElementById('progress');
window.addEventListener('scroll', () => {
  pb.style.width = (window.scrollY / (document.body.scrollHeight - innerHeight) * 100) + '%';
});
 
/*  Navbar */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 50));
 


/*  Nav dots */
const sections = ['#hero','#about','#ilustracion','#grafico','#tipografia','#uxui','#tareas','#galeria','#contacto','calculadora'];
const dots = document.querySelectorAll('.ndot');
 
function goTo(id){ document.querySelector(id).scrollIntoView({behavior:'smooth'}); }
 
const secObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const i = sections.indexOf('#'+e.target.id);
      dots.forEach((d,j) => d.classList.toggle('active', i===j));
    }
  });
},{threshold:.35});
sections.forEach(id => { const el=document.querySelector(id); if(el) secObs.observe(el); });
 
/*  Reveal */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revObs.unobserve(e.target); }});
},{threshold:.12});
document.querySelectorAll('.r, .rl, .rr').forEach(el => revObs.observe(el));
 
/* Hero inmediato */
document.querySelectorAll('#hero .r, #hero .rl, #hero .rr').forEach(el => el.classList.add('in'));
 
/*TASK BOARD */
let tasks = [
  { id: 1, text: 'Diseñar nueva identidad visual', done: false },
  { id: 2, text: 'Revisar wireframes del proyecto UX', done: false },
  { id: 3, text: 'Actualizar portfolio con últimas piezas', done: true },
  { id: 4, text: 'Preparar presentación para cliente', done: false },
];
let taskFilter = 'all';
let nextId = 5;
 
function renderTasks() {
  const list = document.getElementById('task-list');
  const visible = tasks.filter(t =>
    taskFilter === 'all'    ? true :
    taskFilter === 'done'   ? t.done :
    !t.done
  );
 
  if (visible.length === 0) {
    list.innerHTML = `<li class="task-empty">
      ${taskFilter==='done' ? 'Sin tareas completadas.' : taskFilter==='pending' ? 'Sin tareas pendientes.' : 'Agregá tu primera tarea.'}
    </li>`;
  } else {
    list.innerHTML = visible.map(t => `
      <li class="task-item ${t.done ? 'done' : ''}" data-id="${t.id}">
        <div class="task-check" onclick="toggleTask(${t.id})">
          <div class="task-check-inner"></div>
        </div>
        <span class="task-text">${escHtml(t.text)}</span>
        <button class="task-del" onclick="deleteTask(${t.id})" title="Eliminar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </li>`).join('');
  }
 
  const pending = tasks.filter(t => !t.done).length;
  document.getElementById('task-counter').textContent =
    pending === 0 ? 'Todo completado ✓' :
    pending === 1 ? '1 tarea pendiente' : `${pending} tareas pendientes`;
}
 
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
 
function addTask() {
  const inp = document.getElementById('task-input');
  const text = inp.value.trim();
  if (!text) { inp.focus(); return; }
  tasks.unshift({ id: nextId++, text, done: false });
  inp.value = '';
  inp.focus();
  renderTasks();
}
 
function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.done = !t.done;
  renderTasks();
}
 
function deleteTask(id) {
  const li = document.querySelector(`.task-item[data-id="${id}"]`);
  if (li) {
    li.style.transition = 'opacity .25s, transform .25s';
    li.style.opacity = '0'; li.style.transform = 'translateX(20px)';
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }, 250);
  }
}
 
function clearDone() {
  tasks = tasks.filter(t => !t.done);
  renderTasks();
}
 
function filterTasks(btn) {
  document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  taskFilter = btn.dataset.filter;
  renderTasks();
}
 
renderTasks();
 
/* Registrar tareas inactivas */
function refreshCursorTargets() {
  document.querySelectorAll('.task-check, .task-del, .tf-btn, .task-add-btn, .tf-clear').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('link'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('link'); });
  });
}
refreshCursorTargets();
const origRenderTasks = renderTasks;
 
/*GALERIA */

const galleryData = [
  { id: 1, title: 'Ilustracion Dualidad', category: 'Prints', img: 'pinpumpan.jpg' },
  { id: 2, title: 'Unicornios', category: 'Prints', img: 'foto4.jpg' },
  { id: 3, title: 'Concurso', category: 'Prints', img: 'foto3.jpg' },
  { id: 4, title: 'Merch', category: 'Merch', img: 'foto2.png' },
];

let currentIndex = 0;

function initGallery() {
  const thumbContainer = document.getElementById('gallery-thumbs');
  const mainInner = document.getElementById('gm-inner');
  
  if(!thumbContainer || !mainInner) return;

  // miniaturas 
  thumbContainer.innerHTML = galleryData.map((item, index) => `
    <div class="gthumb ${index === currentIndex ? 'active' : ''}" onclick="setGallery(${index})">
      <img src="${item.img}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">
    </div>
  `).join('');

  updateMainImage();
}

function updateMainImage() {
  const item = galleryData[currentIndex];
  const mainInner = document.getElementById('gm-inner');
  const caption = document.getElementById('gm-caption');
  const counter = document.getElementById('gal-counter');

  // Cambiamos el fondo por una etiqueta img para mejor control de proporciones
  mainInner.innerHTML = `
    <img src="${item.img}" 
         alt="${item.title}" 
         class="img-fluid w-100 h-100 object-fit-contain">
  `;
  
  caption.innerHTML = `<strong>${item.title}</strong> — ${item.category}`;
  counter.innerText = `${currentIndex + 1} / ${galleryData.length}`;

  document.querySelectorAll('.gthumb').forEach((t, i) => {
    t.classList.toggle('active', i === currentIndex);
  });
}

function galleryNav(dir) {
  currentIndex = (currentIndex + dir + galleryData.length) % galleryData.length;
  updateMainImage();
}

function setGallery(index) {
  currentIndex = index;
  updateMainImage();
}

// Ejecutar al cargar
window.onload = () => {
  initGallery();
  renderTasks(); // Mantener tu sistema de tareas
};


document.querySelectorAll('.gthumb, .gal-nav').forEach(el => {
  el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('link'); });
  el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('link'); });
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

        console.group("--- Cálculo de Presupuesto ---");
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

        // --- 2. CÁLCULO DE IMPUESTOS (IVA) ---
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