import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Result({ score, totalQuestions, timeTaken, wrongAnswers, onRestart }) {
    const percentage = Math.round((score / totalQuestions) * 100);

    useEffect(() => {
        if (percentage >= 85) {
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [percentage]);

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
        <div className="container" style={{ textAlign: 'center', maxWidth: '1000px' }}>
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

            {wrongAnswers.length > 0 && (
                <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                    <h3 style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                        Review Incorrect Answers ({wrongAnswers.length})
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {wrongAnswers.map((item, index) => (
                            <div key={index} style={{
                                background: 'rgba(255,255,255,0.03)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>
                                    {index + 1}. {item.question.text}
                                </h4>

                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ color: 'var(--color-error)', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                                        Your Answer:
                                    </span>
                                    {item.selected.map(i => (
                                        <div key={i} style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: '0.25rem', color: 'var(--color-error)' }}>
                                            {item.question.options[i]}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--color-success)', fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                                        Correct Answer:
                                    </span>
                                    {item.question.correctAnswers.map(i => (
                                        <div key={i} style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)', marginBottom: '0.25rem', color: 'var(--color-success)' }}>
                                            {item.question.options[i]}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-primary)' }}>
                                    <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>
                                        Explanation
                                    </span>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
                                        {item.question.explanation}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button className="btn" onClick={onRestart}>
                Try Again
            </button>
        </div>
    );
}
