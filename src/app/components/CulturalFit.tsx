'use client';

import React from 'react';
import { CulturalFitAnalysis } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import styles from '../styles/CulturalFit.module.css';

interface CulturalFitProps {
  culturalFit: CulturalFitAnalysis;
  className?: string;
}

const CulturalFit: React.FC<CulturalFitProps> = ({ culturalFit, className = "" }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'yellow';
    return 'red';
  };

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case 'Startup': return '🚀';
      case 'Corporate': return '🏢';
      case 'Agency': return '⚡';
      case 'Consultancy': return '💼';
      case 'Non-profit': return '🌱';
      default: return '🏢';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return '🎯';
      case 'Medium': return '⚖️';
      case 'Low': return '🛡️';
      default: return '⚖️';
    }
  };

  const getWorkStyleIcon = (style: string) => {
    switch (style) {
      case 'Independent': return '🎯';
      case 'Collaborative': return '🤝';
      case 'Mixed': return '🔄';
      default: return '🤝';
    }
  };

  const environmentScores = [
    { name: 'Startup', score: culturalFit.culturalFitScores.startup, icon: '🚀' },
    { name: 'Corporate', score: culturalFit.culturalFitScores.corporate, icon: '🏢' },
    { name: 'Agency', score: culturalFit.culturalFitScores.agency, icon: '⚡' },
    { name: 'Non-profit', score: culturalFit.culturalFitScores.nonprofit, icon: '🌱' }
  ].sort((a, b) => b.score - a.score);

  const topEnvironment = environmentScores[0];

  return (
    <Card className={`${className} ${styles.culturalFitCard}`}>
      <CardHeader className={styles.culturalFitHeader}>
        <div className={styles.culturalFitTitleContainer}>
          <span className={styles.culturalFitIcon}>🎯</span>
          <CardTitle className={styles.culturalFitTitle}>Cultural Fit Analysis</CardTitle>
        </div>
        <CardDescription className={styles.culturalFitDescription}>
          Find your ideal work environment and company culture 🎯
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.culturalFitContent}>
        {/* Best Environment Match */}
        <div className={styles.bestEnvironmentSection}>
          <div className={styles.bestEnvironmentIcon}>{topEnvironment.icon}</div>
          <h3 className={styles.bestEnvironmentTitle}>
            {topEnvironment.name} Environment
          </h3>
          <div className={styles.bestEnvironmentScore}>
            {topEnvironment.score}% Match
          </div>
          <p className={styles.bestEnvironmentDescription}>
            This environment aligns best with your working style and preferences
          </p>
        </div>
        <br />

        {/* Environment Scores */}
        <div className={styles.environmentScoresSection}>
          <h4 className={styles.environmentScoresTitle}>Environment Fit Scores</h4>
          {environmentScores.map((env) => (
            <div key={env.name} className={styles.environmentScoreItem}>
              <div className={styles.environmentScoreHeader}>
                <div className={styles.environmentScoreInfo}>
                  <span className={styles.environmentScoreIcon}>{env.icon}</span>
                  <span className={styles.environmentScoreName}>{env.name}</span>
                </div>
                <span className={styles.environmentScoreValue}>{env.score}%</span>
              </div>
              <div className={styles.environmentScoreBar}>
                <div 
                  className={styles.environmentScoreBarFill}
                  style={{ width: `${env.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Work Preferences */}
        <div className={styles.workPreferencesGrid}>
          <div className={styles.workPreferencesSection}>
            <h4 className={styles.workPreferencesTitle}>Work Style</h4>
            <div className={styles.workPreferencesList}>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceEmoji}>{getWorkStyleIcon(culturalFit.workStyle)}</span>
                <Badge variant="outline">{culturalFit.workStyle}</Badge>
              </div>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceIcon}>👥</span>
                <Badge variant="outline">{culturalFit.teamSize} Team</Badge>
              </div>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceIcon}>📍</span>
                <Badge variant="outline">{culturalFit.workArrangement}</Badge>
              </div>
            </div>
          </div>

          <div className={styles.workPreferencesSection}>
            <h4 className={styles.workPreferencesTitle}>Preferences</h4>
            <div className={styles.workPreferencesList}>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceIcon}>💡</span>
                <Badge variant="outline">{culturalFit.innovationLevel} Innovation</Badge>
              </div>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceEmoji}>{getRiskIcon(culturalFit.riskTolerance)}</span>
                <Badge variant="outline">{culturalFit.riskTolerance} Risk</Badge>
              </div>
              <div className={styles.workPreferenceItem}>
                <span className={styles.workPreferenceIcon}>📈</span>
                <Badge variant="outline">{culturalFit.managementStyle}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Personality Traits */}
        {culturalFit.personalityTraits && culturalFit.personalityTraits.length > 0 && (
          <div className={styles.personalityTraitsSection}>
            <h4 className={styles.personalityTraitsTitle}>Personality Traits</h4>
            <div className={styles.personalityTraitsList}>
              {culturalFit.personalityTraits.map((trait, index) => (
                <Badge 
                  key={index}
                  className={styles.personalityTraitBadge}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Environment Recommendations */}
        <div className={styles.environmentRecommendations}>
          <h4 className={styles.environmentRecommendationsTitle}>
            <span className={styles.environmentRecommendationsIcon}>📊</span>
            Cultural Fit Insights
          </h4>
          
          <div className={styles.environmentRecommendationsContent}>
            <div className={styles.environmentRecommendationItem}>
              <span className={styles.environmentRecommendationBullet}>•</span>
              <div className={styles.environmentRecommendationText}>
                <span className={styles.environmentRecommendationStrong}>Best Match:</span> You're most aligned with{' '}
                <span className={styles.environmentRecommendationStrong}>{topEnvironment.name.toLowerCase()}</span> environments
                ({topEnvironment.score}% compatibility)
              </div>
            </div>
            
            <div className={styles.environmentRecommendationItem}>
              <span className={styles.environmentRecommendationBullet}>•</span>
              <div className={styles.environmentRecommendationText}>
                <span className={styles.environmentRecommendationStrong}>Work Style:</span> You prefer{' '}
                <span className={styles.environmentRecommendationStrong}>{culturalFit.workStyle.toLowerCase()}</span> work with{' '}
                <span className={styles.environmentRecommendationStrong}>{culturalFit.managementStyle.toLowerCase()}</span> management
              </div>
            </div>
            
            <div className={styles.environmentRecommendationItem}>
              <span className={styles.environmentRecommendationBullet}>•</span>
              <div className={styles.environmentRecommendationText}>
                <span className={styles.environmentRecommendationStrong}>Innovation Level:</span> You thrive in{' '}
                <span className={styles.environmentRecommendationStrong}>{culturalFit.innovationLevel.toLowerCase()}</span> innovation environments
              </div>
            </div>
            
            {culturalFit.riskTolerance && (
              <div className={styles.environmentRecommendationItem}>
                <span className={styles.environmentRecommendationBullet}>•</span>
                <div className={styles.environmentRecommendationText}>
                  <span className={styles.environmentRecommendationStrong}>Risk Preference:</span> You're comfortable with{' '}
                  <span className={styles.environmentRecommendationStrong}>{culturalFit.riskTolerance.toLowerCase()}</span> risk levels
                </div>
              </div>
            )}
          </div>
        </div>
        <br />

        {/* Company Size Recommendation */}
        <div className={styles.companySizeRecommendation}>
          <p className={styles.companySizeRecommendationText}>
            💡 <span className={styles.companySizeRecommendationStrong}>Tip:</span> Focus your job search on{' '}
            <span className={styles.companySizeRecommendationHighlight}>{topEnvironment.name.toLowerCase()}</span> companies
            that value <span className={styles.companySizeRecommendationStrong}>{culturalFit.workStyle.toLowerCase()}</span> work styles
            and offer <span className={styles.companySizeRecommendationStrong}>{culturalFit.workArrangement.toLowerCase()}</span> arrangements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalFit;