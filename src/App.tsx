import DefaultLayout from './layout/DefaultLayout';
import { Navigate, Route, Routes } from 'react-router-dom';
import Quiz from './pages/QuizPage';
import CreateQuizPage from './pages/CreateQuizPage';
import QuizTakePage from './pages/QuizTakePage';
import AnswersPage from './pages/AnswersPage';

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/quiz" replace />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/quiz/:id/take" element={<QuizTakePage />} />
        <Route path="/quiz/:id/answers" element={<AnswersPage />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
