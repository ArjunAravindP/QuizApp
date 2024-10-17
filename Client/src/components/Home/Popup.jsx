import { useState } from 'react';

export default function PopUp({ selectedTopic, submitTopic, closePopup }) {
  const [numQuestions, setNumQuestions] = useState(10); // Default to 10

  const handleNumQuestionsChange = (num) => {
    setNumQuestions(num);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="w-full flex justify-between">
          <h2 className="text-xl font-bold">Selected Topic</h2>
          <p
            onClick={closePopup}
            className="font-bold p-1  hover:cursor-pointer hover:bg-slate-400"
          >
            X
          </p>
        </div>
        <p>
          You have selected: <span className="font-bold">{selectedTopic}</span>
        </p>
        <div className="flex gap-3 mt-4 justify-center items-center">
          <p>Select the number of questions:</p>
          {[10, 15, 20].map((option) => (
            <button
              key={option}
              onClick={() => handleNumQuestionsChange(option)}
              className={`flex bg-purple-200 p-2 rounded hover:cursor-pointer ${
                numQuestions === option ? 'bg-purple-400' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={() => submitTopic(numQuestions)}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
