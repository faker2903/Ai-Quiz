import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Layout } from './components/Layout';
import { TopicSelection } from './screens/TopicSelection';
import { LoadingScreen } from './screens/LoadingScreen';
import { QuizScreen } from './screens/QuizScreen';
import { ResultScreen } from './screens/ResultScreen';

const ScreenManager = () => {
  const { currentScreen, isCalculatingResult } = useQuiz();

  // Show loading screen when calculating results
  if (isCalculatingResult) {
    return <LoadingScreen message="Calculating Results..." subtext="Analyzing your answers with AI" />;
  }

  switch (currentScreen) {
    case 'topic':
      return <TopicSelection />;
    case 'loading':
      return <LoadingScreen />;
    case 'quiz':
      return <QuizScreen />;
    case 'result':
      return <ResultScreen />;
    default:
      return <TopicSelection />;
  }
};

function App() {
  return (
    <QuizProvider>
      <Layout>
        <ScreenManager />
      </Layout>
    </QuizProvider>
  );
}

export default App;
