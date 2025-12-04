import React from 'react';
import { useQuiz } from '../context/QuizContext';
import clsx from 'clsx';
import { Loader2, Sparkles } from 'lucide-react';

export const LoadingScreen = ({ message = "Generating Quiz...", subtext }: { message?: string, subtext?: string }) => {
    const { isDarkMode, topic } = useQuiz();

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            {/* Loading Icon */}
            <div className={clsx(
                "w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-pulse",
                isDarkMode ? "glossy-icon-dark" : "glossy-icon"
            )}>
                <Loader2 size={48} className={clsx(
                    "animate-spin",
                    isDarkMode ? "text-blue-400" : "text-purple-600"
                )} />
            </div>

            {/* Loading Text */}
            <h2 className={clsx(
                "text-3xl font-bold mb-3",
                isDarkMode ? "text-gray-100" : "text-gray-800"
            )}>
                {message}
            </h2>
            <p className={clsx(
                "text-lg flex items-center gap-2",
                isDarkMode ? "text-gray-400" : "text-gray-600"
            )}>
                <Sparkles size={18} />
                {subtext || `Crafting questions about "${topic}"`}
            </p>

            {/* Loading Dots */}
            <div className="flex gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={clsx(
                            "w-3 h-3 rounded-full animate-bounce",
                            isDarkMode ? "bg-blue-400" : "bg-purple-600"
                        )}
                        style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '0.6s'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
