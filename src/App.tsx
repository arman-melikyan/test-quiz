
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './components/Quiz';
import Results from './components/Results';
import questions from './components/Questions';


const App: React.FC = () => {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz questions={questions} />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
