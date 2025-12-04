import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Search, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const TopicSelection = () => {
    const { startQuiz, isDarkMode } = useQuiz();
    const [inputTopic, setInputTopic] = useState('');

    useGSAP(() => {
        gsap.from('.stagger-anim', {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
        });
    });

    const handleStart = () => {
        if (inputTopic.trim()) {
            startQuiz(inputTopic);
        }
    };

    const suggestedTopics = [
        { name: 'Space Exploration', icon: '🚀' },
        { name: 'Ancient History', icon: '🏛️' },
        { name: 'Quantum Physics', icon: '⚛️' },
        { name: 'Pop Culture', icon: '🎬' },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full w-full py-4 sm:py-8 md:py-12 px-2">
            {/* Header */}
            <div className="stagger-anim mb-6 sm:mb-10 md:mb-12 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
                    <div
                        className={clsx(
                            'w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 sm:mb-0 sm:mr-5 shadow-lg',
                            isDarkMode ? 'glossy-icon-dark' : 'glossy-icon bg-white'
                        )}
                    >
                        <Sparkles size={24} className={clsx(isDarkMode ? 'text-blue-300' : 'text-indigo-600', 'sm:w-8 sm:h-8 md:w-10 md:h-10')} />
                    </div>
                    <h1
                        className={clsx(
                            'text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight',
                            isDarkMode ? 'text-white' : 'text-gray-900 drop-shadow-sm'
                        )}
                    >
                        AI Quiz
                    </h1>
                </div>
                <p className={clsx('text-base sm:text-lg md:text-xl font-medium px-4', isDarkMode ? 'text-gray-300' : 'text-gray-600')}>
                    Challenge yourself with AI-generated questions
                </p>
            </div>

            {/* Search Input */}
            <div
                className={clsx(
                    'stagger-anim w-full max-w-lg pill px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 mb-6 sm:mb-8 md:mb-10 flex items-center transition-all duration-300 shadow-sm',
                    isDarkMode ? 'glass-dark neu-inset-dark' : 'glass neu-inset bg-white/50 border-white/60'
                )}
            >
                <Search className={clsx('mr-3 sm:mr-4', isDarkMode ? 'text-gray-400' : 'text-indigo-500')} size={20} />
                <input
                    type="text"
                    placeholder="Enter a topic (e.g., 'Coffee Brewing')"
                    value={inputTopic}
                    onChange={(e) => setInputTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                    className={clsx(
                        'bg-transparent border-none outline-none w-full text-base sm:text-lg md:text-xl placeholder:opacity-60 font-medium',
                        isDarkMode ? 'text-white placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-500'
                    )}
                />
            </div>

            {/* Generate Button - Reduced Size */}
            <button
                onClick={handleStart}
                disabled={!inputTopic.trim()}
                className={clsx(
                    'px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-5 pill font-bold text-base sm:text-lg md:text-xl tracking-wide transition-all duration-300',
                    isDarkMode ? 'chrome-btn-dark text-white' : 'chrome-btn text-gray-800'
                )}
            >
                Generate
            </button>

            {/* Suggested Topics */}
            <div className="stagger-anim mt-10 sm:mt-16 md:mt-20 w-full max-w-3xl">
                <p
                    className={clsx(
                        'text-center mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm uppercase tracking-widest font-bold',
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                    )}
                >
                    Suggested Topics
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                    {suggestedTopics.map((topic, idx) => (
                        <button
                            key={idx}
                            onClick={() => startQuiz(topic.name)}
                            className={clsx(
                                'pill px-3 sm:px-4 md:px-6 py-4 md:py-5 text-xs sm:text-sm font-bold transition-all duration-300 hover:-translate-y-2 flex flex-col items-center gap-2 sm:gap-3 group',
                                isDarkMode
                                    ? 'glass-dark neu-shadow-dark hover:bg-white/5 hover:text-blue-300'
                                    : 'glass neu-shadow bg-white/60 hover:bg-white hover:text-indigo-600 border-white/40'
                            )}
                        >
                            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">{topic.icon}</span>
                            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{topic.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
