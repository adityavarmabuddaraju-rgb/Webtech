import { useState } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

function App() {
  // Store multiple items in a state variable using the useState Hook (array state)
  const [tasks, setTasks] = useState([])

  // Add new items to the list through user input using state update with useState
  const addTask = (name) => {
    const newTask = {
      id: Date.now(), // Unique identifier
      name: name
    }
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  // Remove items from the list using event handling (onClick)
  const removeTask = (id) => {
    // Update the list dynamically after remove operations using state re-rendering
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  return (
    <div className="container">
      <div className="app-card">
        <header className="header">
          <h1>Dynamic List Manager</h1>
          <p>Lab 10 Exercise 2: List Rendering & Key Management</p>
        </header>

        {/* Maintain separation between input logic and display logic */}
        <TaskInput onAdd={addTask} />
        
        <TaskList tasks={tasks} onRemove={removeTask} />

        <div className="status-bar">
          <span>Items: {tasks.length}</span>
        </div>
      </div>
    </div>
  )
}

export default App
