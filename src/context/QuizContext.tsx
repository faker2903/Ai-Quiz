import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question, generateQuiz, generateFeedback } from '../services/aiService';

type Screen = 'topic' | 'loading' | 'quiz' | 'result';

interface QuizContextType {
    currentScreen: Screen;
    topic: string;
    questions: Question[];
    currentQuestionIndex: number;
    score: number;
    loading: boolean;
    isCalculatingResult: boolean;
    feedback: string;
    error: string | null;
    userAnswers: (string | null)[];
    setTopic: (topic: string) => void;
    startQuiz: (topic: string) => Promise<void>;
    selectAnswer: (selectedOption: string) => void;
    goToNextQuestion: () => void;
    goToPreviousQuestion: () => void;
    submitQuiz: () => Promise<void>;
    restartQuiz: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [currentScreen, setCurrentScreen] = useState<Screen>('topic');
    const [topic, setTopicState] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isCalculatingResult, setIsCalculatingResult] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const startQuiz = async (selectedTopic: string) => {
        setTopicState(selectedTopic);
        setLoading(true);
        setCurrentScreen('loading');
        setError(null);
        setScore(0);
        setUserAnswers([]);

        try {
            const generatedQuestions = await generateQuiz(selectedTopic);
            setQuestions(generatedQuestions);
            setUserAnswers(new Array(generatedQuestions.length).fill(null));
            setCurrentScreen('quiz');
        } catch (err) {
            setError("Failed to generate quiz. Please try again.");
            setCurrentScreen('topic');
        } finally {
            setLoading(false);
        }
    };

    const selectAnswer = (selectedOption: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = selectedOption;
        setUserAnswers(newAnswers);
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const submitQuiz = async () => {
        setIsCalculatingResult(true);

        // Calculate score
        let finalScore = 0;
        questions.forEach((q, index) => {
            if (userAnswers[index] === q.correctAnswer) {
                finalScore++;
            }
        });
        setScore(finalScore);

        try {
            const aiFeedback = await generateFeedback(finalScore, topic);
            setFeedback(aiFeedback);
        } catch (e) {
            setFeedback(`You scored ${finalScore}/5!`);
        }

        setIsCalculatingResult(false);
        setCurrentScreen('result');
    };

    const restartQuiz = () => {
        setCurrentScreen('topic');
        setTopicState('');
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setFeedback('');
        setError(null);
        setUserAnswers([]);
        setIsCalculatingResult(false);
    };

    return (
        <QuizContext.Provider value={{
            currentScreen,
            topic,
            questions,
            currentQuestionIndex,
            score,
            loading,
            isCalculatingResult,
            feedback,
            error,
            userAnswers,
            setTopic: setTopicState,
            startQuiz,
            selectAnswer,
            goToNextQuestion,
            goToPreviousQuestion,
            submitQuiz,
            restartQuiz,
            isDarkMode,
            toggleTheme
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
