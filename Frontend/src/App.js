import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Landing from './pages/Landing'
import Home from './Home';
import Settings from './pages/Settings';
import Login from './pages/Login'
import Database from './pages/Database';
import Query from './pages/Query';
import BareActs from './pages/BareActs';
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/settings" element={<Settings />} />
          <Route path="/home/login" element={<Login />} />
          <Route path="/home/database" element={<Database />} />
          <Route path="/home/query" element={<Query />} />
          <Route path="/bareacts" element={<BareActs />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
