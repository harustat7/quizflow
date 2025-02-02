import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
      <Link to="/quiz" className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg">
        Start Quiz
      </Link>
    </div>
  );
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        window.location.href = "/results?score=" + score;
      }
    }, 1000);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
      <div className="flex flex-col gap-2">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`px-6 py-3 rounded-lg text-lg border ${selectedAnswer === option ? "bg-blue-500 text-white" : "bg-white"}`}
            onClick={() => handleAnswerClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

const Results = () => {
  const params = new URLSearchParams(window.location.search);
  const score = params.get("score");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>
      <p className="text-lg mt-4">Your Score: {score}</p>
      <Link to="/" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg">
        Play Again
      </Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
