import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DocumentModel } from '../db/models/Document';
import { v4 as uuidv4 } from 'uuid';

interface Document {
  id: string;
  name: string;
  file: File | null;
  uploaded: boolean;
  status: 'pending' | 'accepted' | 'rejected';
  error?: string;
}

export default function DocumentsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'passport', name: 'Photo Passport', file: null, uploaded: false, status: 'pending' },
    { id: 'resume', name: 'Resume/CV', file: null, uploaded: false, status: 'pending' },
    { id: 'additional', name: 'Additional Documents', file: null, uploaded: false, status: 'pending' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDocuments = async () => {
      if (!user?.id) {
        setError('Please log in to view documents');
        setLoading(false);
        return;
      }

      try {
        const userDocs = await DocumentModel.findByUserId(user.id);
        if (userDocs) {
          setDocuments(prev => prev.map(doc => {
            const existingDoc = userDocs.find(d => d.type === doc.id);
            if (existingDoc) {
              return {
                ...doc,
                uploaded: true,
                status: existingDoc.status as 'pending' | 'accepted' | 'rejected'
              };
            }
            return doc;
          }));
        }
      } catch (err) {
        console.error('Error loading documents:', err);
        setError('Failed to load documents');
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, [user]);

  const handleFileChange = async (id: string, file: File | null) => {
    if (!file || !user?.id) return;

    try {
      const filename = `${uuidv4()}-${file.name}`;
      
      await DocumentModel.create({
        user_id: user.id,
        type: id,
        file_path: filename,
        status: 'pending'
      });

      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, file, uploaded: true, status: 'pending', error: undefined } : doc
      ));
    } catch (error) {
      console.error('Error uploading document:', error);
      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, error: 'Failed to upload document' } : doc
      ));
    }
  };

  const handleSkip = (id: string) => {
    if (id !== 'passport') {
      setDocuments(prev => prev.map(doc => 
        doc.id === id ? { ...doc, uploaded: true, status: 'pending' } : doc
      ));
    }
  };

  const handleContinue = () => {
    navigate('/consultation');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isPassportUploaded = documents.find(doc => doc.id === 'passport')?.uploaded;
  const canContinue = documents.every(doc => doc.uploaded);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h1>
          
          <div className="space-y-6">
            {documents.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                  {doc.id !== 'passport' && !doc.uploaded && (
                    <button
                      onClick={() => handleSkip(doc.id)}
                      className="text-sm text-coral-500 hover:text-coral-600"
                    >
                      Skip
                    </button>
                  )}
                </div>

                {doc.error && (
                  <div className="mb-4 flex items-center text-red-600">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span>{doc.error}</span>
                  </div>
                )}

                {doc.uploaded ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{doc.file ? doc.file.name : 'Skipped'}</span>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Click to upload or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                    />
                  </label>
                )}

                {doc.status === 'pending' && doc.uploaded && doc.file && (
                  <p className="mt-2 text-sm text-yellow-600">
                    Document is being reviewed
                  </p>
                )}
              </div>
            ))}
          </div>

          {canContinue && (
            <button
              onClick={handleContinue}
              className="mt-8 w-full bg-coral-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-600 transition-colors"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}