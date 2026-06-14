import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Calculadora.module.css';

const CONFIG = {
  baseComision: 600,
  ivaUruguay: 0.22,
  estiloTecnica: {
    bn:    { tradicional: 300, digital: 200 },
    color: { tradicional: 500, digital: 400 },
  },
  tamanos:        { a5: 0, a4: 100, a3: 300 },
  envioImpresion: { a5: 50, a4: 100, a3: 200 },
  precioPersonajeExtra: 100,
  precioFondo: 300,
};

const DIMS = [
  { value: 'a5', label: 'A5', sub: '14.8×21', w: 42, h: 60 },
  { value: 'a4', label: 'A4', sub: '21×29.7', w: 56, h: 80 },
  { value: 'a3', label: 'A3', sub: '29.7×42', w: 70, h: 100 },
];

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(245,245,240,.15)',
  padding: '.5rem 0',
  color: 'rgba(245,245,240,.8)',
  fontSize: '.85rem',
  outline: 'none',
};

export default function Calculadora() {
  const fileRef = useRef();
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      estilo:     'color',
      tecnica:    'tradicional',
      tamano:     'a5',
      metodo:     'digital',
      fondo:      'sin',
      personajes: 1,
      notas:      '',
      nombre:     '',
      email:      '',
    },
  });

  const { estilo, tecnica, tamano, metodo, fondo, personajes } = watch();

  // ── Cálculo ──────────────────────────────────────────────
  let subtotal = CONFIG.baseComision;
  const lineas = [{ label: 'Base de la comisión', valor: CONFIG.baseComision }];

  const valorEstilo = CONFIG.estiloTecnica[estilo]?.[tecnica] ?? 0;
  subtotal += valorEstilo;
  lineas.push({ label: `${estilo === 'color' ? 'Full Color' : 'B&N'} — ${tecnica}`, valor: valorEstilo });

  if (fondo === 'con') {
    subtotal += CONFIG.precioFondo;
    lineas.push({ label: 'Fondo complejo', valor: CONFIG.precioFondo });
  }

  const valorTamano = CONFIG.tamanos[tamano] ?? 0;
  if (valorTamano > 0) {
    subtotal += valorTamano;
    lineas.push({ label: `Tamaño ${tamano?.toUpperCase()}`, valor: valorTamano });
  }

  const extras = (personajes ?? 1) - 1;
  if (extras > 0) {
    const v = extras * CONFIG.precioPersonajeExtra;
    subtotal += v;
    lineas.push({ label: `${extras} personaje(s) extra`, valor: v });
  }

  if (metodo === 'envio') {
    const v = CONFIG.envioImpresion[tamano] ?? 0;
    subtotal += v;
    lineas.push({ label: `Envío + impresión ${tamano?.toUpperCase()}`, valor: v });
  }

  const iva   = subtotal * CONFIG.ivaUruguay;
  const total = subtotal + iva;

  function onSubmit(data) {
    console.log('Comisión solicitada:', { ...data, archivos: files, total });
    setSubmitted(true);
  }

  function handleReset() {
    reset();
    setFiles([]);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className={styles.wrap} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
        <p className={styles.summaryTitle} style={{ fontSize: '1rem' }}>¡Solicitud enviada!</p>
        <p style={{ color: 'rgba(245,245,240,0.6)', marginBottom: '2rem' }}>
          Te voy a responder a la brevedad con los detalles de tu comisión.
        </p>
        <button className={styles.resetBtn} style={{ maxWidth: 200 }} onClick={handleReset}>
          Nueva consulta
        </button>
      </div>
    );
  }

  return (
    <form className={styles.wrap} onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* ── COLUMNA IZQ ── */}
      <div>

        {/* Estilo visual */}
        <div className={styles.group}>
          <span className={styles.label}>Estilo visual</span>
          <div className={styles.radioGrid}>
            {[
              { value: 'color', label: 'Full Color' },
              { value: 'bn',    label: 'Blanco & Negro' },
            ].map(op => (
              <label
                key={op.value}
                className={`${styles.radioCard} ${estilo === op.value ? styles.active : ''}`}
              >
                <input type="radio" value={op.value} {...register('estilo')} />
                <span>{op.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Técnica */}
        <div className={styles.group}>
          <span className={styles.label}>Técnica</span>
          <div className={styles.radioGrid}>
            {[
              { value: 'tradicional', label: 'Acuarela / Tradicional' },
              { value: 'digital',     label: 'Digital' },
            ].map(op => (
              <label
                key={op.value}
                className={`${styles.radioCard} ${tecnica === op.value ? styles.active : ''}`}
              >
                <input type="radio" value={op.value} {...register('tecnica')} />
                <span>{op.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Fondo */}
        <div className={styles.group}>
          <span className={styles.label}>Fondo de la obra</span>
          <div className={styles.radioGrid}>
            {[
              { value: 'sin', label: 'Simple' },
              { value: 'con', label: 'Complejo' },
            ].map(op => (
              <label
                key={op.value}
                className={`${styles.radioCard} ${fondo === op.value ? styles.active : ''}`}
              >
                <input type="radio" value={op.value} {...register('fondo')} />
                <span>{op.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dimensiones */}
        <div className={styles.group}>
          <span className={styles.label}>Dimensiones</span>
          <div className={styles.radioGrid3}>
            {DIMS.map(d => (
              <label
                key={d.value}
                className={`${styles.radioCard} ${tamano === d.value ? styles.active : ''}`}
              >
                <input type="radio" value={d.value} {...register('tamano')} />
                <span>{d.label}</span>
                <small>{d.sub} cm</small>
              </label>
            ))}
          </div>
        </div>

        {/* Personajes */}
        <div className={styles.group}>
          <span className={styles.label}>Cantidad de personajes</span>
          <div className={styles.counter}>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => setValue('personajes', Math.max(1, personajes - 1))}
            >−</button>
            <span className={styles.counterNum}>
              {String(personajes ?? 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              className={styles.counterBtn}
              onClick={() => setValue('personajes', (personajes ?? 1) + 1)}
            >+</button>
            <input type="hidden" {...register('personajes')} />
          </div>
        </div>

        {/* Método de entrega */}
        <div className={styles.group}>
          <span className={styles.label}>Método de entrega</span>
          <div className={styles.radioGrid}>
            {[
              { value: 'digital', label: 'Solo digital' },
              { value: 'envio',   label: 'Envío + impresión' },
            ].map(op => (
              <label
                key={op.value}
                className={`${styles.radioCard} ${metodo === op.value ? styles.active : ''}`}
              >
                <input type="radio" value={op.value} {...register('metodo')} />
                <span>{op.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Datos de contacto */}
        <div className={styles.group}>
          <span className={styles.label}>Tus datos</span>
          <div className={styles.radioGrid}>
            <div>
              <input
                style={inputStyle}
                placeholder="Tu nombre"
                {...register('nombre', { required: 'Requerido' })}
              />
              {errors.nombre && (
                <small style={{ color: '#ff6b6b' }}>{errors.nombre.message}</small>
              )}
            </div>
            <div>
              <input
                type="email"
                style={inputStyle}
                placeholder="tu@email.com"
                {...register('email', { required: 'Requerido' })}
              />
              {errors.email && (
                <small style={{ color: '#ff6b6b' }}>{errors.email.message}</small>
              )}
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className={styles.group}>
          <span className={styles.label}>Notas adicionales</span>
          <textarea
            className={styles.textarea}
            rows={3}
            placeholder="Describí detalles específicos..."
            {...register('notas')}
          />
        </div>

        {/* Upload */}
        <div className={styles.group}>
          <span className={styles.label}>Subir referencia</span>
          <div className={styles.uploadZone} onClick={() => fileRef.current.click()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span>Arrastrá o hacé clic para subir</span>
            <small>Imágenes o PDF — máx. 5 MB</small>
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf"
              multiple
              style={{ display: 'none' }}
              onChange={e => setFiles(Array.from(e.target.files))}
            />
          </div>
          {files.length > 0 && (
            <p className={styles.hint}>{files.map(f => f.name).join(', ')}</p>
          )}
        </div>

      </div>

      {/* ── COLUMNA DER: Resumen ── */}
      <div className={styles.summary}>
        <p className={styles.summaryTitle}>Resumen de cotización</p>

        <ul className={styles.lineList}>
          {lineas.map((l, i) => (
            <li key={i} className={styles.lineItem}>
              <span>{l.label}</span>
              <span>${l.valor}</span>
            </li>
          ))}
        </ul>

        <div className={styles.divider} />

        <div className={styles.subRow}>
          <span>IVA (22%)</span>
          <span>${iva.toFixed(2)}</span>
        </div>

        <div className={styles.totalRow}>
          <span>Total estimado</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          className={styles.resetBtn}
          style={{ marginBottom: '1rem', background: 'rgba(245,245,240,0.1)', color: '#fff', borderColor: 'rgba(245,245,240,0.4)' }}
        >
          Solicitar comisión
        </button>
        <button type="button" className={styles.resetBtn} onClick={handleReset}>
          Reiniciar valores
        </button>
      </div>

    </form>
  );
}
