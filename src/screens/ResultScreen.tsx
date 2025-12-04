import React from 'react';
import { useQuiz } from '../context/QuizContext';
import clsx from 'clsx';
import { RotateCcw, Trophy, Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const ResultScreen = () => {
    const { score, questions, feedback, restartQuiz, isDarkMode, topic } = useQuiz();

    useGSAP(() => {
        gsap.from(".result-anim", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "back.out(1.7)"
        });
    });

    const percentage = (score / questions.length) * 100;
    let trophyColor = isDarkMode ? "text-green-400" : "text-green-500";
    if (percentage < 50) trophyColor = isDarkMode ? "text-red-400" : "text-red-500";
    else if (percentage < 80) trophyColor = isDarkMode ? "text-yellow-400" : "text-yellow-500";

    return (
        <div className="flex flex-col items-center justify-center h-full w-full py-4 sm:py-6 md:py-8 text-center px-2 sm:px-4">
            {/* Trophy Icon - Responsive */}
            <div className={clsx(
                "result-anim w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center mb-4 sm:mb-6 md:mb-8",
                isDarkMode ? "glossy-icon-dark" : "glossy-icon"
            )}>
                <Trophy size={40} className={clsx(trophyColor, "sm:w-12 sm:h-12 md:w-16 md:h-16")} />
            </div>

            {/* Title - Responsive */}
            <h2 className={clsx(
                "result-anim text-2xl sm:text-3xl md:text-4xl font-bold mb-2",
                isDarkMode ? "text-gray-100" : "text-gray-800"
            )}>
                Quiz Completed!
            </h2>
            <p className={clsx(
                "result-anim text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-10",
                isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
                Topic: {topic}
            </p>

            {/* Score Card - Responsive */}
            <div className={clsx(
                "result-anim pill p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 md:mb-10 w-full max-w-md",
                isDarkMode ? "frosted-card-dark neu-shadow-dark" : "frosted-card neu-shadow"
            )}>
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                    <Star className={clsx(trophyColor, "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8")} fill="currentColor" />
                    <p className={clsx(
                        "text-4xl sm:text-5xl md:text-6xl font-black",
                        isDarkMode ? "text-white" : "text-gray-900"
                    )}>
                        {score}/{questions.length}
                    </p>
                    <Star className={clsx(trophyColor, "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8")} fill="currentColor" />
                </div>
                <p className={clsx(
                    "text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                    {percentage.toFixed(0)}% Correct
                </p>
                <p className={clsx(
                    "text-sm sm:text-base md:text-lg leading-relaxed",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                    {feedback}
                </p>
            </div>

            {/* Try Again Button - Responsive */}
            <button
                onClick={restartQuiz}
                className={clsx(
                    "result-anim glass-btn px-10 sm:px-12 md:px-14 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl tracking-wide flex items-center gap-2 sm:gap-3 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]",
                    isDarkMode
                        ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 hover:from-cyan-400/40 hover:to-purple-400/40 border-cyan-400/30"
                        : "bg-gradient-to-r from-indigo-500/30 to-pink-500/30 hover:from-indigo-400/40 hover:to-pink-400/40 border-indigo-400/30"
                )}
            >
                <RotateCcw size={20} className="sm:w-6 sm:h-6" />
                <span>Try Again</span>
            </button>
        </div>
    );
};
