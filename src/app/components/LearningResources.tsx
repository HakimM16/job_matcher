'use client';

import React, { useState } from 'react';
import { LearningResource } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import styles from '../styles/LearningResources.module.css';

interface LearningResourcesProps {
  resources: LearningResource[];
  className?: string;
}

const LearningResources: React.FC<LearningResourcesProps> = ({ resources, className = "" }) => {
  const [filter, setFilter] = useState<'all' | 'free' | 'course' | 'certification'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const getTypeText = (type: string) => {
    switch (type) {
      case 'Course': return '▶';
      case 'Certification': return '🏆';
      case 'Tutorial': return '📖';
      case 'Book': return '📚';
      case 'Documentation': return '📄';
      default: return '📖';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Course': return styles.badgeCourse;
      case 'Certification': return styles.badgeCertification;
      case 'Tutorial': return styles.badgeTutorial;
      case 'Book': return styles.badgeBook;
      case 'Documentation': return styles.badgeDocumentation;
      default: return styles.badgeCourse;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return styles.badgeDifficultyBeginner;
      case 'Intermediate': return styles.badgeDifficultyIntermediate;
      case 'Advanced': return styles.badgeDifficultyAdvanced;
      default: return styles.badgeOutline;
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Free': return styles.badgeCostFree;
      case 'Freemium': return styles.badgeCostFreemium;
      case 'Paid': return styles.badgeCostPaid;
      default: return styles.badgeOutline;
    }
  };

  const filteredResources = resources.filter(resource => {
    if (filter === 'free' && resource.cost !== 'Free') return false;
    if (filter === 'course' && resource.type !== 'Course') return false;
    if (filter === 'certification' && resource.type !== 'Certification') return false;
    if (difficultyFilter !== 'all' && resource.difficulty !== difficultyFilter) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className={styles.star}>★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.starHalf}>☆</span>);
    }
    return stars;
  };

  const uniqueDifficulties = Array.from(new Set(resources.map(r => r.difficulty)));

  return (
    <Card className={`${className} ${styles.container}`}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.title}>📖</div>
          <CardTitle className={styles.title}>Learning Resources</CardTitle>
        </div>
        <CardDescription className={styles.description}>
          Curated courses and tutorials to fill your skill gaps 📚
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.content}>
        {/* Filters */}
        {resources.length > 0 && (
          <div className={styles.filtersSection}>
            <div className={styles.filterHeader}>
              <span className={styles.iconPlaceholder}></span>
              <span className={styles.filterLabel}>Filter Resources</span>
            </div>
            
            <div className={styles.filterButtons}>
              <button
                onClick={() => setFilter('all')}
                className={`${styles.filterButton} ${
                  filter === 'all' 
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive
                }`}
              >
                All ({resources.length})
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`${styles.filterButton} ${
                  filter === 'free' 
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive
                }`}
              >
                Free ({resources.filter(r => r.cost === 'Free').length})
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`${styles.filterButton} ${
                  filter === 'course' 
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive
                }`}
              >
                Courses ({resources.filter(r => r.type === 'Course').length})
              </button>
              <button
                onClick={() => setFilter('certification')}
                className={`${styles.filterButton} ${
                  filter === 'certification' 
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive
                }`}
              >
                Certifications ({resources.filter(r => r.type === 'Certification').length})
              </button>
            </div>

            <div className={styles.difficultyButtons}>
              <button
                onClick={() => setDifficultyFilter('all')}
                className={`${styles.filterButton} ${
                  difficultyFilter === 'all' 
                    ? styles.filterButtonActive
                    : styles.filterButtonInactive
                }`}
              >
                All Levels
              </button>
              {uniqueDifficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={`${styles.filterButton} ${
                    difficultyFilter === difficulty 
                      ? styles.filterButtonActive
                      : styles.filterButtonInactive
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        )}
        <br />

        {/* Resources List */}
        <div className={styles.resourcesList}>
          {filteredResources.length === 0 && resources.length > 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}></div>
              <p className={styles.emptyStateText}>No resources match your current filters.</p>
              <p className={styles.emptyStateSubtext}>Try adjusting the filters above.</p>
            </div>
          )}

          {resources.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}></div>
              <p className={styles.emptyStateText}>No learning resources available yet.</p>
              <p className={styles.emptyStateSubtext}>Resources will be recommended after analysis.</p>
            </div>
          )}

          {filteredResources.map((resource, index) => (
            <div key={index} className={styles.resourceItem}>
              <div className={styles.resourceContent}>
                {/* Resource Header */}
                <div className={styles.resourceHeader}>
                  <div className={styles.resourceInfo}>
                    <div className={styles.resourceTitleRow}>
                      <span>{getTypeText(resource.type)}</span>
                      <h4 className={styles.resourceTitle}>
                        {resource.title}
                      </h4>
                      <span 
                        className={styles.externalLink}
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        🔗
                      </span>
                    </div>
                    <p className={styles.resourceDescription}>{resource.description}</p>
                    <p className={styles.resourceProvider}>by {resource.provider}</p>
                  </div>
                </div>

                {/* Resource Details */}
                <div className={styles.resourceDetails}>
                  <Badge className={getTypeColor(resource.type)}>
                    <span>{getTypeText(resource.type)}</span>
                    <span style={{ marginLeft: '0.25rem' }}>{resource.type}</span>
                  </Badge>
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                  <Badge className={getCostColor(resource.cost)}>
                    <span style={{ marginRight: '0.25rem' }}>💰</span>
                    {resource.cost}
                  </Badge>
                  <Badge className={styles.badgeOutline}>
                    <span style={{ marginRight: '0.25rem' }}>⏱️</span>
                    {resource.duration}
                  </Badge>
                </div>

                {/* Rating & Skills */}
                <div className={styles.ratingSection}>
                  <div className={styles.ratingStars}>
                    <div className={styles.ratingStars}>
                      {renderStars(resource.rating)}
                    </div>
                    <span className={styles.ratingText}>
                      {resource.rating.toFixed(1)}
                    </span>
                  </div>
                  
                  {resource.skills && resource.skills.length > 0 && (
                    <div className={styles.skillsContainer}>
                      {resource.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} className={styles.skillBadge}>
                          {skill}
                        </Badge>
                      ))}
                      {resource.skills.length > 3 && (
                        <Badge className={styles.skillBadge}>
                          +{resource.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.open(resource.url, '_blank')}
                  className={styles.ctaButton}
                >
                  Start Learning
                  <span>🔗</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {filteredResources.length > 0 && (
          <div className={styles.summarySection}>
            <h4 className={styles.summaryTitle}>Learning Insights</h4>
            <div className={styles.summaryContent}>
              <p>
                <span className={styles.summaryStrong}>{resources.filter(r => r.cost === 'Free').length}</span> free resources available
              </p>
              <p>
                <span className={styles.summaryStrong}>{resources.filter(r => r.type === 'Certification').length}</span> certification opportunities
              </p>
              <p>
                Average rating: <span className={styles.summaryStrong}>
                  {(resources.reduce((acc, r) => acc + r.rating, 0) / resources.length).toFixed(1)}
                </span> ⭐
              </p>
              <p className={styles.summarySubtext}>
                💡 Start with free resources to build foundation, then pursue paid courses for advanced skills.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningResources;