// This component handles the resume upload functionality.
import React, { useState } from 'react';
import type { TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import styles from '../styles/ResumeUploader.module.css';
import { MdCloudUpload } from "react-icons/md";

type Props = {
  setResumeText: React.Dispatch<React.SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onResumeValidation?: (isValid: boolean, errorMessage?: string) => void;
};

const ResumeUploader: React.FC<Props> = ({ setResumeText, setIsLoading, onResumeValidation }) => {
  const [error, setError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const mergeTextContent = (textContent: TextContent) => {
    return textContent.items
      .map((item) => {
        const { str, hasEOL } = item as TextItem;
        return str + (hasEOL ? '\n' : '');
      })
      .join('');
  };

  const validateResumeContent = (text: string): { isValid: boolean; errorMessage?: string } => {
    const lowerText = text.toLowerCase();
    
    // Resume-related keywords that should be present
    const resumeKeywords = [
      'experience', 'education', 'skills', 'work', 'job', 'employment',
      'career', 'professional', 'qualification', 'degree', 'university',
      'college', 'certification', 'training', 'project', 'achievement',
      'responsibility', 'duties', 'position', 'role', 'company',
      'organization', 'cv', 'resume', 'curriculum vitae'
    ];
    
    // Non-resume keywords that indicate wrong document type
    const nonResumeKeywords = [
      'invoice', 'receipt', 'bill', 'payment', 'financial', 'bank statement',
      'contract', 'agreement', 'terms', 'conditions', 'legal', 'court',
      'medical', 'prescription', 'diagnosis', 'treatment', 'patient',
      'recipe', 'cooking', 'food', 'restaurant', 'menu',
      'manual', 'instruction', 'guide', 'tutorial', 'how to',
      'academic paper', 'research', 'thesis', 'dissertation',
      'newsletter', 'magazine', 'article', 'blog', 'post'
    ];
    
    // Check for non-resume content
    const nonResumeMatches = nonResumeKeywords.filter(keyword => 
      lowerText.includes(keyword)
    );
    
    if (nonResumeMatches.length >= 3) {
      return {
        isValid: false,
        errorMessage: 'This document doesn\'t appear to be a resume. Please upload a CV or resume document.'
      };
    }
    
    // Check for resume content
    const resumeMatches = resumeKeywords.filter(keyword => 
      lowerText.includes(keyword)
    );
    
    if (resumeMatches.length < 3) {
      return {
        isValid: false,
        errorMessage: 'This document doesn\'t contain enough resume-related content. Please upload a proper CV or resume.'
      };
    }
    
    // Check minimum length
    if (text.trim().length < 100) {
      return {
        isValid: false,
        errorMessage: 'The document is too short to be analyzed. Please upload a complete resume.'
      };
    }
    
    return { isValid: true };
  };

  const readResume = async (pdfFile: File | undefined) => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    if (!pdfFile) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result;
      if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
        const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
        loadingTask.promise.then(
          (pdfDoc) => {
            pdfDoc.getPage(1).then((page) => {
              page.getTextContent().then((textContent) => {
                const extractedText = mergeTextContent(textContent);
                
                // Validate the content
                const validation = validateResumeContent(extractedText);
                
                if (validation.isValid) {
                  setResumeText(extractedText);
                  if (onResumeValidation) {
                    onResumeValidation(true);
                  }
                } else {
                  if (onResumeValidation) {
                    onResumeValidation(false, validation.errorMessage);
                  }
                  setIsLoading(false);
                }
              });
            });
          },
          (reason) => {
            console.error(`Error during PDF loading: ${reason}`);
          }
        );
      }
    };
    reader.readAsArrayBuffer(pdfFile);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setResumeText('');
    setError('');
    setIsLoading(true);

    try {
      const items = event.dataTransfer.items;

      if (!items || items.length !== 1) {
        throw new Error('Please drop a single file.');
      }
      const item = items[0];

      if (item.kind !== 'file' || item.type !== 'application/pdf') {
        throw new Error('Please drop a single PDF file.');
      }
      const file = item.getAsFile();

      if (!file) {
        throw new Error("The PDF wasn't uploaded correctly.");
      }
      await readResume(file);
    } catch {
      setError('There was an error reading the resume. Please try again.');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleButtonUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setIsLoading(true);
    setResumeText('');

    try {
      const file = event.target.files?.[0];
      if (!file) {
        setError("The PDF wasn't uploaded correctly.");
        setIsLoading(false);
        return;
      }
      await readResume(file);
    } catch {
      setError('There was an error reading the resume. Please try again.');
    }
  };

  return (
    <div>
      <div
        className={`${styles.fileUploadBtnContainer} ${isDragOver ? styles.dragOver : ''}`}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e)}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => handleDragOver(e)}
        onDragEnter={(e: React.DragEvent<HTMLDivElement>) => handleDragEnter(e)}
      >
        <input
          type="file"
          id="file-upload"
          onChange={handleButtonUpload}
          accept="application/pdf"
          hidden
        />
        <label htmlFor="file-upload" className={`${styles.label} ${styles.mainBtn}`}>
          <MdCloudUpload /> Upload resume
        </label>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ResumeUploader;