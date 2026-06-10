import { useState, useRef } from 'react';
import styles from './TaskBoard.module.css';

const INITIAL_TASKS = [
  { id: 1, text: 'Diseñar nueva identidad visual', done: false },
  { id: 2, text: 'Revisar wireframes del proyecto UX', done: false },
  { id: 3, text: 'Actualizar portfolio con últimas piezas', done: true },
  { id: 4, text: 'Preparar presentación para cliente', done: false },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('all');
  const [inputValue, setInputValue] = useState('');
  const [removingIds, setRemovingIds] = useState(new Set());
  const nextId = useRef(5);
  const inputRef = useRef(null);

  const visibleTasks = tasks.filter(t =>
    filter === 'all'     ? true :
    filter === 'done'    ? t.done :
    !t.done
  );

  const pendingCount = tasks.filter(t => !t.done).length;

  const counterText =
    pendingCount === 0 ? 'Todo completado ✓' :
    pendingCount === 1 ? '1 tarea pendiente' :
    `${pendingCount} tareas pendientes`;

  const emptyText =
    filter === 'done'    ? 'Sin tareas completadas.' :
    filter === 'pending' ? 'Sin tareas pendientes.' :
    'Agregá tu primera tarea.';

  function addTask() {
    const text = inputValue.trim();
    if (!text) { inputRef.current?.focus(); return; }
    setTasks(prev => [{ id: nextId.current++, text, done: false }, ...prev]);
    setInputValue('');
    inputRef.current?.focus();
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }

  function deleteTask(id) {
    setRemovingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
      setRemovingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 250);
  }

  function clearDone() {
    setTasks(prev => prev.filter(t => !t.done));
  }

  return (
    <div className={styles.tasksLayout}>

      {/* Input */}
      <div className={styles.taskInputWrap}>
        <input
          ref={inputRef}
          type="text"
          className={styles.taskInput}
          placeholder="Nueva tarea..."
          maxLength={80}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTask()}
        />
        <button className={styles.taskAddBtn} onClick={addTask} title="Agregar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Filtros */}
      <div className={styles.taskFilters}>
        {['all', 'pending', 'done'].map(f => (
          <button
            key={f}
            className={`${styles.tfBtn} ${filter === f ? styles.active : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
          </button>
        ))}
      </div>

      {/* Lista */}
      <ul className={styles.taskList}>
        {visibleTasks.length === 0 ? (
          <li className={styles.taskEmpty}>{emptyText}</li>
        ) : (
          visibleTasks.map(t => (
            <li
              key={t.id}
              className={`${styles.taskItem} ${t.done ? styles.done : ''} ${removingIds.has(t.id) ? styles.removing : ''}`}
            >
              <button
                className={styles.taskCheck}
                onClick={() => toggleTask(t.id)}
                aria-label={t.done ? 'Marcar como pendiente' : 'Marcar como completada'}
              >
                <div className={styles.taskCheckInner} />
              </button>
              <span className={styles.taskText}>{t.text}</span>
              <button
                className={styles.taskDel}
                onClick={() => deleteTask(t.id)}
                title="Eliminar"
                aria-label="Eliminar tarea"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Footer */}
      <div className={styles.taskFooter}>
        <span className={styles.taskCounter}>{counterText}</span>
        <button className={styles.tfClear} onClick={clearDone}>
          Limpiar completadas
        </button>
      </div>
    </div>
  );
}
