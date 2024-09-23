import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Board from './components/Board';
import TaskContent from './components/TaskContent';
import Header from './components/Header';

function App() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Fetch and format the current date
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header currentDate={currentDate} />
          <Routes>
            <Route path="/" element={<Navigate to="/boards" />} />
            <Route path="/boards" element={<Board />} />
            <Route path="/task/:id" element={<TaskContent />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
