import React, { useState } from 'react';
import { 
  Play, 
  Lock,
  Unlock,
  Trophy,
  CheckCircle,
  Star,
  ChevronRight,
  Video,
  Award
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: 'available' | 'locked' | 'completed';
  progress: {
    current: number;
    total: number;
  };
  achievement: {
    name: string;
    icon: string;
    description: string;
  };
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'How to Upload Documents',
    description: 'Learn how to properly upload your passport and other documents',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop',
    status: 'available',
    progress: {
      current: 1,
      total: 2
    },
    achievement: {
      name: 'Document Master',
      icon: '📄',
      description: 'Successfully completed document upload training'
    }
  },
  {
    id: '2',
    title: 'Visa Application Process',
    description: 'Step-by-step guide to applying for your work visa',
    thumbnail: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=400&h=250&fit=crop',
    status: 'locked',
    progress: {
      current: 0,
      total: 2
    },
    achievement: {
      name: 'Visa Expert',
      icon: '🛂',
      description: 'Mastered the visa application process'
    }
  },
  {
    id: '3',
    title: 'Preparing for Work Abroad',
    description: 'Essential tips for starting your job in Europe',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop',
    status: 'locked',
    progress: {
      current: 0,
      total: 2
    },
    achievement: {
      name: 'Work Ready',
      icon: '💼',
      description: 'Completed all preparation steps'
    }
  }
];

const achievements = [
  {
    id: '1',
    name: 'First Steps',
    icon: '🎯',
    description: 'Completed your first lesson',
    unlocked: true
  },
  {
    id: '2',
    name: 'Document Master',
    icon: '📄',
    description: 'Aced the document upload quiz',
    unlocked: false
  },
  {
    id: '3',
    name: 'Visa Expert',
    icon: '🛂',
    description: 'Mastered visa application process',
    unlocked: false
  },
  {
    id: '4',
    name: 'Ready for Work',
    icon: '💼',
    description: 'Completed all lessons',
    unlocked: false
  }
];

export default function VideoTutorialsContent() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const completedLessons = lessons.filter(lesson => lesson.status === 'completed').length;
  const totalLessons = lessons.length;
  const progress = (completedLessons / totalLessons) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Interactive Lessons: Learn Through Play! 🎮
        </h1>
        <p className="mt-2 text-gray-600">
          Watch videos, complete quizzes, and earn achievements on your journey to employment.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <p className="text-sm text-gray-600">
              {completedLessons} of {totalLessons} lessons completed
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">
              {achievements.filter(a => a.unlocked).length} Achievements
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={lesson.thumbnail}
                alt={lesson.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                {lesson.status === 'locked' ? (
                  <div className="flex flex-col items-center text-white">
                    <Lock className="h-8 w-8 mb-2" />
                    <span className="text-sm">Complete previous lesson to unlock</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSelectedLesson(lesson)}
                    className="w-12 h-12 rounded-full bg-coral-500 flex items-center justify-center hover:bg-coral-600 transition-colors"
                  >
                    <Play className="h-6 w-6 text-white" />
                  </button>
                )}
              </div>
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-white/90">
                {lesson.status === 'completed' ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Completed</span>
                  </>
                ) : lesson.status === 'available' ? (
                  <>
                    <Unlock className="h-4 w-4 text-coral-500" />
                    <span className="text-coral-500">Available</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-500">Locked</span>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{lesson.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {lesson.progress.current}/{lesson.progress.total} steps
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Award className="h-4 w-4" />
                  <span className="text-sm">{lesson.achievement.name}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg text-center ${
                achievement.unlocked
                  ? 'bg-yellow-50 border-2 border-yellow-200'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h3 className="font-medium text-gray-900 mb-1">{achievement.name}</h3>
              <p className="text-xs text-gray-500">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}