import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Taskmanager.css';

function Taskmanager() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    const title = taskInput.trim() !== '' ? taskInput : 'Task';
    const description = descriptionInput.trim() !== '' ? descriptionInput : 'Default Description';
    const newTask = {
      title: title,
      description: description
    };
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTaskInput('');
    setDescriptionInput('');
    setShowForm(false);
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTaskInput(taskToEdit.title);
    setDescriptionInput(taskToEdit.description);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Task Manager</h1>
        <button className="btn btn-primary btn-sm w-auto" onClick={() => setShowForm(true)}>
          Add New Task
        </button>
      </div>
      {showForm && (
        <div className="task-form">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter task title..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter task description..."
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-auto" onClick={handleAddTask}>
            {editIndex !== null ? 'Save' : 'Add Task'}
          </button>
        </div>
      )}
      {tasks.map((task, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title">{task.title}</h5>
              <p className="card-text">{task.description}</p>
            </div>

            <div className="d-flex align-items-center">
              <button className="btn btn-primary btn-sm me-2" style={{ width: '80px', height: '30px' }} onClick={() => handleEditTask(index)}>Edit</button>
              <button className="btn btn-danger btn-sm" style={{ width: '80px', height: '30px' }} onClick={() => handleDeleteTask(index)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Taskmanager;
