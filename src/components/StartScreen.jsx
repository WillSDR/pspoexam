import React from 'react';

export default function StartScreen({ onStart, totalQuestions }) {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <h1>PSPO Exam Prep</h1>
            <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Master the Professional Scrum Product Owner exam with our interactive practice questions.
                Test your knowledge on Scrum framework, Product Backlog management, and value maximization.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>{totalQuestions}</h3>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Questions</span>
                </div>
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-success)' }}>100%</h3>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Free</span>
                </div>
            </div>

            <button className="btn" onClick={onStart}>
                Start Quiz
            </button>
        </div>
    );
}
