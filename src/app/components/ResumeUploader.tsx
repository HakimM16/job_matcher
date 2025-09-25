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
    // First check if we have any content at all
    if (!text || text.trim().length === 0) {
      return {
        isValid: false,
        errorMessage: 'No text content found in the document. Please ensure the PDF contains readable text.'
      };
    }

    const lowerText = text.toLowerCase();
    
    // Resume-related keywords that should be present
    const resumeKeywords = [
      'experience', 'education', 'skills', 'work', 'job', 'employment',
      'career', 'professional', 'qualification', 'degree', 'university',
      'college', 'certification', 'training', 'project', 'achievement',
      'responsibility', 'duties', 'position', 'role', 'company',
      'organization', 'cv', 'resume', 'curriculum vitae', 'summary',
      'objective', 'profile', 'background', 'employment history',
      'work history', 'professional experience', 'academic',
      'bachelor', 'master', 'phd', 'diploma', 'certificate'
    ];
    
    // Non-resume keywords that indicate wrong document type
    const nonResumeKeywords = [
      'invoice', 'receipt', 'bill', 'payment', 'bank statement',
      'contract', 'agreement', 'terms and conditions', 'court',
      'medical report', 'prescription', 'diagnosis', 'treatment', 'patient',
      'recipe', 'restaurant menu',
      'user manual', 'instruction manual', 'product guide', 'how to',
      'academic paper', 'research article', 'scientific journal',
      'newsletter', 'magazine', 'blog post',
      'price list', 'total amount', 'due date',
      'medication', 'doctor note',
      'ingredients list', 'cooking time', 'serves', 'preparation time',
      'invoice number', 'shipping address', 'billing address', 'purchase order',
      'statement of account', 'transaction', 'credit card', 'debit card',
      'insurance policy', 'claim', 'policy number', 'coverage',
      'prescription number', 'pharmacy', 'dosage', 'refill',
      'menu item', 'appetizer', 'main course', 'dessert', 'beverage',
      'table of contents', 'chapter', 'section', 'appendix', 'reference',
      'abstract', 'introduction', 'methodology', 'results', 'discussion',
      'conclusion', 'bibliography', 'citation', 'footnote',
      'newsletter subscription', 'editorial', 'advertisement',
      'press release', 'event invitation', 'wedding invitation',
      'birthday invitation', 'greeting card', 'thank you note',
      'packing list', 'shipping label', 'tracking number',
      'return policy', 'warranty', 'service agreement',
      'maintenance report', 'inspection report', 'audit', 'balance sheet',
      'income statement', 'profit and loss', 'tax return', 'tax form',
      'utility bill', 'electricity bill', 'water bill', 'gas bill',
      'lease agreement', 'rental agreement', 'mortgage', 'deed',
      'passport', 'visa', 'boarding pass', 'itinerary', 'travel plan',
      'flight ticket', 'hotel reservation', 'booking confirmation'
    ];
    
    // Check for non-resume content first
    const nonResumeMatches = nonResumeKeywords.filter(keyword => 
      lowerText.includes(keyword)
    );
    
    console.log('Non-resume keyword matches:', nonResumeMatches);
    
    if (nonResumeMatches.length >= 3) {
      return {
        isValid: false,
        errorMessage: `This document appears to be a ${nonResumeMatches[0]} document, not a resume. Please upload a CV or resume document.`
      };
    }
    
    // Check for resume content
    const resumeMatches = resumeKeywords.filter(keyword => 
      lowerText.includes(keyword)
    );
    
    console.log('Resume keyword matches:', resumeMatches);
    
    if (resumeMatches.length < 3) {
      return {
        isValid: false,
        errorMessage: 'This document doesn\'t contain enough resume-related content. Please upload a proper CV or resume with your work experience, education, and skills.'
      };
    }
    
    // Check minimum length
    if (text.trim().length < 100) {
      return {
        isValid: false,
        errorMessage: 'The document is too short to be analyzed. Please upload a complete resume.'
      };
    }
    
    // Additional check for common resume sections
    const hasExperience = lowerText.includes('experience') || lowerText.includes('employment') || lowerText.includes('work');
    const hasEducation = lowerText.includes('education') || lowerText.includes('degree') || lowerText.includes('university') || lowerText.includes('college');
    const hasSkills = lowerText.includes('skills') || lowerText.includes('technical') || lowerText.includes('proficient');
    
    if (!hasExperience && !hasEducation && !hasSkills) {
      return {
        isValid: false,
        errorMessage: 'This document doesn\'t appear to contain typical resume sections (experience, education, or skills). Please upload a proper CV or resume.'
      };
    }
    
    console.log('Document validation passed');
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
                console.log('Extracted text length:', extractedText.length);
                console.log('Extracted text preview:', extractedText.substring(0, 200));
                
                const validation = validateResumeContent(extractedText);
                console.log('Validation result:', validation);
                
                if (validation.isValid) {
                  setResumeText(extractedText);
                  if (onResumeValidation) {
                    onResumeValidation(true);
                  }
                } else {
                  console.log('Document validation failed:', validation.errorMessage);
                  if (onResumeValidation) {
                    onResumeValidation(false, validation.errorMessage);
                  }
                  setIsLoading(false);
                }
              }).catch((error) => {
                console.error('Error extracting text from PDF:', error);
                setIsLoading(false);
                if (onResumeValidation) {
                  onResumeValidation(false, 'Failed to extract text from PDF. The document might be corrupted or password-protected.');
                }
              });
            }).catch((error) => {
              console.error('Error getting PDF page:', error);
              setIsLoading(false);
              if (onResumeValidation) {
                onResumeValidation(false, 'Failed to process PDF page. The document might be corrupted.');
              }
            });
          },
          (reason) => {
            console.error(`Error during PDF loading: ${reason}`);
            setIsLoading(false);
            if (onResumeValidation) {
              onResumeValidation(false, 'Failed to load PDF document. Please ensure the file is not corrupted.');
            }
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