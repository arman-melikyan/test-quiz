import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Results.module.scss'; // Import the styles



const Results: React.FC = () => {
    const location = useLocation();
    const { questions, userAnswers, score } = location.state || {
        questions: [],
        userAnswers: [],
        score: 0,
    };

    const navigate = useNavigate();

    return (
        <div className={styles.results}>
            <h1>Results</h1>
            <p>Your Score: {score}</p>
            <ul>
                {questions.map((question: Question, index: number) => (
                    <li key={index}>
                        {`Question ${index + 1}: ${question.question}`}
                        <ul>
                            <li>
                                {`Correct Answer: ${question.correctAnswer} - Your Answer: ${userAnswers[index] !== undefined ? userAnswers[index] : 'Not answered'
                                    }`}
                            </li>
                            {question.correctAnswer === userAnswers[index] && <li className={styles.correct}>Correct!</li>}
                        </ul>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/')}>Back to Quiz</button>
        </div>
    );
};

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

export default Results;
