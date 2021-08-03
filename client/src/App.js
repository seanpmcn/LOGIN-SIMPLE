import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="registration">
        <h1>Regristration</h1>
        <label>Username</label>
        <input type="text" />
        <label>Password</label>
        <input type="text" />
        <button> Register </button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." />
        <input type="text" placeholder="Password..." />
        <button> Log in </button>
      </div>
    </div>
  );
}

export default App;
