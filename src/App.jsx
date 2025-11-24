import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { questions } from './data/questions';

function App() {
  const [gameState, setGameState] = useState('start'); // start, quiz, result
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const startQuiz = () => {
    setGameState('quiz');
    setScore(0);
    setTimeTaken(0);
    setWrongAnswers([]);
  };

  const finishQuiz = (finalScore, time, wrong) => {
    setScore(finalScore);
    setTimeTaken(time);
    setWrongAnswers(wrong || []);
    setGameState('result');
  };

  const restartQuiz = () => {
    setGameState('start');
    setScore(0);
    setTimeTaken(0);
    setWrongAnswers([]);
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
          wrongAnswers={wrongAnswers}
          onRestart={restartQuiz}
        />
      )}
    </>
  );
}

export default App;
