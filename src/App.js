import "./App.css";
import WelcomeMessage from "./WelcomeMessage"; // Import the new component
import React, { useState, useEffect } from "react";
import StatusMessage from "./StatusMessage"; // Import the new component

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  // Define a state variable 'count' and a function 'setCount' to update it
  const [count, setCount] = useState(0);
  const [timerId, setTimerId] = useState(null); // State to store timer ID
  const [message, setMessage] = useState(""); // Adding state for message
  const [inputValue, setInputValue] = useState(""); // State to store input value
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const [isOnline, setIsOnline] = useState(true); // State to control online status

  const [users, setUsers] = useState(["Alice", "Bob", "Charlie", "Dave"]); // State for users list
  const [newUser, setNewUser] = useState(""); // State for new user input

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  // Set up a timer to increment count every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    setTimerId(timer); // Save the timer ID

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Function to stop the timer
  const stopTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null); // Clear the timer ID from state
    }
  };

  // Function to handle the button click event
  const handleClick = () => {
    setCount(count + 1);
    setMessage("You clicked the button!");
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Toggle visibility when button is clicked
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleNewUserChange = (event) => {
    setNewUser(event.target.value); // Update newUser with input
  };

  const addUser = () => {
    if (newUser) {
      setUsers([...users, newUser]); // Add new user to the list
      setNewUser(""); // Clear the input field
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      console.log(`Name: ${name}, Email: ${email}`);
    } else {
      setErrors(formErrors);
      setSubmitted(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/about/John">About John</Link>
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/:name" element={<About />} />{" "}
              {/* Route with dynamic parameter */}
            </Routes>
          </div>
          <h1>Welcome to my First React App!</h1>
          <p>This is a simple React project.</p>
          {/* Using the WelcomeMessage component and passing a prop */}
          <WelcomeMessage message="This is a dynamic message passed as a prop!" />
          {/* Display the current count */}
          <p>Button clicked {count} times</p>
          {/* Button to handle the click event */}
          <button onClick={handleClick}>Click me</button>
          <button onClick={stopTimer}>Stop Timer</button>{" "}
          {/* Button to stop the timer */}
          {/* Display the message when the button is clicked */}
          {message && <p>{message}</p>}
          {/* Input field to capture user input */}
          <input
            type="text"
            placeholder="Type something..."
            onChange={handleInputChange} // Event handler for input change
          />
          {/* Display the user input dynamically */}
          <p>You typed: {inputValue}</p>
          {/* Button to toggle visibility */}
          <button onClick={toggleVisibility}>
            {isVisible ? "Hide" : "Show"} Message
          </button>
          {/* Conditionally rendering a message */}
          {isVisible && <p>This message is conditionally rendered!</p>}
          {/* Toggle online status */}
          <button onClick={toggleOnlineStatus}>
            {isOnline ? "Go Offline" : "Go Online"}
          </button>
          {/* Conditionally render the status message */}
          <StatusMessage isOnline={isOnline} />
          {/* Rendering a list of users */}
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
          {/* Input field to add a new user */}
          <input
            type="text"
            placeholder="Add new user"
            value={newUser}
            onChange={handleNewUserChange}
          />
          <button onClick={addUser}>Add User</button>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            <button type="submit">Submit</button>
          </form>
          {submitted && (
            <p>
              Form submitted! Name: {name}, Email: {email}
            </p>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
