import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Building2, X, Award, Briefcase } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  location: string;
  country: string;
  salary: string;
  schedule: string;
  description: string;
  requirements: string[];
  benefits: string[];
  type: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'Production Operator (Automotive Industry)',
    location: 'Hodonín',
    country: 'Czech Republic',
    salary: '135 CZK/hour',
    schedule: '3 shifts of 8 hours or a short/long week of 12 hours',
    description: 'Operate machinery to produce plastic parts for car interiors. Ensure quality control and adhere to safety standards.',
    requirements: [
      'Men or couples (up to 50 years old)',
      'No experience required',
      'Training provided'
    ],
    benefits: [
      'Weekly advances',
      'Official employment',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 2,
    title: 'Meat Processing Worker',
    location: 'Mirovice',
    country: 'Czech Republic',
    salary: '115 CZK/hour',
    schedule: '12-hour shifts; 200-250 hours per month',
    description: 'Sorting, packaging, and processing meat products while maintaining hygiene standards.',
    requirements: [
      'Women and couples',
      'Ability to work in cold environments',
      'Attention to detail'
    ],
    benefits: [
      'Free work clothing',
      'Weekly advances',
      'Official employment'
    ],
    type: 'Full-time'
  },
  {
    id: 3,
    title: 'Automotive Parts Production Operator',
    location: 'Mladá Boleslav',
    country: 'Czech Republic',
    salary: '140 CZK/hour',
    schedule: '8 and 12-hour shifts',
    description: 'Production of car parts, including assembly and quality control.',
    requirements: [
      'Men and women under 50 years old',
      'Manual dexterity',
      'Quality mindset'
    ],
    benefits: [
      'Weekly advances',
      'Official employment',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 4,
    title: 'Cosmetic Pencil Production Worker',
    location: 'Český Krumlov',
    country: 'Czech Republic',
    salary: '125 CZK/hour',
    schedule: '3 shifts of 8 hours; overtime possible',
    description: 'Production and quality control of cosmetic pencils.',
    requirements: [
      'Men, women, and couples (18–50 years old)',
      'Good eyesight',
      'Attention to detail'
    ],
    benefits: [
      'Weekly advances',
      'Official employment',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 5,
    title: 'Panel Assembler for Skoda Cars',
    location: 'Mladá Boleslav',
    country: 'Czech Republic',
    salary: '150 CZK/hour + bonuses',
    schedule: '3 shifts of 8 hours',
    description: 'Assembly of panels for Skoda cars.',
    requirements: [
      'Men and couples (up to 40 years old)',
      'Technical aptitude',
      'Team player'
    ],
    benefits: [
      'Bonuses up to 4,300 CZK',
      'Affordable accommodation',
      'Weekly advances'
    ],
    type: 'Full-time'
  },
  {
    id: 6,
    title: 'Air Conditioner Production Operator',
    location: 'Liberec',
    country: 'Czech Republic',
    salary: '135 CZK/hour + bonuses',
    schedule: '3 shifts of 8 hours; additional hours available',
    description: 'Production of air conditioners for cars, including assembly and quality control.',
    requirements: [
      'Couples and men',
      'Willingness to work in shifts',
      'Technical understanding'
    ],
    benefits: [
      'Weekly advances',
      'Official employment',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 7,
    title: 'Forklift Operator',
    location: 'Ostrava',
    country: 'Czech Republic',
    salary: '140 CZK/hour',
    schedule: '2 shifts of 8 hours each',
    description: 'Operate forklifts to transport materials and products within the warehouse.',
    requirements: [
      'Valid forklift license required',
      'Experience preferred',
      'Safety conscious'
    ],
    benefits: [
      'Free training for forklift operation',
      'Weekly advances',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 8,
    title: 'Warehouse Loader',
    location: 'Katowice',
    country: 'Poland',
    salary: '20 PLN/hour',
    schedule: '12-hour shifts',
    description: 'Load and unload goods in the warehouse.',
    requirements: [
      'Men only',
      'Physically fit',
      'Reliability'
    ],
    benefits: [
      'Paid overtime',
      'Accommodation provided',
      'Weekly payments'
    ],
    type: 'Full-time'
  },
  {
    id: 9,
    title: 'Food Packaging Worker',
    location: 'Krakow',
    country: 'Poland',
    salary: '18 PLN/hour',
    schedule: '2 shifts of 10 hours each',
    description: 'Package and label food products while maintaining cleanliness and safety standards.',
    requirements: [
      'No prior experience required',
      'Men and women under 50 years old',
      'Good hygiene practices'
    ],
    benefits: [
      'Meals provided',
      'Weekly advances',
      'Free uniforms'
    ],
    type: 'Full-time'
  },
  {
    id: 10,
    title: 'Welder',
    location: 'Brno',
    country: 'Czech Republic',
    salary: '150 CZK/hour',
    schedule: '8-hour shifts',
    description: 'Perform welding tasks for metal structures.',
    requirements: [
      'Men with prior welding experience',
      'Technical certification',
      'Attention to detail'
    ],
    benefits: [
      'Paid overtime',
      'Accommodation assistance',
      'Weekly advances'
    ],
    type: 'Full-time'
  },
  {
    id: 11,
    title: 'Automotive Glass Installer',
    location: 'Zlin',
    country: 'Czech Republic',
    salary: '140 CZK/hour',
    schedule: '3 shifts of 8 hours each',
    description: 'Install and inspect automotive glass.',
    requirements: [
      'Men and women under 45 years old',
      'Manual dexterity',
      'Attention to detail'
    ],
    benefits: [
      'Weekly advances',
      'Free transportation',
      'Accommodation assistance'
    ],
    type: 'Full-time'
  },
  {
    id: 12,
    title: 'Agricultural Worker',
    location: 'Rural Poland',
    country: 'Poland',
    salary: '17 PLN/hour',
    schedule: 'Seasonal work, 10–12 hours per day',
    description: 'Perform agricultural tasks such as harvesting and sorting crops.',
    requirements: [
      'Men and women',
      'Physically fit',
      'Outdoor work experience preferred'
    ],
    benefits: [
      'Free accommodation',
      'Meals provided',
      'Weekly payments'
    ],
    type: 'Seasonal'
  },
  {
    id: 13,
    title: 'Tire Production Worker',
    location: 'Trnava',
    country: 'Slovakia',
    salary: '9 €/hour',
    schedule: '12-hour shifts',
    description: 'Manufacture and inspect tires for quality assurance.',
    requirements: [
      'Men and women under 50 years old',
      'Physical stamina',
      'Quality control mindset'
    ],
    benefits: [
      'Paid breaks',
      'Accommodation provided',
      'Weekly payments'
    ],
    type: 'Full-time'
  },
  {
    id: 14,
    title: 'Logistics Operator',
    location: 'Žilina',
    country: 'Slovakia',
    salary: '8.5 €/hour',
    schedule: '10-hour day shifts',
    description: 'Handle warehouse logistics, including stock inventory and order preparation.',
    requirements: [
      'Experience in logistics is a plus',
      'Basic computer skills',
      'Organizational skills'
    ],
    benefits: [
      'Accommodation',
      'Meal vouchers',
      'Overtime available'
    ],
    type: 'Full-time'
  }
];

export default function JobsPage() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleApply = () => {
    if (selectedJob) {
      // Store selected job in localStorage to be saved after registration
      localStorage.setItem('selectedJob', JSON.stringify({
        job_id: selectedJob.id.toString(),
        job_title: selectedJob.title
      }));
    }
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
                        {job.type}
                      </span>
                      <span className="bg-coral-50 text-coral-700 px-3 py-1 rounded-full text-sm">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}, {job.country}
                    </div>
                    <p className="text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
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
              <div className="text-gray-500 mb-6 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {selectedJob.location}, {selectedJob.country}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
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