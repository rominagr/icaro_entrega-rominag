// Tareas.jsx
import styles from './Tareas.module.css';
import TaskBoard from '../components/TaskBoard';

const Tareas = () => {
  return (
    <section id="tareas" className={styles.container}>
      <div className="section-num">05</div>
      <h2 className="big-title r rd1">Task<em>board</em></h2>

      <div className={`${styles.tareasLayout} r rd2`}>
        <TaskBoard />
      </div>
    </section>
  );
};

export default Tareas;