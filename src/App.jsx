import { useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  function addTask(event) {
    event.preventDefault();
    const title = text.trim();
    if (!title) return;
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false }]);
    setText('');
  }

  return (
    <main>
      <h1>Ma todo list 2</h1>
      <form onSubmit={addTask}>
        <label htmlFor="task">Nouvelle tâche</label>
        <div className="entry">
          <input id="task" value={text} onChange={(event) => setText(event.target.value)} />
          <button type="submit">Ajouter</button>
        </div>
      </form>
      <p aria-live="polite">{tasks.filter((task) => !task.done).length} tâche(s) restante(s)</p>
      {tasks.length === 0 && <p>Aucune tâche pour le moment.</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label className={task.done ? 'done' : ''}>
              <input type="checkbox" checked={task.done} onChange={() => setTasks(tasks.map((item) => item.id === task.id ? { ...item, done: !item.done } : item))} />
              {task.title}
            </label>
            <button type="button" aria-label={`Supprimer ${task.title}`} onClick={() => setTasks(tasks.filter((item) => item.id !== task.id))}>Supprimer</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
