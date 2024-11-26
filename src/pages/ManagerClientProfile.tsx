import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Phone, Briefcase, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';

interface QuizAnswer {
  question_id: string;
  answer: string;
}

interface SelectedJob {
  job_id: string;
  job_title: string;
}

interface TimelineStep {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'inactive';
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export default function ManagerClientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [selectedJob, setSelectedJob] = useState<SelectedJob | null>(null);
  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>([
    { id: '1', name: 'Registration', status: 'completed' },
    { id: '2', name: 'Documents Submitted', status: 'completed' },
    { id: '3', name: 'Manager Interview', status: 'active' },
    { id: '4', name: 'Payment', status: 'inactive' },
    { id: '5', name: 'Document Preparation', status: 'inactive' },
    { id: '6', name: 'Visa Submission', status: 'inactive' },
    { id: '7', name: 'Visa Status', status: 'inactive' },
    { id: '8', name: 'Visa Received', status: 'inactive' },
    { id: '9', name: 'Awaiting Job Start', status: 'inactive' }
  ]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showTaskDropdown, setShowTaskDropdown] = useState(false);

  // Get quiz questions for displaying answers
  const quizQuestions: Record<string, string> = {
    'europe_exp': "Have you worked in Europe before?",
    'passport': "Do you have a valid international passport?",
    'night_shifts': "Are you open to working night shifts?",
    'experience': "Do you have any previous experience in manufacturing or logistics?",
    'education': "What best describes your level of education?"
  };

  const predefinedTasks = [
    'Upload Photo',
    'Upload Resume/CV',
    'Upload Medical Insurance',
    'Upload Passport',
    'Complete Payment',
    'Complete Video Tutorials'
  ];

  const handleStatusChange = (stepId: string, newStatus: 'completed' | 'active' | 'inactive') => {
    setTimelineSteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, status: newStatus } : step
      )
    );
  };

  const handleAddTask = (taskName: string) => {
    setTasks(prev => [...prev, { id: Date.now().toString(), name: taskName, completed: false }]);
    setNewTask('');
    setShowTaskDropdown(false);
  };

  const handleRemoveTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/manager')}
            className="text-gray-600 hover:text-coral-500 flex items-center"
          >
            ← Back to Clients
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['info', 'documents', 'timeline', 'tasks'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-coral-500 text-coral-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="py-6">
          {activeTab === 'info' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Client Information</h2>
              
              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="text-gray-900">John Doe</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Country</label>
                      <p className="text-gray-900">Ukraine</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Contact</label>
                      <div className="flex items-center space-x-4">
                        <a href="mailto:john@example.com" className="text-coral-500 hover:text-coral-600 flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          john@example.com
                        </a>
                        <a href="tel:+1234567890" className="text-coral-500 hover:text-coral-600 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          +1234567890
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Job */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Position</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-coral-500 mr-2" />
                      <div>
                        <p className="font-medium text-gray-900">Production Operator (Automotive Industry)</p>
                        <p className="text-sm text-gray-500">Hodonín, Czech Republic</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quiz Answers */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Questionnaire Answers</h3>
                  <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                    {Object.entries(quizQuestions).map(([id, question]) => (
                      <div key={id} className="p-4">
                        <p className="text-sm font-medium text-gray-700">{question}</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {quizAnswers.find(a => a.question_id === id)?.answer || "Yes"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Timeline</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Step Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {timelineSteps.map((step) => (
                      <tr key={step.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {step.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            step.status === 'completed' ? 'bg-green-100 text-green-800' :
                            step.status === 'active' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <select
                            value={step.status}
                            onChange={(e) => handleStatusChange(step.id, e.target.value as 'completed' | 'active' | 'inactive')}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-coral-500 focus:border-coral-500 sm:text-sm rounded-md"
                          >
                            <option value="completed">Completed</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
                <div className="relative">
                  <button
                    onClick={() => setShowTaskDropdown(!showTaskDropdown)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-500 hover:bg-coral-600"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Task
                  </button>
                  
                  {showTaskDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1" role="menu">
                        {predefinedTasks.map((task) => (
                          <button
                            key={task}
                            onClick={() => handleAddTask(task)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                          >
                            {task}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-900">{task.name}</span>
                    <button
                      onClick={() => handleRemoveTask(task.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents</h2>
              {/* Documents content */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}