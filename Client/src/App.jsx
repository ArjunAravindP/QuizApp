// src/App.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import QuizPage from './pages/Quiz';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/',
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'quiz',
        element: <AuthOutlet fallbackPath="/login" />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: ':category',
            element: <QuizPage />,
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
