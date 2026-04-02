import { useState } from 'react'

function TaskInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text)
      setText('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button onClick={handleAdd} className="add-button">
        Add
      </button>
    </div>
  )
}

export default TaskInput
