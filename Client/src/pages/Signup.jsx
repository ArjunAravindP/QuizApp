import InputField from '../components/form/input';
import { useState } from 'react';
import Illustration from '../assets/Illustration.svg';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email))
      newErrors.email = 'Enter a valid email';

    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if ((await response).ok) {
          console.log('Signed up successfully', data);
          alert('User registered successfully!');
        } else {
          console.log('Registration failed:', data.message);
          alert(`Registration failed: ${data.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className="bg-fadeBlack min-h-screen h-screen p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-full">
        {/* Left Side - Info Section */}
        <div className="flex flex-col justify-center items-center p-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Mind Games
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-sm">
            Lets play with your mind a little bit.
          </p>
          <img src={Illustration} alt="line illustration" />
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex justify-center items-center h-full">
          <div className="bg-white w-full max-w-lg p-8 sm:p-12 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Signup Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}

              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}

              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}

              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}

              <button
                className="bg-blue-600 w-full h-12 rounded-lg text-white font-semibold text-lg mt-4 hover:bg-blue-700 transition"
                type="submit"
              >
                {loading ? 'Signing Up...' : 'SignUp'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
