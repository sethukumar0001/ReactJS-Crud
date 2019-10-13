import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import AddData from "./components/addData";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <AddData />
      </div>
    </Router>
  );
}

export default App;