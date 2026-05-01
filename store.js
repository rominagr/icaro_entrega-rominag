document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        // Alterna la clase 'toggled' en el div principal
        wrapper.classList.toggle('toggled');
    });
});

/* ═══════════════════════════════════════════════════
   L'Atelier d'Art — main.js
   Commission Calculator · Lógica de UI
   ═══════════════════════════════════════════════════ */

/* ─── Estado global ─────────────────────────────── */
const state = {
  stylePrice:   120,
  styleName:    'Ilustración a Color',
  bgPrice:      45,
  bgName:       'Fondo Detallado',
  subjectCount: 1,
  subjectPrice: 0,
  dimPrice:     0,
  dimName:      'Formato A4 Digital',
  delivery:     'digital'
};

const SUB_PRICE = 25; // precio por sujeto adicional

/* ─── Helpers ───────────────────────────────────── */
function calcTotal() {
  return state.stylePrice + state.bgPrice + state.subjectPrice + state.dimPrice;
}

function fmt(n) {
  return '$' + n.toFixed(2);
}

/* ─── Actualizar UI ─────────────────────────────── */
function updateUI() {
  const total = calcTotal();

  // Totales
  document.getElementById('est-display').textContent   = fmt(total);
  document.getElementById('total-display').textContent = fmt(total);

  // Filas del resumen
  const rows = [
    { label: state.styleName,  price: state.stylePrice },
    { label: `Sujeto adicional (${Math.max(0, state.subjectCount - 1)})`, price: state.subjectPrice },
    { label: state.bgName,     price: state.bgPrice },
    { label: state.dimName,    price: state.dimPrice },
  ];

  document.getElementById('budget-rows').innerHTML = rows
    .map(r => `
      <div class="budget-row">
        <span>${r.label}</span>
        <span>${fmt(r.price)}</span>
      </div>`)
    .join('');
}

/* ─── Estilo visual ─────────────────────────────── */
function selectStyle(el) {
  document.querySelectorAll('.style-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.stylePrice = parseInt(el.dataset.price);
  state.styleName  = el.dataset.style === 'color'
    ? 'Ilustración a Color'
    : 'Ilustración Noir & White';
  updateUI();
}

/* ─── Método de entrega ─────────────────────────── */
function toggleDelivery(btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.delivery = btn.dataset.delivery;
  const section = document.getElementById('physical-delivery-section');
  section.style.display = state.delivery === 'physical' ? 'block' : 'none';
}

/* ─── Fondo detallado ───────────────────────────── */
function toggleBg(val) {
  const yes = document.getElementById('bg-yes');
  const no  = document.getElementById('bg-no');
  if (val === 'yes') {
    yes.classList.add('active');
    no.classList.remove('active');
    state.bgPrice = 45;
    state.bgName  = 'Fondo Detallado';
  } else {
    no.classList.add('active');
    yes.classList.remove('active');
    state.bgPrice = 0;
    state.bgName  = 'Sin Fondo';
  }
  updateUI();
}

/* ─── Contador de sujetos ───────────────────────── */
function changeCount(delta) {
  state.subjectCount = Math.max(1, Math.min(9, state.subjectCount + delta));
  document.getElementById('cnt-display').textContent =
    String(state.subjectCount).padStart(2, '0');
  state.subjectPrice = Math.max(0, state.subjectCount - 1) * SUB_PRICE;
  updateUI();
}

/* ─── Dimensiones ───────────────────────────────── */
function selectDim(el) {
  document.querySelectorAll('.dim-option').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
  state.dimPrice = parseInt(el.dataset.price);
  const names = {
    a5: 'Formato A5 Digital',
    a4: 'Formato A4 Digital',
    a3: 'Formato A3 / Poster'
  };
  state.dimName = names[el.dataset.dim];
  updateUI();
}

/* ─── Envío físico ──────────────────────────────── */
function selectShipping(el) {
  document.querySelectorAll('.delivery-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ─── Archivos ──────────────────────────────────── */
function handleFiles(input) {
  const names = Array.from(input.files).map(f => f.name).join(', ');
  document.getElementById('file-list').textContent = names ? '📎 ' + names : '';
}

/* ─── Aplicar selecciones ───────────────────────── */
function applySelections() {
  const btn = document.querySelector('.btn-apply');
  btn.textContent = '✓ Applied';
  btn.style.background = 'var(--primary)';
  setTimeout(() => {
    btn.innerHTML = `Apply Selections
      <span class="material-symbols-outlined"
        style="font-size:1rem;font-family:'Material Symbols Outlined'">arrow_right_alt</span>`;
    btn.style.background = '';
  }, 1800);
  document.querySelector('.budget-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Solicitar comisión ────────────────────────── */
function submitCommission() {
  alert('¡Solicitud enviada! Nos pondremos en contacto pronto.');
}

/* ─── Formulario de consulta ────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-submit-art');
  btn.textContent = '✓ Inquiry Sent';
  btn.style.background = 'var(--primary)';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Submit Inquiry';
    btn.style.background = '';
    btn.style.color = '';
  }, 2500);
}

/* ─── Init ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', updateUI);