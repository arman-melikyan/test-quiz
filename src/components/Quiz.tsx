import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Quiz.module.scss';



const Quiz: React.FC<QuizProps> = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    const handleAnswer = (selectedAnswer: string) => {
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers[currentQuestion] = selectedAnswer;
        setUserAnswers(updatedUserAnswers);

        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            // Increment the score only when the selected answer is correct
            setScore(score + 1);
        }

        if (currentQuestion < questions.length ) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            navigate('/results', { state: { questions, userAnswers, score } });
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            // Clear the user's answer for the current question
            const updatedUserAnswers = [...userAnswers];
            updatedUserAnswers[currentQuestion] = '';
            setUserAnswers(updatedUserAnswers);

            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className={styles.quiz}>
            <h1>Quiz App</h1>
            {currentQuestion < questions.length ? (
                <div>
                    <p>{questions[currentQuestion].question}</p>
                    <ul>
                        {questions[currentQuestion].options.map((option, index) => (
                            <li key={index} onClick={() => handleAnswer(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                    <div>
                        <button onClick={handlePrevious} disabled={currentQuestion === 0}>
                            Previous
                        </button>
                        <button onClick={() => handleAnswer('')}>Next</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Quiz Completed! Your Score: {score}</p>
                    <button onClick={() => navigate('/results', { state: { questions, userAnswers, score } })}>
                        Finish
                    </button>
                </div>
            )}
        </div>
    );
};


interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

interface QuizProps {
    questions: Question[];
}
export default Quiz;



