import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  // 1. Estado inicial (la lista de tareas)
  tasks: [
    { id: 1, text: 'Diseñar la sección de Ilustración', done: false },
    { id: 2, text: 'Ajustar los títulos responsive', done: true },
  ],

  // 2. Acciones para modificar el estado desde cualquier parte de la app
  addTask: (text) => set((state) => ({
    tasks: [...state.tasks, { id: Date.now(), text, done: false }]
  })),

  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    )
  })),

  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  clearCompleted: () => set((state) => ({
    tasks: state.tasks.filter((task) => !task.done)
  }))
}));