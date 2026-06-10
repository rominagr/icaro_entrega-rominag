import React, { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore'; 
import { useForm } from '../hooks/useForm';           
import CustomTitle from '../components/CustomTitle';  
import Garabato from '../components/Garabato';        
import styles from './Tareas.module.css';

const Tareas = () => {
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTaskStore();
  const taskInput = useForm('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.value.trim()) return;
    addTask(taskInput.value.trim());
    taskInput.reset();
  };

return (
    <section id="tareasYgarabatos" className={styles.container}>
      
      
      <div className={styles.titleWrapper}>
        <CustomTitle>
          Ta<em>rea</em>s <em>y</em> Ga<em>ra</em>bat<em></em>os
        </CustomTitle>
      </div>

      
      <div className={styles.flexWorkspace}>
        
        
        <div className={styles.tareasLayout}>
          <form onSubmit={handleSubmit} className={styles.taskInputWrap}>
            <input
              type="text"
              className={styles.taskInput}
              placeholder="Añadir una nueva tarea para el portfolio..."
              value={taskInput.value}
              onChange={taskInput.onChange}
            />
            <button type="submit" className={styles.taskAddBtn}>+</button>
          </form>

          <ul className={styles.taskList}>
            {tasks.map((task) => (
              <li key={task.id} className={`${styles.taskItem} ${task.done ? styles.done : ''}`}>
                <div className={styles.taskCheck} onClick={() => toggleTask(task.id)}>
                  <div className={styles.taskCheckInner} />
                </div>
                <span className={styles.taskText}>{task.text}</span>
                <button className={styles.taskDel} onClick={() => deleteTask(task.id)}>✕</button>
              </li>
            ))}
          </ul>

          <div className={styles.taskFooter}>
            <span className={styles.taskCounter}>
              {tasks.filter(t => !t.done).length} pendientes
            </span>
            <button className={styles.tfClear} onClick={clearCompleted}>
              Limpiar completadas
            </button>
          </div>
        </div>

        
        <div className={styles.garabatoSectionWrap}>
          <Garabato />
        </div>

      </div> 

    </section>
  );

}

export default Tareas;