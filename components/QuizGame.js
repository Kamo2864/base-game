import React, { useState } from 'react';
import styles from '../styles/QuizGame.module.css';

// ... (keep the questions object and other parts of the component the same)

const QuizGame = () => {
  // ... (keep the state and handler functions the same)

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Be Based!</h1>
        <select
          onChange={handleDifficultyChange}
          value={difficulty}
          className={styles.select}
        >
          <option value="easy">Difficulty: Easy</option>
          <option value="medium">Difficulty: Medium</option>
          <option value="hard">Difficulty: Hard</option>
        </select>
        {showResult ? (
          <div className={styles.result}>
            <h2>Quiz Completed!</h2>
            <p>Your score: {score} out of {currentQuestions.length}</p>
            <div className={styles.progressBar}>
              <div style={{width: `${(score / currentQuestions.length) * 100}%`}}></div>
            </div>
            <button
              onClick={restartQuiz}
              className={`${styles.button} ${styles.restart}`}
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className={styles.question}>{currentQuestions[currentQuestion].question}</h2>
            <div>
              {currentQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`${styles.button} ${
                    selectedAnswer === index
                      ? isCorrect
                        ? styles.correct
                        : styles.incorrect
                      : ''
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
        <div className={styles.footer}>Built Onchain, on Base</div>
      </div>
    </div>
  );
};

export default QuizGame;
