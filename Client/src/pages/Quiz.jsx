import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOption,
  incrementScore,
  setCurrentQuizIndex,
  completeQuiz,
  setError,
  resetQuiz,
} from '../store/quizSlice';
import { useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    quizData,
    currentQuizIndex,
    selectedOption,
    score,
    quizComplete,
    error,
  } = useSelector((state) => state.quiz);

  useEffect(() => {
    if (quizData.length === 0) {
      dispatch(setError('Quiz data is not available. Please try again later.'));
    }
  }, [quizData, dispatch]);

  const handleOptionSelect = (option) => {
    dispatch(selectOption(option));
  };

  const handleContinue = () => {
    if (selectedOption === quizData[currentQuizIndex]?.answer) {
      dispatch(incrementScore());
    }

    dispatch(selectOption(null));

    if (currentQuizIndex < quizData.length - 1) {
      dispatch(setCurrentQuizIndex(currentQuizIndex + 1));
    } else {
      dispatch(completeQuiz());
    }
  };
  const handleRestartQuiz = () => {
    dispatch(resetQuiz());
    navigate('/');
  };

  if (!quizData.length) {
    return error ? <p className="text-red-600">{error}</p> : <p>Loading...</p>;
  }

  if (quizComplete) {
    return (
      <div className="w-full min-h-screen bg-purple-200 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Quiz Complete!</h1>
          <p className="text-lg mt-2">
            Your Score: {score} / {quizData.length}
          </p>
          <button onClick={handleRestartQuiz}>Continue</button>
        </div>
      </div>
    );
  }

  const { question, options } = quizData[currentQuizIndex];

  return (
    <div className="w-full min-h-screen bg-purple-200 flex justify-center items-center">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex flex-row items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">{score}</span>
            </div>
            <h2 className="text-lg font-bold">Fantasy Quiz</h2>
          </div>
        </div>
        {/* Content Section */}
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-bold text-center text-blue-900">
            {question}
          </h2>
          <div className="space-y-4">
            {options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer 
                  ${selectedOption === option ? 'bg-blue-400' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <span className="text-lg font-semibold text-gray-500">
                  {String.fromCharCode(65 + index)}.
                </span>
                <div className="flex-grow">
                  <div className="font-semibold">{option}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Footer Section */}
        <div className="flex justify-between items-center p-4 border-t flex-wrap">
          <progress
            value={(currentQuizIndex + 1) * (100 / quizData.length)}
            max="100"
            className="w-1/3"
          ></progress>
          <span className="text-sm text-gray-500">
            {currentQuizIndex + 1} / {quizData.length}
          </span>
          <button
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md disabled:bg-gray-500"
            onClick={handleContinue}
            disabled={!selectedOption}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
