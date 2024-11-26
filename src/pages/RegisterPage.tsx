import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, AlertCircle } from 'lucide-react';
import { UserModel } from '../db/models/User';
import { QuizAnswerModel } from '../db/models/QuizAnswer';
import { SelectedJobModel } from '../db/models/SelectedJob';
import { countries } from '../utils/countries';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    country: '',
    agreeToTerms: false,
    error: ''
  });

  const validatePassword = (password: string) => {
    const minLength = 6;
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (password.length < minLength) {
      return 'Password must be at least 6 characters long';
    }
    if (!hasLowerCase) {
      return 'Password must contain lowercase letters';
    }
    if (!hasNumber) {
      return 'Password must contain numbers';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setFormData(prev => ({
        ...prev,
        error: passwordError
      }));
      return;
    }

    try {
      // Create user
      const result = await UserModel.create({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        country: formData.country
      });

      if (result.success && result.user) {
        // Automatically log in the user after registration
        const loginResult = await login(formData.email, formData.password);
        
        if (loginResult.success) {
          // Save quiz answers if they exist
          const storedAnswers = localStorage.getItem('quizAnswers');
          if (storedAnswers) {
            const answers = JSON.parse(storedAnswers);
            await Promise.all(Object.entries(answers).map(([questionId, answer]) => {
              return QuizAnswerModel.create({
                user_id: result.user.id!,
                question_id: questionId,
                answer: answer as string
              });
            }));
            localStorage.removeItem('quizAnswers');
          }

          // Save selected job if it exists
          const storedJob = localStorage.getItem('selectedJob');
          if (storedJob) {
            const job = JSON.parse(storedJob);
            await SelectedJobModel.create({
              user_id: result.user.id!,
              job_id: job.job_id,
              job_title: job.job_title
            });
            localStorage.removeItem('selectedJob');
          }

          // Navigate to documents page immediately after registration
          navigate('/documents');
        } else {
          setFormData(prev => ({
            ...prev,
            error: loginResult.error || 'Error logging in after registration'
          }));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          error: result.error || 'Registration failed'
        }));
      }
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        error: 'An error occurred during registration'
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      error: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h1>
          
          {formData.error && (
            <div className="mb-4 p-4 bg-red-50 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {formData.error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md"
                placeholder="••••••••"
              />
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 6 characters long and contain lowercase letters and numbers
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md"
              >
                <option value="">Select your country</option>
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-coral-500"
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-coral-500 px-4 py-2 text-white hover:bg-coral-600 transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-coral-500 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}