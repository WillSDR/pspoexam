import React from 'react';

export default function StartScreen({ onStart, totalQuestions }) {
    return (
        <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))' }}>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h1>PSPO Exam Prep</h1>
            <p style={{ fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                Master the Professional Scrum Product Owner exam with our interactive practice questions.
                Test your knowledge on Scrum framework, Product Backlog management, and value maximization.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
                <div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{totalQuestions}</h3>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Questions</span>
                </div>
                <div>
                    <h3 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-success)', marginBottom: '0.25rem' }}>100%</h3>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Free</span>
                </div>
            </div>

            <button className="btn" onClick={onStart}>
                Start Quiz
            </button>
        </div>
    );
}
