// This component handles the resume analysis functionality.
import React, { useEffect, useState } from 'react';
import ResumeUploader from './ResumeUploader';
import JobMatcher from './JobMatcher';
import styles from '../styles/ResumeAnalyser.module.css';
import { useCompletion } from 'ai/react';
import { generateMockAnalysis } from '@/lib/mockData';

const ResumeAnalyser = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const [mockMode, setMockMode] = useState(false);
  const { completion, isLoading, complete, error } = useCompletion({
    api: '/api/matcher',
  });

  useEffect(() => {
    const getResumeInfo = async (text: string) => {
      if (mockMode) {
        // Use mock data for testing
        const mockAnalysis = generateMockAnalysis();
        setTimeout(() => {
          setShowInfo(true);
          setIsLoadingResume(false);
        }, 1000);
        return;
      }

      const messageToSend = `RESUME: ${text}\n\n-------\n\n`;
      await complete(messageToSend);
      setShowInfo(true);
      setIsLoadingResume(false);
    };

    if (resumeText !== '') {
      getResumeInfo(resumeText).then();
    }
  }, [resumeText, mockMode]);

  const handleMockDemo = () => {
    setMockMode(true);
    setResumeText('mock-demo-data');
    setIsLoadingResume(true);
  };

  const getCurrentAnalysis = () => {
    if (mockMode) {
      return JSON.stringify(generateMockAnalysis());
    }
    return completion;
  };

  return (
    <div className={styles.analyzerWrapper}>
      {!showInfo ? (
        <div className={styles.uploaderWrapper}>
          <p className={styles.instructionsText}>Upload your resume to see the recommended job.</p>
          <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
          <br/>
          
          {/* Demo Button */}
          <div className="mt-4 text-center">
            <button
              onClick={handleMockDemo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md cursor-pointer"
            >
              🚀 Try Demo with Sample Data
            </button>
            <p className="text-xs text-gray-500 mt-2">
              See all the new features with sample analysis data
            </p>
          </div>
          
          {(isLoadingResume || isLoading) && 
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
              <p className="text-sm text-gray-600 mt-2">
                {mockMode ? 'Loading demo analysis...' : 'Analysing your resume...'}
              </p>
            </div>}
        </div>
      ) : (
        <div>
          <JobMatcher jobMatch={getCurrentAnalysis()} />
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setShowInfo(false);
                setMockMode(false);
                setResumeText('');
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              ← Analyse Another Resume
            </button>
          </div>
        </div>
      )}
      {error && <p className={styles.errorMessage}>{error.message}</p>}
     
    </div>
  );
};

export default ResumeAnalyser;