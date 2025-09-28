// This component handles the resume analysis functionality.
import React, { useEffect, useState } from 'react';
import ResumeUploader from './ResumeUploader';
import JobMatcher from './JobMatcher';
import ErrorPage from './ErrorPage';
import styles from '../styles/ResumeAnalyser.module.css';
import { useCompletion } from 'ai/react';
import { generateMockAnalysis } from '@/lib/mockData';

const ResumeAnalyser = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const [mockMode, setMockMode] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<'analysis' | 'parsing' | 'network' | 'invalid-document'>('analysis');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { completion, isLoading, complete, error } = useCompletion({
    api: '/api/matcher',
    onError: (error) => {
      console.error('useCompletion error:', error);
      setErrorType('network');
      setErrorMessage(error.message || 'Unknown error');
      setHasError(true);
      setIsLoadingResume(false);
    },
  });

  useEffect(() => {
    const getResumeInfo = async (text: string) => {
      try {
        if (mockMode) {
          // Use mock data for testing
          setTimeout(() => {
            setShowInfo(true);
            setIsLoadingResume(false);
            setHasError(false);
          }, 1000);
          return;
        }

        const messageToSend = `RESUME: ${text}\n\n-------\n\n`;
        console.log('Sending message to API:', messageToSend.substring(0, 100) + '...');
        await complete(messageToSend);
        console.log('Completion finished, completion length:', completion?.length || 0);
        setShowInfo(true);
        setIsLoadingResume(false);
        setHasError(false);
      } catch (error) {
        console.error('Error in resume analysis:', error);
        setErrorType('network');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
        setHasError(true);
        setIsLoadingResume(false);
      }
    };

    if (resumeText !== '') {
      getResumeInfo(resumeText).catch((error) => {
        console.error('Error in getResumeInfo:', error);
        setErrorType('network');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
        setHasError(true);
        setIsLoadingResume(false);
      });
    }
  }, [resumeText, mockMode, complete]);


  const getCurrentAnalysis = () => {
    if (mockMode) {
      return JSON.stringify(generateMockAnalysis());
    }
    return completion;
  };

  const handleRetry = () => {
    setHasError(false);
    setShowInfo(false);
    setResumeText('');
    setMockMode(false);
    setErrorMessage('');
  };

  const checkForError = (analysisData: string) => {
    try {
      // Check if the response contains error indicators
      if (analysisData.includes('undetermined') || 
          analysisData.includes('Unable to determine') ||
          analysisData.includes('Not determined') ||
          analysisData.includes('error') ||
          analysisData.includes('failed')) {
        setErrorType('analysis');
        setErrorMessage('Could not determine a suitable career path');
        setHasError(true);
        return true;
      }
      return false;
    } catch {
      setErrorType('parsing');
      setErrorMessage('Could not parse the analysis results');
      setHasError(true);
      return true;
    }
  };

  return (
    <div className={styles.analyzerWrapper}>
      {hasError ? (
        <ErrorPage 
          onRetry={handleRetry}
          errorType={errorType}
          errorMessage={errorMessage}
        />
      ) : !showInfo ? (
        <div className={styles.uploaderWrapper}>
          <p className={styles.instructionsText}>Upload your resume to see the recommended job.</p>
          <ResumeUploader 
            setIsLoading={setIsLoadingResume} 
            setResumeText={setResumeText}
            onResumeValidation={(isValid, errorMessage) => {
              console.log('Resume validation result:', { isValid, errorMessage });
              if (!isValid) {
                console.log('Setting error state for invalid document');
                setErrorType('invalid-document');
                setErrorMessage(errorMessage || 'Invalid document type');
                setHasError(true);
              }
            }}
          />
          <br/>
          
          {/* Demo Button */}
          {/* <div className="mt-4 text-center">
            <button
              onClick={handleMockDemo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md cursor-pointer"
            >
              🚀 Try Demo with Sample Data
            </button>
            <p className="text-xs text-gray-500 mt-2">
              See all the new features with sample analysis data
            </p>
          </div> */}
          
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
          <JobMatcher 
            jobMatch={getCurrentAnalysis()} 
            onError={(errorType, errorMessage) => {
              setErrorType(errorType);
              setErrorMessage(errorMessage);
              setHasError(true);
            }}
          />
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setShowInfo(false);
                setMockMode(false);
                setResumeText('');
                setHasError(false);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              ← Analyse Another Resume
            </button>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default ResumeAnalyser;