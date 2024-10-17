import { fetchQuizData } from '../api/quizapi';
import NavBar from '../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuizData } from '../store/quizSlice';
import { resetQuiz } from '../store/quizSlice';
import { setTopic } from '../store/quizSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Art from '../assets/art.svg';
import movie from '../assets/movie.svg';
import books from '../assets/books.svg';
import animals from '../assets/animals.svg';
import math from '../assets/math.svg';
import politics from '../assets/politics.svg';
import general from '../assets/general.svg';
import history from '../assets/history.svg';
import Sience from '../assets/science.svg';
import PopUp from '../components/Home/Popup';
import TopicOption from '../components/Home/TopicOption';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function HomePage() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedTopic, setSelcetedTopic] = useState('');
  const auth = useAuthUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetQuiz());
  }, [dispatch]);

  const handleClick = (topic) => {
    if (auth) {
      setPopupVisible(true);
      setSelcetedTopic(topic);
    } else {
      navigate('/login');
    }
  };
  const closePopup = async () => {
    setPopupVisible(false);
  };
  const submitTopic = async (numQuestions) => {
    try {
      const data = await fetchQuizData(numQuestions, selectedTopic);
      dispatch(setTopic(selectedTopic));

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
              { name: 'Art', icon: Art },
              { name: 'Science', icon: Sience },
              { name: 'Politics', icon: politics },
              { name: 'General', icon: general },
              { name: 'Filim', icon: movie },
              { name: 'Books', icon: books },
              { name: 'Mathematics', icon: math },
              { name: 'History', icon: history },
              { name: 'Animals', icon: animals },
            ].map((topic) => (
              <TopicOption
                key={topic.name}
                topic={topic}
                icon={topic.icon}
                handleClick={handleClick}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Pop-up component */}
      {isPopupVisible && (
        <PopUp
          selectedTopic={selectedTopic}
          submitTopic={submitTopic}
          closePopup={closePopup}
        />
      )}
    </>
  );
}
