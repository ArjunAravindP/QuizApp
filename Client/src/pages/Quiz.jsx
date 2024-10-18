import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOption,
  incrementScore,
  setCurrentQuizIndex,
  completeQuiz,
  setError,
  resetQuiz,
  setSelectedAns,
} from '../store/quizSlice';
import { useNavigate } from 'react-router-dom';
import QuizComplete from '../components/QuizPage/QuizComplete';
import { useState } from 'react';
import Alert from '../components/Alert/Alert';
import CountDownTimer from '../components/QuizPage/CountDown';

export default function QuizPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const {
    quizData,
    currentQuizIndex,
    selectedOption,
    score,
    quizComplete,
    error,
    topic,
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
    console.log('asda');

    dispatch(setSelectedAns({ selectedOption, currentQuizIndex }));

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
  const handleQuit = () => {
    setShowAlert(true);
  };
  const handleNo = () => {
    setShowAlert(false);
  };

  if (!quizData.length) {
    return error ? <p className="text-red-600">{error}</p> : <p>Loading...</p>;
  }

  if (quizComplete) {
    return (
      <QuizComplete
        score={score}
        total={quizData.length}
        handleRestartQuiz={handleRestartQuiz}
      />
    );
  }

  const { question, options } = quizData[currentQuizIndex];

  return (
    <>
      {' '}
      <div className="w-full min-h-screen bg-purple-200 flex justify-center items-center">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
          <div className="flex flex-row r p-4 border-b w-full">
            <div className="flex items-center justify-between space-x-2 w-full px-5">
              <div className="w-20 h-8 rounded bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  Score: {score}
                </span>
              </div>
              <h2 className="text-lg font-bold">{topic}</h2>
              <button
                onClick={handleQuit}
                className="bg-red-500 p-3 font-bold text-white rounded py-1"
              >
                End Quiz
              </button>
              <div>
                <CountDownTimer
                  duration={100}
                  currentQuizIndex={currentQuizIndex}
                  onTimeUp={handleContinue}
                />
              </div>
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
               ${selectedOption === option ? 'bg-blue-300' : ''}`}
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
          <div className="flex md:flex-row flex-col w-full items-center gap-y-5 md:justify-between p-4 border-t ">
            <progress
              value={(currentQuizIndex + 1) * (100 / quizData.length)}
              max="100"
              className="md:w-1/3 w-3/4"
            ></progress>
            <span className="text-lg font-bold text-gray-500">
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
      {showAlert && (
        <Alert
          handleYes={handleRestartQuiz}
          handleNo={handleNo}
          mainText="Are you sure you want to quit..?"
          subText="The progress wont be saved"
        />
      )}
    </>
  );
}
