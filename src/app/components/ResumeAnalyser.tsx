// This component handles the resume analysis functionality.
import React, { useEffect, useState } from 'react';
import ResumeUploader from './ResumeUploader';
import JobMatcher from './JobMatcher';
import styles from '../styles/ResumeAnalyser.module.css';
import { useCompletion } from 'ai/react';

const ResumeAnalyser = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [isLoadingResume, setIsLoadingResume] = useState(false);
  const [resumeText, setResumeText] = useState<string>('');
  const { completion, isLoading, complete, error } = useCompletion({
    api: '/api/matcher',
  });

  useEffect(() => {
    const getResumeInfo = async (text: string) => {
      const messageToSend = `RESUME: ${text}\n\n-------\n\n`;
      await complete(messageToSend);
      setShowInfo(true);
      setIsLoadingResume(false);
    };

    if (resumeText !== '') {
      getResumeInfo(resumeText).then();
    }
  }, [resumeText]);

  return (
    <div className={styles.analyzerWrapper}>
      {!showInfo ? (
        <div className={styles.uploaderWrapper}>
          <p className={styles.instructionsText}>Upload your resume to the recommended job.</p>
          <ResumeUploader setIsLoading={setIsLoadingResume} setResumeText={setResumeText} />
          {(isLoadingResume || isLoading) && 
            <div className={styles.loadingContainer}>
              <div className={styles.loadingSpinner}></div>
            </div>}
        </div>
      ) : (
        <JobMatcher jobMatch={completion} />
      )}
      {error && <p className={styles.errorMessage}>{error.message}</p>}
     
    </div>
  );
};

export default ResumeAnalyser;