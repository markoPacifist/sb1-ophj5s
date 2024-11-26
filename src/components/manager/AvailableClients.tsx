import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const countries = ['All', 'Ukraine', 'Poland', 'Czech Republic', 'Slovakia'];
const trainingStatuses = ['All', 'Not Started', 'In Progress', 'Completed'];

interface Client {
  id: string;
  name: string;
  position: string;
  country: string;
  interview: string;
  documents: string;
  training: string;
}

const availableClients: Client[] = [
  {
    id: '1',
    name: 'John Doe',
    position: 'Machine Operator',
    country: 'Ukraine',
    interview: '27.11.2024, 10:00',
    documents: 'Passport: Yes, Resume: No',
    training: 'Not Started'
  },
  {
    id: '2',
    name: 'Jane Smith',
    position: 'Food Production Worker',
    country: 'Poland',
    interview: '28.11.2024, 12:00',
    documents: 'All Uploaded',
    training: 'Started, 1/3'
  }
];

export default function AvailableClients() {
  const [filters, setFilters] = useState({
    country: 'All',
    documents: 'All',
    training: 'All',
    dateRange: {
      startDate: null as Date | null,
      endDate: null as Date | null
    }
  });

  const [dailyLimit] = useState({
    total: 20,
    remaining: 9
  });

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setFilters(prev => ({
      ...prev,
      dateRange: {
        startDate: start,
        endDate: end
      }
    }));
  };

  const handleTakeClient = (clientId: string) => {
    // Handle taking client logic here
    console.log('Taking client:', clientId);
  };

  return (
    <div className="space-y-6">
      {/* Client Limit Info */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Daily Client Limit</h2>
            <p className="text-sm text-gray-600">
              You can take {dailyLimit.remaining} more clients today
            </p>
          </div>
          <div className="text-lg font-semibold text-coral-500">
            {dailyLimit.remaining}/{dailyLimit.total}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(dailyLimit.remaining / dailyLimit.total) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              className="w-full rounded-md border-gray-300 focus:border-coral-500 focus:ring-coral-500"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Documents
            </label>
            <select
              className="w-full rounded-md border-gray-300 focus:border-coral-500 focus:ring-coral-500"
              value={filters.documents}
              onChange={(e) => setFilters({ ...filters, documents: e.target.value })}
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Training Status
            </label>
            <select
              className="w-full rounded-md border-gray-300 focus:border-coral-500 focus:ring-coral-500"
              value={filters.training}
              onChange={(e) => setFilters({ ...filters, training: e.target.value })}
            >
              {trainingStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interview Date
            </label>
            <DatePicker
              selectsRange={true}
              startDate={filters.dateRange.startDate}
              endDate={filters.dateRange.endDate}
              onChange={handleDateChange}
              isClearable={true}
              className="w-full rounded-md border-gray-300 focus:border-coral-500 focus:ring-coral-500"
              placeholderText="Select date or range"
              dateFormat="dd.MM.yyyy"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-coral-500 hover:bg-coral-600"
          >
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interview
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Training
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {availableClients.map((client) => (
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
                    <div className="text-sm text-gray-900">{client.interview}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.documents}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.training}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleTakeClient(client.id)}
                      disabled={dailyLimit.remaining === 0}
                      className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                        dailyLimit.remaining > 0
                          ? 'text-coral-500 bg-coral-50 hover:bg-coral-100'
                          : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                      }`}
                    >
                      Take Client
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}