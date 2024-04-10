import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import './App.css';
import Login from './Login';
import Registration from './Registration'
import Home from './Home'
import Taskmanager from './Taskmanager'
import './Home.css';

function App() {
  return (
    <>

      <Router>
        <Routes>

          <Route
            exact
            path="/"
            element={<Registration />}
          />

          <Route
            exact
            path="/taskmanager"
            element={<Taskmanager />}
          />


          <Route
            path="/signup"
            element={<Registration />}
          />
          <Route
            path="/Home"
            element={<Home />}
          />


        </Routes>
      </Router>
    </>
  );
}

export default App;
