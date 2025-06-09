import  { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import './App.css';

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

 const addOrUpdateTask = (e) => {
  e.preventDefault();
  const trimmedTask = newTask.trim(); // ✅ removes only leading & trailing spaces

  if (trimmedTask === '') return;

  if (editIndex !== null) {
    const updated = [...tasks];
    updated[editIndex] = trimmedTask;
    setTasks(updated);
    setEditIndex(null);
  } else {
    setTasks([...tasks, trimmedTask]);
  }

  setNewTask('');
};
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <form onSubmit={addOrUpdateTask} className="input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task"
          className="input"
        />
        <button type="submit" className="add">
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </form>
      <div className="table-main">
      {tasks.length > 0 && (
      <table className='todo'>
        <thead>
          <tr>
            <th >Task</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr>
              <td>{task}</td>
              <td className='button'>
                <button onClick={() => handleDelete(index)} style={{ background: 'none', border: 'none' }}>
                  <MdDeleteForever style={{ color: 'red', fontSize: '20px' }} /></button>
                <button onClick={() => handleEdit(index)} style={{ background: 'none', border: 'none'}}>
                  <TiEdit style={{ color: 'blue', fontSize: '20px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
      </div>
    </div>
  );
}

export default TodoApp;
