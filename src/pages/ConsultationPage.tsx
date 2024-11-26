import React, { useState } from 'react';
import { Video, Phone, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ConsultationModel } from '../db/models/Consultation';

type ConsultationType = 'video' | 'phone';

export default function ConsultationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBooked, setIsBooked] = useState(false);
  const [consultationType, setConsultationType] = useState<ConsultationType>('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user?.id) {
      setError('Please log in to book a consultation');
      return;
    }

    try {
      await ConsultationModel.create({
        user_id: user.id,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        status: 'scheduled'
      });

      setIsBooked(true);
    } catch (error) {
      console.error('Error booking consultation:', error);
      setError('Failed to book consultation. Please try again.');
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultation Scheduled!</h2>
            <p className="text-gray-600 mb-6">
              Your consultation has been scheduled for {selectedDate} at {selectedTime}.
              {consultationType === 'video' 
                ? " You'll receive a Zoom link via email shortly."
                : " We'll call you at the scheduled time."}
            </p>
            <button
              onClick={() => navigate('/client')}
              className="px-6 py-3 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors font-medium"
            >
              Client Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Consultation</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-lg font-medium text-gray-900 mb-4 block">
                Choose Consultation Type:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setConsultationType('video')}
                  className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                    consultationType === 'video'
                      ? 'border-coral-500 bg-coral-50 text-coral-500'
                      : 'border-gray-200 text-gray-600 hover:border-coral-300'
                  }`}
                >
                  <Video className="h-5 w-5" />
                  Video Call (Zoom)
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('phone')}
                  className={`p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                    consultationType === 'phone'
                      ? 'border-coral-500 bg-coral-50 text-coral-500'
                      : 'border-gray-200 text-gray-600 hover:border-coral-300'
                  }`}
                >
                  <Phone className="h-5 w-5" />
                  Phone Call
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="pl-10 w-full rounded-md border-gray-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="pl-10 w-full rounded-md border-gray-300"
                  >
                    <option value="">Choose time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-coral-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-600 transition-colors"
            >
              Schedule Consultation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}