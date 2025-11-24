import React, { useState, useEffect } from 'react';

export default function Quiz({ questions, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Timer state: 30 minutes = 1800 seconds
    const [timeLeft, setTimeLeft] = useState(1800);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete(score, 1800 - timeLeft);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete, score]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentQuestion = questions[currentQuestionIndex];
    const isMultipleChoice = currentQuestion.correctAnswers.length > 1;

    const handleOptionClick = (index) => {
        if (isSubmitted) return;

        if (isMultipleChoice) {
            setSelectedAnswers(prev => {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index);
                } else {
                    return [...prev, index];
                }
            });
        } else {
            setSelectedAnswers([index]);
        }
    };

    const handleSubmit = () => {
        setIsSubmitted(true);

        const isCorrect =
            selectedAnswers.length === currentQuestion.correctAnswers.length &&
            selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a));

        if (isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswers([]);
            setIsSubmitted(false);
        } else {
            onComplete(score + (isCurrentCorrect() ? 0 : 0), 1800 - timeLeft);
        }
    };

    const isCurrentCorrect = () => {
        return selectedAnswers.length === currentQuestion.correctAnswers.length &&
            selectedAnswers.every(a => currentQuestion.correctAnswers.includes(a));
    }

    const getOptionClass = (index) => {
        let classes = "option";
        if (selectedAnswers.includes(index)) classes += " selected";

        if (isSubmitted) {
            if (currentQuestion.correctAnswers.includes(index)) {
                classes += " correct";
            } else if (selectedAnswers.includes(index)) {
                classes += " incorrect";
            }
        }
        return classes;
    };

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="container">
            <div className="progress-container">
                <div className="timer">
                    ⏱ {formatTime(timeLeft)}
                </div>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                    Question {currentQuestionIndex + 1} / {questions.length}
                </span>
            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{currentQuestion.text}</h2>
                {isMultipleChoice && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-accent)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>
                        (Select {currentQuestion.correctAnswers.length} answers)
                    </span>
                )}
            </div>

            <div className="options-grid">
                {currentQuestion.options.map((option, index) => (
                    <button
                        key={index}
                        className={getOptionClass(index)}
                        onClick={() => handleOptionClick(index)}
                        disabled={isSubmitted}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {isSubmitted && (
                <div className="feedback">
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: isCurrentCorrect() ? 'var(--color-success)' : 'var(--color-error)' }}>
                        {isCurrentCorrect() ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{currentQuestion.explanation}</p>
                </div>
            )}

            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                {!isSubmitted ? (
                    <button
                        className="btn"
                        onClick={handleSubmit}
                        disabled={selectedAnswers.length === 0}
                    >
                        Submit Answer
                    </button>
                ) : (
                    <button className="btn" onClick={handleNext}>
                        {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                )}
            </div>
        </div>
    );
}
