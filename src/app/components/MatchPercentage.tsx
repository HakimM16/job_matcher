'use client';

import React from 'react';
import { MatchPercentage } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import styles from '../styles/MatchPercentage.module.css';

interface MatchPercentageProps {
  matchPercentage: MatchPercentage;
  suggestedCareer: string;
  className?: string;
}

const MatchPercentageComponent: React.FC<MatchPercentageProps> = ({ 
  matchPercentage, 
  suggestedCareer,
  className = "" 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return styles.scoreGreen;
    if (score >= 60) return styles.scoreBlue;
    if (score >= 40) return styles.scoreYellow;
    return styles.scoreRed;
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return styles.bgGreen;
    if (score >= 60) return styles.bgBlue;
    if (score >= 40) return styles.bgYellow;
    return styles.bgRed;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { emoji: '🎉', message: 'Excellent match!' };
    if (score >= 60) return { emoji: '👍', message: 'Good match' };
    if (score >= 40) return { emoji: '📈', message: 'Room for growth' };
    return { emoji: '💪', message: 'Let&apos;s build those skills!' };
  };

  const categories = [
    {
      key: 'technical',
      title: 'Technical Skills',
      description: 'Programming and technical abilities',
      score: matchPercentage.technical
    },
    {
      key: 'experience',
      title: 'Experience',
      description: 'Relevant work experience',
      score: matchPercentage.experience
    },
    {
      key: 'education',
      title: 'Education',
      description: 'Educational background',
      score: matchPercentage.education
    }
  ];

  const overallMessage = getScoreMessage(matchPercentage.overall);

  return (
    <Card className={`${className} ${styles.container}`}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.title}>🎯</span>
          <CardTitle className={styles.title}>CV Match Score</CardTitle>
        </div>
        <CardDescription className={styles.description}>
          How well you match {suggestedCareer} requirements
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.content}>
        {/* Overall Score */}
        <div className={styles.overallScore}>
          <div className={styles.scoreCircle}>
            {/* Background Circle */}
            <div className={styles.backgroundCircle}></div>
            
            {/* Progress Circle */}
            <div 
              className={`${styles.progressCircle} ${getScoreBackground(matchPercentage.overall)}`}
              style={{
                background: `conic-gradient(from 0deg, var(--tw-gradient-stops) ${matchPercentage.overall * 3.6}deg, transparent ${matchPercentage.overall * 3.6}deg)`,
                borderRadius: '50%',
                mask: 'radial-gradient(circle at center, transparent 60%, black 60%)',
                WebkitMask: 'radial-gradient(circle at center, transparent 60%, black 60%)'
              }}
            ></div>
            
            {/* Score Text */}
            <div className={styles.scoreText}>
              <div className="text-center">
                <div className={`${styles.scoreValue} ${getScoreColor(matchPercentage.overall)}`}>
                  {matchPercentage.overall}%
                </div>
                <div className={styles.scoreLabel}>Overall</div>
              </div>
            </div>
          </div>
          
          <div className={styles.scoreMessage}>
            <div className={styles.messageTitle}>
              {overallMessage.emoji} {overallMessage.message}
            </div>
            <p className={styles.messageSubtitle}>
              You&apos;re {matchPercentage.overall >= 70 ? 'well-positioned' : 'on your way'} for this role
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={styles.breakdown}>
          <h4 className={styles.breakdownTitle}>Score Breakdown</h4>
          
          {categories.map((category) => {
            return (
              <div key={category.key} className={styles.category}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryTitle}>
                      {category.title}
                    </span>
                  </div>
                  <span className={`${styles.categoryScore} ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </span>
                </div>
                
                <div className={styles.progressBar}>
                  <div 
                    className={`${styles.progressFill} ${getScoreBackground(category.score)}`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
            );
          })}
        </div>

        {/* Improvement Suggestions */}
        <div className={styles.improvementTips}>
          <h4 className={styles.tipsTitle}>
            📈 Quick Improvement Tips
          </h4>
          
          <div className={styles.tipsList}>
            {matchPercentage.technical < 70 && (
              <div className={styles.tipItem}>
                <span className={styles.tipBullet}>•</span>
                <span className={styles.tipText}>Focus on building core technical skills for this role</span>
              </div>
            )}
            
            {matchPercentage.experience < 70 && (
              <div className={styles.tipItem}>
                <span className={styles.tipBullet}>•</span>
                <span className={styles.tipText}>Consider building portfolio projects to demonstrate experience</span>
              </div>
            )}
            
            {matchPercentage.education < 70 && (
              <div className={styles.tipItem}>
                <span className={styles.tipBullet}>•</span>
                <span className={styles.tipText}>Explore relevant courses or certifications to strengthen your background</span>
              </div>
            )}
            
            {matchPercentage.overall >= 70 && (
              <div className={styles.tipItem}>
                <span className={styles.tipBullet}>✓</span>
                <span className={styles.tipText}>You&apos;re in great shape! Focus on polishing your resume and portfolio</span>
              </div>
            )}
          </div>
        </div>
        <br/>

        {/* Match Summary */}
        <div className={styles.matchSummary}>
          <p className={styles.summaryText}>
            Based on your profile, you have a{' '}
            <span className={`${styles.summaryHighlight} ${getScoreColor(matchPercentage.overall)}`}>
              {matchPercentage.overall >= 70 ? 'strong' : matchPercentage.overall >= 50 ? 'moderate' : 'developing'}
            </span>{' '}
            match for <span className={styles.summaryCareer}>{suggestedCareer}</span> positions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchPercentageComponent;