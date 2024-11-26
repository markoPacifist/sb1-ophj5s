import React from 'react';
import { Users } from 'lucide-react';

export default function Stats() {
  return (
    <div className="bg-coral-500 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
            <p className="mt-4 text-4xl font-bold text-white">50%</p>
            <p className="mt-2 text-xl text-coral-50">Czech Republic</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
            <p className="mt-4 text-4xl font-bold text-white">40%</p>
            <p className="mt-2 text-xl text-coral-50">Slovakia</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-white" />
            </div>
            <p className="mt-4 text-4xl font-bold text-white">10%</p>
            <p className="mt-2 text-xl text-coral-50">Poland</p>
          </div>
        </div>
      </div>
    </div>
  );
}