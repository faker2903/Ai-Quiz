import React, { useRef } from 'react';
import { useQuiz } from '../context/QuizContext';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const QuizScreen = () => {
    const {
        questions,
        currentQuestionIndex,
        userAnswers,
        selectAnswer,
        goToNextQuestion,
        goToPreviousQuestion,
        submitQuiz,
        isDarkMode,
        topic
    } = useQuiz();

    const question = questions[currentQuestionIndex];
    const containerRef = useRef(null);
    const selectedAnswer = userAnswers[currentQuestionIndex];

    useGSAP(() => {
        gsap.fromTo(".question-anim",
            { opacity: 0, x: 60, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.4)" }
        );
    }, { dependencies: [currentQuestionIndex], scope: containerRef });

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleNext = () => {
        if (isLastQuestion) {
            submitQuiz();
        } else {
            goToNextQuestion();
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col h-full w-full py-4 sm:py-6 md:py-8 px-2 sm:px-4">
            {/* Header Info - Responsive */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-6 sm:mb-8 md:mb-10">
                <div className={clsx(
                    "pill px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider",
                    isDarkMode ? "glass-dark text-blue-300" : "glass text-indigo-600"
                )}>
                    {topic}
                </div>
                <div className={clsx(
                    "pill px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm font-bold",
                    isDarkMode ? "glass-dark text-white" : "glass text-gray-900"
                )}>
                    {currentQuestionIndex + 1} / {questions.length}
                </div>
            </div>

            {/* Progress Bar - Responsive */}
            <div className={clsx(
                "w-full h-3 sm:h-4 md:h-5 pill mb-8 sm:mb-10 md:mb-14 overflow-hidden",
                isDarkMode ? "neu-inset-dark" : "neu-inset"
            )}>
                <div
                    className={clsx(
                        "h-full pill transition-all duration-700 ease-out",
                        isDarkMode
                            ? "bg-gradient-to-r from-blue-500 to-purple-600"
                            : "bg-gradient-to-r from-indigo-500 to-pink-600"
                    )}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Question - Responsive */}
            <div className="flex-grow flex flex-col justify-center max-w-3xl mx-auto w-full">
                {/* Question Card */}
                <div className={clsx(
                    "question-anim pill p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 transition-all duration-300 hover:-translate-y-1",
                    isDarkMode
                        ? "glass-dark neu-shadow-dark hover:bg-white/5"
                        : "glass neu-shadow bg-white/60 hover:bg-white border-white/40"
                )}>
                    <h2 className={clsx(
                        "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center",
                        isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                        {question.text}
                    </h2>
                </div>

                {/* Options - Responsive */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5">
                    {question.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => selectAnswer(option)}
                            className={clsx(
                                "question-anim pill px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-left text-sm sm:text-base md:text-lg font-medium transition-all duration-300",
                                selectedAnswer === option
                                    ? isDarkMode
                                        ? "chrome-btn-dark text-white ring-2 sm:ring-4 ring-blue-400 bg-blue-500/20"
                                        : "chrome-btn text-indigo-900 ring-2 sm:ring-4 ring-indigo-500 bg-indigo-100"
                                    : isDarkMode
                                        ? "chrome-btn-dark text-white hover:-translate-y-1"
                                        : "chrome-btn text-gray-900 hover:-translate-y-1"
                            )}
                        >
                            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                                <div className={clsx(
                                    "w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold shrink-0 text-sm sm:text-base",
                                    selectedAnswer === option
                                        ? isDarkMode
                                            ? "bg-blue-400 text-white"
                                            : "bg-indigo-600 text-white"
                                        : isDarkMode
                                            ? "glossy-icon-dark text-gray-300"
                                            : "glossy-icon text-gray-700"
                                )}>
                                    {String.fromCharCode(65 + idx)}
                                </div>
                                <span className={selectedAnswer === option ? "font-bold" : ""}>{option}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons - Responsive */}
            <div className="flex justify-between items-center mt-6 sm:mt-10 md:mt-12 gap-2 sm:gap-3 md:gap-4">
                <button
                    onClick={goToPreviousQuestion}
                    disabled={isFirstQuestion}
                    className={clsx(
                        "pill px-4 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 font-bold text-sm sm:text-base md:text-lg flex items-center gap-2 sm:gap-3 transition-all duration-300",
                        isFirstQuestion
                            ? "opacity-30 cursor-not-allowed"
                            : isDarkMode
                                ? "chrome-btn-dark text-white hover:-translate-x-1"
                                : "chrome-btn text-gray-900 hover:-translate-x-1"
                    )}
                >
                    <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                </button>

                <button
                    onClick={handleNext}
                    disabled={!selectedAnswer}
                    className={clsx(
                        "pill px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 font-bold text-sm sm:text-base md:text-lg flex items-center gap-2 sm:gap-3 transition-all duration-300",
                        !selectedAnswer
                            ? "opacity-50 cursor-not-allowed grayscale"
                            : isLastQuestion
                                ? isDarkMode
                                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
                                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1"
                                : isDarkMode
                                    ? "chrome-btn-dark text-white hover:translate-x-1"
                                    : "chrome-btn text-gray-900 hover:translate-x-1"
                    )}
                >
                    <span>{isLastQuestion ? "Submit" : "Next"}</span>
                    <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
            </div>
        </div>
    );
};
