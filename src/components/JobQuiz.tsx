import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizAnswerModel } from '../db/models/QuizAnswer';
import LoadingAnimation from './LoadingAnimation';

interface Question {
  id: string;
  text: string;
  options: string[];
  description?: string;
}

const questions: Question[] = [
  {
    id: 'europe_exp',
    text: "Have you worked in Europe before?",
    options: ["Yes", "No"]
  },
  {
    id: 'passport',
    text: "Do you have a valid international passport?",
    options: ["Yes", "No", "I'm in the process of obtaining one"]
  },
  {
    id: 'night_shifts',
    text: "Are you open to working night shifts?",
    options: ["Yes", "No", "Depends on the job"]
  },
  {
    id: 'experience',
    text: "Do you have any previous experience in manufacturing or logistics?",
    options: [
      "Yes, I have experience",
      "No, but I'm willing to learn",
      "No, and I prefer other types of work"
    ]
  },
  {
    id: 'education',
    text: "What best describes your level of education?",
    description: "Select the best option and we'll find the best jobs for your education level.",
    options: [
      "Associate's Degree or Some College",
      "Bachelor's Degree",
      "Master's or Higher",
      "Specialized/Other",
      "Prefer Not to Answer"
    ]
  }
];

export default function JobQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = async (answer: string) => {
    const currentQuestionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [currentQuestionId]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowLoading(true);
      
      try {
        // Store answers in localStorage temporarily
        // They will be saved to DB after user registration
        localStorage.setItem('quizAnswers', JSON.stringify({
          ...answers,
          [currentQuestionId]: answer
        }));
        
        // Navigate to jobs page after 3 seconds
        setTimeout(() => {
          navigate('/jobs');
        }, 3000);
      } catch (error) {
        console.error('Error saving quiz answers:', error);
        navigate('/jobs'); // Navigate anyway if there's an error
      }
    }
  };

  if (showLoading) {
    return <LoadingAnimation onComplete={() => navigate('/jobs')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Job Questionnaire</h1>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-coral-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {questions[currentQuestion].text}
            </h2>
            {questions[currentQuestion].description && (
              <p className="text-gray-600 mb-4">{questions[currentQuestion].description}</p>
            )}
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  answers[questions[currentQuestion].id] === option
                    ? 'border-coral-500 bg-coral-50'
                    : 'border-gray-200 hover:border-coral-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}