import React from 'react';

function Summary({ questions, answers }) {
  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return question.correctAnswer === answers[index] ? score + 1 : score;
    }, 0);
  };

  const score = calculateScore();

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>You scored {score} out of {questions.length}.</p>
    </div>
  );
}

export default Summary;
