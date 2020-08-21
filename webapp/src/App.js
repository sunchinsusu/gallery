import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes'
import './App.scss'

const App=()=> {
  return (
    <Router>
      <Routes/>
    </Router>
  );
}

export default App;
