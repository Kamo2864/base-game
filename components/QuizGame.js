import React, { useState } from 'react';

const questions = {
  easy: [
    {
      question: "What is Base?",
      options: ["A cryptocurrency", "An Ethereum Layer 2 solution", "A Web3 browser", "A blockchain game"],
      correctAnswer: 1
    },
    {
      question: "Which company developed Base?",
      options: ["Binance", "Coinbase", "Ethereum Foundation", "Polygon"],
      correctAnswer: 1
    },
    {
      question: "What is the main purpose of Base?",
      options: ["To replace Ethereum", "To improve Ethereum's scalability", "To create a new cryptocurrency", "To build decentralized applications"],
      correctAnswer: 1
    }
  ],
  medium: [
    {
      question: "What is the relationship between Base and OP Stack?",
      options: ["Base is built on OP Stack", "OP Stack is built on Base", "They are competitors", "They are unrelated technologies"],
      correctAnswer: 0
    },
    {
      question: "How does Base achieve faster transaction speeds compared to Ethereum mainnet?",
      options: ["By using a different consensus mechanism", "By processing transactions off-chain and batching them", "By having fewer validators", "By using a faster programming language"],
      correctAnswer: 1
    },
    {
      question: "What is a 'sequencer' in the context of Base?",
      options: ["A type of smart contract", "An entity that orders and executes transactions", "A consensus algorithm", "A type of token"],
      correctAnswer: 1
    }
  ],
  hard: [
    {
      question: "What is the fraud proof window for Base?",
      options: ["1 day", "3 days", "7 days", "14 days"],
      correctAnswer: 2
    },
    {
      question: "How does Base handle state roots?",
      options: ["It doesn't use state roots", "It posts them directly to Ethereum", "It uses a merkle tree structure", "It uses a unique Base-specific data structure"],
      correctAnswer: 2
    },
    {
      question: "What is the role of the canonical transaction chain in Base's architecture?",
      options: ["To store all transaction data", "To order transactions", "To execute smart contracts", "To bridge assets between chains"],
      correctAnswer: 1
    }
  ]
};

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestions, setCurrentQuestions] = useState(questions.easy);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    const correct = selectedIndex === currentQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < currentQuestions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestions(questions[difficulty]);
  };

  const handleDifficultyChange = (event) => {
    const value = event.target.value;
    setDifficulty(value);
    setCurrentQuestions(questions[value]);
    restartQuiz();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-lg mx-auto shadow-2xl bg-white/90 backdrop-blur-sm p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Be Based!</h1>
        <select
          onChange={handleDifficultyChange}
          value={difficulty}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="easy">Difficulty: Easy</option>
          <option value="medium">Difficulty: Medium</option>
          <option value="hard">Difficulty: Hard</option>
        </select>
        {showResult ? (
          <div className="text-center">
            <h2 className="text-2xl mb-4 font-semibold">Quiz Completed!</h2>
            <p className="text-xl mb-4">Your score: {score} out of {currentQuestions.length}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${(score / currentQuestions.length) * 100}%`}}></div>
            </div>
            <button
              onClick={restartQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl mb-6 font-semibold text-center">{currentQuestions[currentQuestion].question}</h2>
            <div className="space-y-3">
              {currentQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full text-left py-3 px-4 font-medium rounded-lg transition duration-200 ${
                    selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-white hover:bg-gray-100 text-purple-700'
                  }`}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="mt-6 text-sm text-gray-600 text-center">Built Onchain, on Base</div>
      </div>
    </div>
  );
};

export default QuizGame;
