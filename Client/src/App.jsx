// src/App.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import QuizPage from './pages/Quiz';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '*', element: <NotFound /> },
  { path: '/quiz/:category', element: <QuizPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
