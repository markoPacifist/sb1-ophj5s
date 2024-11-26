import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  Download,
  Info
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  description: string;
  status: 'accepted' | 'pending' | 'rejected' | 'not_uploaded';
  file: File | null;
  comment?: string;
  requirements: string[];
}

export default function DocumentsContent() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'passport',
      name: 'Passport',
      description: 'Main page with photo',
      status: 'accepted',
      file: null,
      requirements: [
        'Color scan of the main page',
        'PDF or JPG format',
        'Max size: 5MB'
      ]
    },
    {
      id: 'resume',
      name: 'Resume/CV',
      description: 'Your professional experience',
      status: 'pending',
      file: null,
      requirements: [
        'PDF format',
        'In English',
        'Max size: 5MB'
      ]
    },
    {
      id: 'medical',
      name: 'Medical Insurance',
      description: 'Valid medical insurance policy',
      status: 'rejected',
      file: null,
      comment: 'Document is expired. Please upload a valid insurance policy.',
      requirements: [
        'Valid insurance policy',
        'PDF or JPG format',
        'Max size: 5MB'
      ]
    },
    {
      id: 'photo',
      name: 'Photo 3x4',
      description: 'Recent photo for documents',
      status: 'not_uploaded',
      file: null,
      requirements: [
        'White background',
        'JPG format',
        'Max size: 2MB'
      ]
    }
  ]);

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'accepted':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'rejected':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Upload className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'accepted':
        return 'Accepted';
      case 'pending':
        return 'Under Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Not Uploaded';
    }
  };

  const handleFileUpload = (docId: string, file: File) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, file, status: 'pending' } : doc
    ));
  };

  const uploadedCount = documents.filter(doc => 
    ['accepted', 'pending'].includes(doc.status)
  ).length;

  const totalCount = documents.length;
  const progress = (uploadedCount / totalCount) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Your Documents
        </h1>
        <p className="mt-2 text-gray-600">
          Upload all required documents to proceed with your application.
        </p>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upload Progress</h2>
          <span className="text-lg font-semibold text-coral-500">
            {uploadedCount} of {totalCount} documents
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-coral-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <div key={doc.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    {getStatusIcon(doc.status)}
                    <h3 className="ml-2 text-lg font-medium text-gray-900">
                      {doc.name}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
                  
                  {doc.comment && (
                    <div className="mt-2 flex items-start text-sm text-red-600">
                      <Info className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                      <p>{doc.comment}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {doc.requirements.map((req, index) => (
                        <li key={index} className="text-sm text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="ml-6 flex items-center space-x-3">
                  {doc.file && (
                    <>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Download className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <label className="relative cursor-pointer">
                    <input
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.id, file);
                      }}
                    />
                    <span className={`
                      inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium
                      ${doc.status === 'rejected' || doc.status === 'not_uploaded'
                        ? 'bg-coral-500 text-white hover:bg-coral-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}>
                      {doc.status === 'rejected' ? 'Re-upload' : 'Upload'}
                    </span>
                  </label>
                </div>
              </div>

              {doc.status !== 'not_uploaded' && (
                <div className="mt-4 flex items-center">
                  <span className={`text-sm ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                  {doc.file && (
                    <span className="ml-4 text-sm text-gray-500">
                      {doc.file.name}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}