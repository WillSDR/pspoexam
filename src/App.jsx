import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { questions } from './data/questions';

function App() {
  const [gameState, setGameState] = useState('start'); // start, quiz, result
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  const startQuiz = () => {
    setGameState('quiz');
    setScore(0);
    setTimeTaken(0);
  };

  const finishQuiz = (finalScore, time) => {
    setScore(finalScore);
    setTimeTaken(time);
    setGameState('result');
  };

  const restartQuiz = () => {
    setGameState('start');
    setScore(0);
    setTimeTaken(0);
  };

  return (
    <>
      {gameState === 'start' && (
        <StartScreen onStart={startQuiz} totalQuestions={questions.length} />
      )}
      {gameState === 'quiz' && (
        <Quiz questions={questions} onComplete={finishQuiz} />
      )}
      {gameState === 'result' && (
        <Result
          score={score}
          totalQuestions={questions.length}
          timeTaken={timeTaken}
          onRestart={restartQuiz}
        />
      )}
    </>
  );
}

export default App;
