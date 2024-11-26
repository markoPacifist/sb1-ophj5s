import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  FileText, 
  Calendar, 
  DollarSign, 
  FileCheck,
  Clock,
  Plane,
  Briefcase,
  Bot
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ConsultationModel } from '../db/models/Consultation';

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  icon: React.ReactNode;
  date?: string;
}

export default function HomeContent() {
  const { user } = useAuth();
  const [consultation, setConsultation] = useState<{ date: string; time: string } | null>(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      if (user?.id) {
        const consultationData = await ConsultationModel.findByUserId(user.id);
        if (consultationData?.date && consultationData?.time) {
          setConsultation({
            date: consultationData.date,
            time: consultationData.time
          });
        }
      }
    };

    fetchConsultation();
  }, [user]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    
    try {
      const [year, month, day] = dateStr.split('-').map(num => parseInt(num));
      if (!year || !month || !day) return '';
      
      const date = new Date(year, month - 1, day);
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const formattedDate = formatDate(date);
    if (!formattedDate || !time) return 'Schedule pending';
    return `${formattedDate} at ${time}`;
  };

  const timelineItems: TimelineItem[] = [
    {
      id: 'registration',
      title: 'Registration',
      description: 'You have successfully registered.',
      status: 'completed',
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      id: 'documents',
      title: 'Documents Submitted',
      description: 'Documents have been reviewed and approved.',
      status: 'completed',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'interview',
      title: 'Manager Interview',
      description: consultation 
        ? `Your interview is scheduled for ${formatDateTime(consultation.date, consultation.time)}`
        : 'Interview scheduling in progress.',
      status: 'in_progress',
      icon: <Calendar className="h-5 w-5" />,
      date: consultation?.date
    },
    {
      id: 'payment',
      title: 'Payment',
      description: 'Proceed to the payment section to complete this step.',
      status: 'pending',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      id: 'preparation',
      title: 'Document Preparation',
      description: 'We are preparing your job invitation and supporting documents.',
      status: 'pending',
      icon: <FileCheck className="h-5 w-5" />
    },
    {
      id: 'visa_submission',
      title: 'Visa Submission',
      description: "Once documents are ready, we will assist with your visa application.",
      status: 'pending',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'visa_status',
      title: 'Visa Status',
      description: 'Awaiting visa approval. Updates will be shared here.',
      status: 'pending',
      icon: <Clock className="h-5 w-5" />
    },
    {
      id: 'visa_received',
      title: 'Visa Received',
      description: 'Your visa is ready! Download your instructions for travel.',
      status: 'pending',
      icon: <Plane className="h-5 w-5" />
    },
    {
      id: 'job_start',
      title: 'Awaiting Job Start',
      description: 'You are ready to travel and start your job!',
      status: 'pending',
      icon: <Briefcase className="h-5 w-5" />
    }
  ];

  const tasks = [
    {
      id: 'upload_passport',
      title: 'Upload passport',
      dueDate: '2024-03-15'
    },
    {
      id: 'schedule_interview',
      title: 'Schedule interview',
      dueDate: consultation?.date || 'Not scheduled'
    },
    {
      id: 'complete_payment',
      title: 'Complete payment',
      dueDate: '2024-03-25'
    }
  ];

  const updates = [
    {
      id: '1',
      type: 'document',
      message: 'Your documents have been accepted',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'interview',
      message: 'Interview scheduled successfully',
      timestamp: '1 day ago'
    }
  ];

  const completedSteps = timelineItems.filter(item => item.status === 'completed').length;
  const totalSteps = timelineItems.length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome aboard, {user?.name || 'Guest'}! 🎉
        </h1>
        <h2 className="text-2xl font-bold text-gray-900">
          Your Path to Working in Europe: Status & Tasks
        </h2>
        <p className="mt-2 text-gray-600">
          Track your progress and complete tasks on time to start your new career.
        </p>
      </div>

      {/* Overall Progress */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="mt-1 text-right text-sm text-gray-500">{progress}%</div>
      </div>

      {/* Progress Timeline */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h2>
        <div className="space-y-4">
          {timelineItems.map((item) => (
            <div key={item.id} className="flex items-start">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                item.status === 'completed'
                  ? 'bg-green-100'
                  : item.status === 'in_progress'
                  ? 'bg-blue-100'
                  : 'bg-gray-100'
              }`}>
                <span className={
                  item.status === 'completed'
                    ? 'text-green-500'
                    : item.status === 'in_progress'
                    ? 'text-blue-500'
                    : 'text-gray-400'
                }>
                  {item.icon}
                </span>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                  {item.date && (
                    <span className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Tasks */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                </div>
                <button className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors">
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h2>
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    update.type === 'document' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {update.type === 'document' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Calendar className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">{update.message}</p>
                    <p className="text-xs text-gray-500">{update.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}