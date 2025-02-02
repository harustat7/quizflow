import React, { useState, useEffect } from 'react';
import Question from './question';
import Summary from './summary';

const apiUrl = "https://api.jsonserve.com/Uw5CrX";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setQuestions(data.questions))
      .catch(error => console.log("Error fetching quiz data:", error));
  }, []);

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers({ ...answers, [questionIndex]: selectedAnswer });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      {!isSubmitted ? (
        <>
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              index={index}
              onAnswerChange={handleAnswerChange}
            />
          ))}
          <button onClick={handleSubmit}>Submit Quiz</button>
        </>
      ) : (
        <Summary questions={questions} answers={answers} />
      )}
    </div>
  );
}

export default Quiz;
