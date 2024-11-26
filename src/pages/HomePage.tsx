import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ArrowRight, Building2, Briefcase, CheckCircle, Star } from 'lucide-react';
import Stats from '../components/Stats';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                alt="Factory Worker"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-coral-500" />
                <span className="font-medium">100K+ Jobs Available</span>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center lg:text-left lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              The <span className="text-coral-500">#1</span> Job Agency<br />
              in Europe
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Find your next career opportunity in manufacturing, logistics, and more. 
              100% legitimate jobs with work visas provided.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={() => navigate('/quiz')}
                className="bg-coral-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-coral-600 transition-all transform hover:scale-105 duration-200"
              >
                Find a Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Helping You Build a Future Abroad
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <Building2 className="h-12 w-12 text-coral-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Founded in 2017, Lintar Group unites 4 companies specializing in recruitment 
                  for manufacturing, logistics, automotive, medical, and food industries.
                </p>
              </div>
              <div className="bg-gray-50 p-8 rounded-lg">
                <Briefcase className="h-12 w-12 text-coral-500 mx-auto mb-4" />
                <p className="text-gray-600">
                  Operating in the Czech Republic, Slovakia, and Poland, we've helped thousands 
                  secure jobs and Work Permits across Europe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Your Journey Starts Here
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Register', description: 'Sign up and complete your profile' },
              { title: 'Take a Quiz', description: 'Answer questions to match with the best jobs' },
              { title: 'Apply for Jobs', description: 'Select the job that suits you' },
              { title: 'Consultation', description: 'Schedule an interview with our experts' },
              { title: 'Get Your Work Permit', description: 'We assist with the visa process' },
              { title: 'Start Your Job', description: 'Relocate and begin your new career' }
            ].map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/quiz')}
              className="bg-coral-500 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-coral-600 transition-all inline-flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />

      {/* Industries Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Focused on Key Sectors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Automotive', description: 'Car production and assembly jobs', count: '2,500+' },
              { title: 'Medical', description: 'Manufacturing medical equipment and supplies', count: '1,200+' },
              { title: 'Food & Packaging', description: 'Food processing and packaging jobs', count: '1,800+' },
              { title: 'Logistics', description: 'Warehousing and distribution roles', count: '2,000+' }
            ].map((industry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <div className="flex items-center text-coral-500">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>{industry.count} jobs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16">
            Success Stories from Our Workers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Lintar Group made finding a job in Europe seamless. I'm now working in the Czech Republic!",
                author: "Anjali R.",
                role: "Machine Operator"
              },
              {
                quote: "The team helped with everything from documents to interviews. Highly recommended!",
                author: "Ahmed H.",
                role: "Assembly Worker"
              },
              {
                quote: "Their support was incredible. I've started a great job in Slovakia!",
                author: "Maria K.",
                role: "Production Worker"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-start mb-4">
                  <Star className="h-6 w-6 text-yellow-400" />
                  <Star className="h-6 w-6 text-yellow-400" />
                  <Star className="h-6 w-6 text-yellow-400" />
                  <Star className="h-6 w-6 text-yellow-400" />
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-coral-500 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Your Future in Europe Starts Here
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait—secure your dream job today with full support from Lintar Group.
          </p>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-white text-coral-500 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-all inline-flex items-center"
          >
            Find a Job
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}