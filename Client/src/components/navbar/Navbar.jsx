import { useState } from 'react';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="flex justify-between items-center p-6 absolute w-screen">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-md"></div>
        <h1 className="text-2xl font-bold text-purple-900">Quizopolis</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-6 text-purple-800">
        <a href="#" className="hover:text-purple-600">
          Home
        </a>
        <a href="#" className="hover:text-purple-600">
          Library
        </a>
        <a href="#" className="hover:text-purple-600">
          Courses
        </a>
        <a href="#" className="hover:text-purple-600">
          Test
        </a>
      </nav>

      {/* Burger Icon (visible only on small screens) */}
      <div className="md:hidden">
        <button
          className="text-purple-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {/* Burger Icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (only visible when isMenuOpen is true) */}
      {isMenuOpen && (
        <nav className="absolute top-20 left-0 w-full bg-white shadow-md p-6 space-y-4 text-purple-800 md:hidden">
          <a href="#" className="block hover:text-purple-600">
            Home
          </a>
          <a href="#" className="block hover:text-purple-600">
            Library
          </a>
          <a href="#" className="block hover:text-purple-600">
            Courses
          </a>
          <a href="#" className="block hover:text-purple-600">
            Test
          </a>
          <button className="bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2 rounded-md">
            Sign up
          </button>
        </nav>
      )}

      {/* Sign-up Button for Desktop */}
      <button className="hidden md:block bg-purple-100 text-purple-800 hover:bg-purple-200 px-4 py-2 rounded-md">
        Sign up
      </button>
    </header>
  );
}
