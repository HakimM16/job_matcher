'use client';

import React from 'react';
import { StrengthsAnalysis } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import styles from '../styles/StrengthsSkills.module.css';

interface StrengthsSkillsProps {
  strengths: StrengthsAnalysis;
  className?: string;
}

const StrengthsSkills: React.FC<StrengthsSkillsProps> = ({ strengths, className = "" }) => {

  const sections = [
    {
      key: 'highlightedSkills' as keyof StrengthsAnalysis,
      title: '⭐ Highlighted Skills',
      description: 'Your standout technical abilities',
      items: strengths.highlightedSkills
    },
    {
      key: 'keyStrengths' as keyof StrengthsAnalysis,
      title: '💪 Key Strengths',
      description: 'What makes you unique',
      items: strengths.keyStrengths
    },
    {
      key: 'experienceHighlights' as keyof StrengthsAnalysis,
      title: '🏆 Experience Highlights',
      description: 'Your proven track record',
      items: strengths.experienceHighlights
    },
    {
      key: 'softSkills' as keyof StrengthsAnalysis,
      title: '❤️ Soft Skills',
      description: 'Your interpersonal superpowers',
      items: strengths.softSkills
    },
    {
      key: 'positiveIndicators' as keyof StrengthsAnalysis,
      title: '⚡ Positive Indicators',
      description: 'Signals of your potential',
      items: strengths.positiveIndicators
    }
  ];

  const totalStrengths = sections.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <Card className={`${className} ${styles.container}`}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.title}>💪</span>
          <CardTitle className={styles.title}>Your Strengths & Skills</CardTitle>
        </div>
        <CardDescription className={styles.description}>
          🎉 We found {totalStrengths} awesome things about your profile! Here&apos;s what makes you shine:
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.content}>
        {sections.map((section) => {
          if (!section.items || section.items.length === 0) return null;
          
          return (
            <div key={section.key} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h5 className={styles.sectionTitle}>{section.title}</h5>
                <p className={styles.sectionDescription}>{section.description}</p>
              </div>
              
              <div className={styles.skillsGrid}>
                {section.items.map((item, index) => (
                  <span
                    key={index}
                    className={styles.skillItem}
                    style={{
                      background: 'linear-gradient(45deg, #a7310d, #e08317)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 10px rgba(224, 131, 23, 0.3)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <br/>
        
        {totalStrengths === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>⭐</div>
            <p className={styles.emptyTitle}>No strengths data available yet.</p>
            <p className={styles.emptySubtitle}>Upload your resume to discover your superpowers!</p>
          </div>
        )}
        
        {totalStrengths > 0 && (
          <div className={styles.summary}>
            <div className={styles.summaryTitle}>🏆 Strengths Summary</div>
            <p className={styles.summaryText}>
              You have a strong foundation with {strengths.highlightedSkills?.length || 0} key technical skills,
              {' '}{strengths.keyStrengths?.length || 0} core strengths, and
              {' '}{strengths.softSkills?.length || 0} valuable soft skills. 
              This combination makes you a well-rounded candidate! 🚀
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrengthsSkills;