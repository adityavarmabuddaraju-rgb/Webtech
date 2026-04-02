import { useState } from 'react'

function App() {
  // 1. Manage form input fields using the useState Hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  // 2. Capture user input changes using the onChange event handler
  const handleChange = (e) => {
    const { name, value } = e.target
    // Bind input field values to state variables using controlled components
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))

    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  // 3. Validate input fields using conditional logic
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // 4. Handle form submission using the onSubmit event
  const handleSubmit = (e) => {
    // Prevent form submission if validation fails using preventDefault
    e.preventDefault()

    if (validate()) {
      console.log('Form Submitted Successfully:', formData)
      setIsSubmitted(true)
      
      // 5. Reset form fields after successful submission using useState
      setFormData({
        name: '',
        email: '',
        password: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
    }
  }

  return (
    <div className="form-wrapper">
      <div className="form-card">
        <div className="form-header">
          <h1>User Registration</h1>
          <p>Please fill in your details to create an account.</p>
        </div>

        {isSubmitted && (
          <div className="success-banner">
            Registration successful! Welcome aboard.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={`input-group ${errors.name ? 'has-error' : ''}`}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
            />
            {/* Display validation error messages dynamically using conditional rendering */}
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className={`input-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. name@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
