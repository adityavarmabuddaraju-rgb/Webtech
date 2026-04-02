function TaskList({ tasks, onRemove }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-message">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list-wrapper">
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-name">{task.name}</span>
            <button
              onClick={() => onRemove(task.id)}
              className="remove-button"
              aria-label="Remove item"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
