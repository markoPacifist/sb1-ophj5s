import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Building2, X, Award, Briefcase } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  workType: string;
  employmentType: string;
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  schedule: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Machine Operator (Automotive Industry)',
    company: 'IAC',
    location: 'Hodonín, Czech Republic',
    salary: '135 CZK/hour',
    type: 'Full-Time',
    workType: '100% On-site',
    employmentType: 'Employee',
    postedDate: '2 days ago',
    description: 'Operate machinery and produce plastic parts for automotive interiors. Ensure quality control and adhere to safety standards.',
    requirements: [
      'Male applicants or couples (up to 50 years old)',
      'No prior experience required; training provided'
    ],
    benefits: [
      'Weekly advances available',
      'Training provided',
      'Career growth opportunities'
    ],
    schedule: 'Three shifts (8 hours each) OR 12-hour shifts on a rotating short/long week'
  },
  {
    id: 2,
    title: 'Food Production Worker',
    company: 'Food Processing Plant',
    location: 'Mirovice, Czech Republic',
    salary: '115 CZK/hour',
    type: 'Full-Time',
    workType: '100% On-site',
    employmentType: 'Employee',
    postedDate: '3 days ago',
    description: 'Sorting, packing, and processing food products in a hygienic environment.',
    requirements: [
      'Female applicants or couples',
      'Attention to detail'
    ],
    benefits: [
      'Free work attire',
      'Weekly advances',
      'Clean working environment'
    ],
    schedule: '12-hour shifts (200–250 hours/month)'
  }
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleApply = () => {
    navigate('/register');
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Available Positions</h1>
          </div>
          
          <div className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {job.workType}
                      </span>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {job.type}
                      </span>
                      <span className="bg-coral-50 text-coral-700 px-3 py-1 rounded-full text-sm">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
                  <span className="text-sm text-gray-500">{job.postedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSelectedJob(null)}></div>
            
            <div className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h2>
              <p className="text-gray-500 mb-6">{selectedJob.postedDate}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Company:</p>
                  <p className="font-medium">{selectedJob.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location:</p>
                  <p className="font-medium">{selectedJob.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary:</p>
                  <p className="font-medium">{selectedJob.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Schedule:</p>
                  <p className="font-medium">{selectedJob.schedule}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Job Description:</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-2">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">Benefits:</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedJob.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-coral-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-600 transition"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}