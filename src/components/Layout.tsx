import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isDarkMode, toggleTheme } = useQuiz();

    return (
        <div className={clsx(
            "min-h-screen w-full transition-all duration-500 flex items-center justify-center p-2 sm:p-4 md:p-8 relative",
            isDarkMode ? "bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]" : "bg-gradient-to-br from-[#f0f4f8] via-[#e6eaf0] to-[#d9e2ec]"
        )}>
            {/* Theme Toggle Button - Responsive positioning */}
            <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50">
                <button
                    onClick={toggleTheme}
                    className={clsx(
                        "p-3 sm:p-4 md:p-5 rounded-full transition-all duration-300 active:scale-95 shadow-2xl",
                        isDarkMode ? "glossy-icon-dark" : "glossy-icon bg-white"
                    )}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <Sun size={20} className="text-yellow-300 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    ) : (
                        <Moon size={20} className="text-indigo-600 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    )}
                </button>
            </div>

            {/* Main Container - Fully responsive */}
            <div className={clsx(
                "relative w-full max-w-5xl min-h-[500px] sm:min-h-[600px] md:min-h-[700px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden transition-all duration-500",
                isDarkMode ? "frosted-card-dark neu-shadow-dark" : "frosted-card neu-shadow bg-white/40"
            )}>
                {/* Content */}
                <div className="h-full w-full flex flex-col relative z-10">
                    {children}
                </div>

                {/* Decorative Chrome Accents - Scaled for mobile */}
                <div className={clsx(
                    "absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full blur-3xl opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2",
                    isDarkMode ? "bg-blue-500" : "bg-indigo-400"
                )} />
                <div className={clsx(
                    "absolute bottom-0 right-0 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 rounded-full blur-3xl opacity-15 pointer-events-none translate-x-1/3 translate-y-1/3",
                    isDarkMode ? "bg-purple-500" : "bg-pink-400"
                )} />
            </div>
        </div>
    );
};
