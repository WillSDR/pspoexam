import React from 'react';

export default function Result({ score, totalQuestions, timeTaken, onRestart }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    let message = '';
    if (percentage >= 85) message = 'Outstanding! You are ready for the exam.';
    else if (percentage >= 70) message = 'Good job! A little more practice and you\'ll be there.';
    else message = 'Keep studying! Review the Scrum Guide and try again.';

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>Quiz Complete</h1>

            <div className="score-circle" style={{ '--score-percent': `${percentage}%` }}>
                <span className="score-value">{percentage}%</span>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Score</div>
                    <div className="stat-value">{score} / {totalQuestions}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Time Taken</div>
                    <div className="stat-value">{formatTime(timeTaken)}</div>
                </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)' }}>{message}</p>
            </div>

            <button className="btn" onClick={onRestart}>
                Try Again
            </button>
        </div>
    );
}
