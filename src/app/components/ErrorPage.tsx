'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import styles from '../styles/ErrorPage.module.css';

interface ErrorPageProps {
  onRetry: () => void;
  errorType?: 'analysis' | 'parsing' | 'network' | 'invalid-document';
  errorMessage?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ 
  onRetry, 
  errorType = 'analysis',
  errorMessage 
}) => {
  const getErrorContent = () => {
    switch (errorType) {
      case 'analysis':
        return {
          icon: '⚠️',
          title: 'Analysis Error',
          description: 'We couldn\'t determine a suitable career path from your resume.',
          details: 'This might be due to insufficient information or unclear formatting. Please try uploading a more detailed resume.'
        };
      case 'parsing':
        return {
          icon: '🔧',
          title: 'Processing Error',
          description: 'We encountered an issue processing your resume.',
          details: 'The resume format might not be supported or the content couldn\'t be properly analyzed.'
        };
      case 'network':
        return {
          icon: '🌐',
          title: 'Connection Error',
          description: 'We couldn\'t connect to our analysis service.',
          details: 'Please check your internet connection and try again.'
        };
      case 'invalid-document':
        return {
          icon: '📄',
          title: 'Invalid Document',
          description: 'The uploaded file doesn\'t appear to be a resume or CV.',
          details: 'Please upload a proper resume document that contains your work experience, education, and skills.'
        };
      default:
        return {
          icon: '❌',
          title: 'Something went wrong',
          description: 'An unexpected error occurred.',
          details: 'Please try again or contact support if the problem persists.'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className={styles.analyzerWrapper}>
      <div className={styles.errorContainer}>
        <Card className={styles.errorCard}>
          <CardHeader className={styles.errorHeader}>
            <div className={styles.errorIcon}>{errorContent.icon}</div>
            <CardTitle className={styles.errorTitle}>{errorContent.title}</CardTitle>
            <CardDescription className={styles.errorDescription}>
              {errorContent.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className={styles.errorContent}>
            <div className={styles.errorDetails}>
              <p className={styles.errorDetailsText}>
                {errorContent.details}
              </p>
              {errorMessage && (
                <p className={styles.errorMessage}>
                  Error: {errorMessage}
                </p>
              )}
            </div>
            <br />
            <div className={styles.errorActions}>
              <button
                onClick={onRetry}
                className={styles.retryButton}
              >
                🔄 Try Again
              </button>
              
              <div className={styles.helpSection}>
                <p className={styles.helpText}>
                  Need help? Make sure your resume:
                </p>
                <ul className={styles.helpList}>
                  <li className={styles.helpListItem}>• Contains clear job titles and descriptions</li>
                  <li className={styles.helpListItem}>• Lists your skills and experience</li>
                  <li className={styles.helpListItem}>• Is in PDF format</li>
                  <li className={styles.helpListItem}>• Has readable text (not scanned image)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ErrorPage;
