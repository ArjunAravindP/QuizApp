import { useSelector } from 'react-redux';
import Check from '../../assets/Check.svg';
import Cross from '../../assets/Cross.svg';

export default function QuizComplete({ score, total, handleRestartQuiz }) {
  const { quizData } = useSelector((state) => state.quiz);

  return (
    <div className="flex flex-col w-full min-h-screen bg-purple-200 justify-center items-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Quiz Complete!</h1>
        <p className="text-lg mt-2">
          Your Score: {score} / {total}
        </p>
        <button
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 mt-4 text-white font-bold rounded-md"
          onClick={handleRestartQuiz}
        >
          Go Home
        </button>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-purple-300">
          <thead>
            <tr className="bg-purple-400 text-white">
              <th className="px-4 py-2 border border-purple-300">Status</th>
              <th className="px-4 py-2 border border-purple-300">Question</th>
              <th className="px-4 py-2 border border-purple-300">Answer</th>
              <th className="px-4 py-2 border border-purple-300">
                Selected Answer
              </th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((item) => (
              <tr
                key={item.question}
                className="odd:bg-purple-100 even:bg-purple-50"
              >
                <td className="border px-4 py-2">
                  <div className="flex justify-center items-center h-full">
                    <img
                      className="w-8 h-8"
                      src={item.answer === item.selectedAns ? Check : Cross}
                      alt="Status Icon"
                    />
                  </div>
                </td>
                <td className="border px-4 py-2">{item.question}</td>
                <td className="border px-4 py-2">{item.answer}</td>
                <td className="border px-4 py-2">{item.selectedAns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
