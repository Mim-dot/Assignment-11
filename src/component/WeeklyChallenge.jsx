import React, { useState } from "react";

const quizQuestions = [
  {
    question: "What is the capital of Bangladesh?",
    options: ["Dhaka", "Chittagong", "Sylhet", "Khulna"],
    correctAnswer: "Dhaka",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "NaCl", "CO2"],
    correctAnswer: "H2O",
  },
  {
    question: "Which language is primarily used for web development?",
    options: ["Python", "C++", "HTML", "Java"],
    correctAnswer: "HTML",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Jane Austen"],
    correctAnswer: "William Shakespeare",
  },
];

function WeeklyChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quizQuestions[currentIndex];

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelected(option);
      setIsAnswered(true);

      if (option === currentQuestion.correctAnswer) {
        setScore(score + 1);
        setTimeout(() => {
          if (currentIndex + 1 < quizQuestions.length) {
            setCurrentIndex(currentIndex + 1);
            setSelected(null);
            setIsAnswered(false);
          } else {
            setShowResult(true);
          }
        }, 1000); 
      }
    }
  };

  const handleNextClick = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  return (
    <section className="weekly-challenge my-8 p-6 max-w-xl mx-auto bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">🧠 Weekly Challenge</h2>

      {showResult ? (
        <div className=" text-center text-xl font-semibold text-green-600">
          🎉 You completed the quiz! <br />✅ Score: {score}/{quizQuestions.length}
        </div>
      ) : (
        <>
          <p className="weekly-challenge-p text-lg font-medium mb-4 text-gray-800">{currentQuestion.question}</p>

          <div className="grid gap-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`w-full p-3 rounded-lg border text-left font-medium transition-all duration-200 ${
                  isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? "bg-green-200 border-green-600 text-green-800"
                      : option === selected
                      ? "bg-red-200 border-red-600 text-red-800"
                      : "bg-gray-100 border-gray-300"
                    : "bg-white border-gray-300 hover:bg-blue-100"
                }`}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>

          {isAnswered && selected !== currentQuestion.correctAnswer && (
            <div className="mt-4 text-md font-medium text-red-600">
              ❌ Incorrect! Correct Answer: <span className="font-bold">{currentQuestion.correctAnswer}</span>
            </div>
          )}

          {isAnswered && selected !== currentQuestion.correctAnswer && (
            <button
              onClick={handleNextClick}
              className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Next Question
            </button>
          )}
        </>
      )}
    </section>
  );
}

export default WeeklyChallenge;
