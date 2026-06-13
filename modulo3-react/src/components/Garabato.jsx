import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Garabato.module.css';

export default function Garabato() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const [isEmpty, setIsEmpty] = useState(true);
  const [brushSize, setBrushSize] = useState(2);
  const [color, setColor] = useState('rgba(245,245,240,0.85)');

  const COLORS = [
    { label: 'Blanco', value: 'rgb(0, 0, 0)' },
    { label: 'Rojo',   value: 'rgba(220,80,60,0.9)' },
    { label: 'Cyan',   value: 'rgba(24, 126, 194, 0.9)' },
    { label: 'Oro',    value: 'rgba(220,180,80,0.9)' },
  ];

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    isDrawing.current = true;
    lastPos.current = getPos(e, canvas);
  }, []);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);

    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastPos.current = pos;
    setIsEmpty(false);
  }, [color, brushSize]);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'garabato.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);
    return () => {
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDraw);
    };
  }, [startDraw, draw, stopDraw]);

  return (
    <div className={styles.garabatoWrap}>
      <div className={styles.postit}>

        {/* Header */}
        <div className={styles.postitHeader}>
          <div className={styles.postitPin} aria-hidden="true" />
          <p className={styles.postitTitle}>Dejame tu garabato aquí</p>
          <p className={styles.postitSub}>mouse · touch · lo que sea</p>
        </div>

        {/* Canvas */}
        <div className={styles.canvasWrap}>
          <canvas
            ref={canvasRef}
            width={800}
            height={440}
            className={styles.canvas}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
          />
          {isEmpty && (
            <div className={styles.canvasHint} aria-hidden="true">
              <span>✏</span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.colorPicker}>
            {COLORS.map(c => (
              <button
                key={c.value}
                className={`${styles.colorBtn} ${color === c.value ? styles.colorActive : ''}`}
                style={{ background: c.value }}
                onClick={() => setColor(c.value)}
                aria-label={c.label}
                title={c.label}
              />
            ))}
          </div>

          <div className={styles.brushWrap}>
            {[1, 2, 4, 8].map(s => (
              <button
                key={s}
                className={`${styles.brushBtn} ${brushSize === s ? styles.brushActive : ''}`}
                onClick={() => setBrushSize(s)}
                aria-label={`Trazo ${s}px`}
                title={`Trazo ${s}px`}
              >
                <span
                  className={styles.brushDot}
                  style={{ width: s * 2 + 4, height: s * 2 + 4 }}
                />
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className={styles.actionBtn}
              onClick={clearCanvas}
              disabled={isEmpty}
              title="Limpiar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Limpiar
            </button>
            <button
              className={styles.actionBtn}
              onClick={saveCanvas}
              disabled={isEmpty}
              title="Guardar"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Guardar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
