import { fetchQuizData } from '../api/quizapi';
import NavBar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuizData } from '../store/quizSlice';
import { resetQuiz } from '../store/quizSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import PopUp from '../components/Home/Popup';

export default function HomePage() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedTopic, setSelcetedTopic] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  const handleClick = (topic) => {
    setPopupVisible(true);
    setSelcetedTopic(topic);
  };
  const closePopup = async (numQuestions) => {
    try {
      const data = await fetchQuizData(numQuestions, selectedTopic);
      dispatch(setQuizData(data));
      navigate(`/quiz/${selectedTopic}`);
    } catch (error) {
      console.error('Failed to fetch quiz data:', error);
    }
    setPopupVisible(false);
  };
  return (
    <>
      <NavBar />
      <div className="bg-purple-200 overflow-hidden shadow-xl p-6 pt-24 md:p-12 grid md:grid-cols-2 gap-8 items-center min-h-screen">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 leading-tight mb-4">
            Unleash Your Inner Wizard of Wisdom
          </h2>
          <p className="text-purple-800 mb-6">
            Embark on a Journey of Knowledge Exploration with Our Extensive
            Collection of Interactive Quizzes.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
            Get it now
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-purple-800 font-semibold text-center">
            HI ANDREW! WHAT TOPIC ARE YOU INTERESTED IN?
          </p>
          <div className="flex flex-wrap gap-3 items-center justify-center">
            {[
              { name: 'Art' },
              { name: 'Science' },
              { name: 'Politics' },
              { name: 'General' },
              { name: 'Filim' },
              { name: 'Books' },
              { name: 'Mathematics' },
              { name: 'History' },
              { name: 'Animals' },
            ].map((topic) => (
              <button
                key={topic.name}
                onClick={() => handleClick(topic.name)}
                className={`flex flex-col w-32 h-24 items-center justify-center p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-md ${
                  topic.name === 'Math' ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <div className="w-6 h-6 mb-2 bg-purple-300 rounded-full"></div>
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Pop-up component */}
      {isPopupVisible && (
        <PopUp selectedTopic={selectedTopic} closePopup={closePopup} />
      )}
    </>
  );
}
