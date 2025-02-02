import React from 'react';

function Question({ question, index, onAnswerChange }) {
  return (
    <div>
      <h3>{question.question}</h3>
      <div>
        {question.answers.map((answer, i) => (
          <label key={i}>
            <input
              type="radio"
              name={`question${index}`}
              value={answer}
              onChange={() => onAnswerChange(index, answer)}
            />
            {answer}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;
