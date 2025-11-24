import React, { useState, useEffect } from 'react';

export default function Quiz({ questions, onComplete, onCancel }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [streak, setStreak] = useState(0);
    const [animatingStreak, setAnimatingStreak] = useState(false);

    // Timer state: 30 minutes = 1800 seconds
    const [timeLeft, setTimeLeft] = useState(1800);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete(score, 1800 - timeLeft, wrongAnswers);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete, score, wrongAnswers]);

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
            setStreak(prev => prev + 1);
            setAnimatingStreak(true);
            setTimeout(() => setAnimatingStreak(false), 1000);
        } else {
            setWrongAnswers(prev => [...prev, {
                question: currentQuestion,
                selected: selectedAnswers
            }]);
            setStreak(0);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswers([]);
            setIsSubmitted(false);
        } else {
            onComplete(score + (isCurrentCorrect() ? 0 : 0), 1800 - timeLeft, wrongAnswers);
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
                classes += " correct pulse";
            } else if (selectedAnswers.includes(index)) {
                classes += " incorrect shake";
            }
        }
        return classes;
    };

    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="container">
            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                <button
                    onClick={onCancel}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        padding: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Quit Quiz
                </button>
            </div>

            <div className="progress-container" style={{ marginTop: '1rem' }}>
                <div className="timer">
                    ⏱ {formatTime(timeLeft)}
                </div>

                {streak > 1 && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        color: '#fbbf24',
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '700',
                        transform: animatingStreak ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        🔥 Streak: {streak}
                    </div>
                )}

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
