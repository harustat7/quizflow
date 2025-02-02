import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuizPage from './pages/quizpage';
import Results from './pages/Results';
import './index.css';
import './tailwind.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;

