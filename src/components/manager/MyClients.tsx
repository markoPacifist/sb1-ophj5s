import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  position: string;
  country: string;
  stage: string;
  interview: {
    date: string;
    status: 'completed' | 'scheduled'
  };
  documents: {
    passport: boolean;
    resume: boolean;
    additional?: boolean;
  };
  training: {
    completed: number;
    total: number;
  };
}

const myClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Machine Operator',
    country: 'Ukraine',
    stage: 'Собеседование пройдено',
    interview: {
      date: '27.11.2024',
      status: 'completed'
    },
    documents: {
      passport: true,
      resume: true
    },
    training: {
      completed: 3,
      total: 3
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Food Production Worker',
    country: 'Poland',
    stage: 'На этапе обучения',
    interview: {
      date: '28.11.2024',
      status: 'scheduled'
    },
    documents: {
      passport: true,
      resume: false
    },
    training: {
      completed: 2,
      total: 3
    }
  }
];

export default function MyClients() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'stage' | 'interview' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: 'stage' | 'interview') => {
    if (sortBy === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const sortedClients = [...myClients].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === 'stage') {
      return sortOrder === 'asc' 
        ? a.stage.localeCompare(b.stage)
        : b.stage.localeCompare(a.stage);
    }

    if (sortBy === 'interview') {
      const aValue = a.interview.status === 'completed' ? 1 : 0;
      const bValue = b.interview.status === 'completed' ? 1 : 0;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">My Clients</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-coral-500"
                onClick={() => handleSort('stage')}
              >
                Client Stage
                {sortBy === 'stage' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-coral-500"
                onClick={() => handleSort('interview')}
              >
                Interview
                {sortBy === 'interview' && (
                  <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedClients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.stage}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {client.interview.date}, {' '}
                    <span className={client.interview.status === 'completed' ? 'text-green-500' : 'text-yellow-500'}>
                      {client.interview.status === 'completed' ? 'Пройдено' : 'Запланировано'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/manager/client/${client.id}`)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-coral-500 bg-coral-50 hover:bg-coral-100"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}