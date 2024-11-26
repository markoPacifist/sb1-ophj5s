import React, { useState } from 'react';
import { X, Video, Phone, Calendar, Clock } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConsultationType = 'video' | 'phone';

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [consultationType, setConsultationType] = useState<ConsultationType>('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle consultation booking
    console.log({
      type: consultationType,
      date: selectedDate,
      time: selectedTime
    });
    onClose();
  };

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Consultation</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Consultation Benefits:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Discuss your experience and job preferences</li>
              <li>Learn about our services and support</li>
              <li>Get detailed information about costs and benefits</li>
              <li>Have all your questions answered by our expert</li>
            </ul>
          </div>

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