import { useState } from 'react'
import { useState } from 'react'

function App() {
  // Functional component using useState Hook
  // Initialize with default numeric value 0
  const [count, setCount] = useState(0)

  // Event handler for increment
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  }

  // Event handler for decrement
  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1)
  }

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h1 className="title">Simple Counter</h1>
        
        <div className="display-section">
          {/* Dynamically display the current counter value */}
          <span className="counter-value">{count}</span>
        </div>

        <div className="button-group">
          {/* Decrement button using onClick event */}
          <button 
            className="btn btn-decrement" 
            onClick={handleDecrement}
            aria-label="Decrease count"
          >
            -
          </button>
          
          {/* Increment button using onClick event */}
          <button 
            className="btn btn-increment" 
            onClick={handleIncrement}
            aria-label="Increase count"
          >
            +
          </button>
        </div>

        <div className="info-text">
          <p>Interactive single-page interface with automatic re-rendering.</p>
        </div>
      </div>
    </div>
  )
}

export default App
