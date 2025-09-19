'use client';

import React from 'react';
import { JobMarketData } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { getTrendEmoji } from '@/lib/analysisUtils';
import styles from '../styles/JobMarketDemand.module.css';

interface JobMarketDemandProps {
  jobMarket: JobMarketData;
  suggestedCareer: string;
  className?: string;
}

const JobMarketDemand: React.FC<JobMarketDemandProps> = ({ 
  jobMarket, 
  suggestedCareer,
  className = "" 
}) => {
  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'Growing': return '↗';
      case 'Declining': return '↘';
      default: return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Growing': return styles.trendGrowing;
      case 'Declining': return styles.trendDeclining;
      default: return styles.trendStable;
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'Low': return styles.competitionLow;
      case 'High': return styles.competitionHigh;
      default: return styles.competitionMedium;
    }
  };

  const getDemandLevel = (score: number) => {
    if (score >= 80) return { level: 'Very High', color: styles.demandScoreHigh };
    if (score >= 60) return { level: 'High', color: styles.demandScoreHigh };
    if (score >= 40) return { level: 'Moderate', color: styles.demandScoreMedium };
    return { level: 'Low', color: styles.demandScoreLow };
  };

  const demandLevel = getDemandLevel(jobMarket.demandScore);

  return (
    <Card className={`${className} ${styles.container}`}>
      <CardHeader className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.title}>📈</span>
          <CardTitle className={styles.title}>Job Market Demand</CardTitle>
        </div>
        <CardDescription className={styles.description}>
          Market insights for {suggestedCareer} {getTrendEmoji(jobMarket.trend)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.content}>
        {/* Demand Score */}
        <div className={styles.demandSection}>
          <div className={styles.demandHeader}>
            <span className={styles.demandLabel}>Market Demand</span>
            <span className={`${styles.demandScore} ${demandLevel.color}`}>
              {jobMarket.demandScore}/100
            </span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${jobMarket.demandScore}%` }}
            />
          </div>
          <p className={styles.demandDescription}>
            <span className={`${styles.demandLevel} ${demandLevel.color}`}>
              {demandLevel.level}
            </span> demand in the current market
          </p>
        </div>
        <br />

        {/* Key Metrics */}
        <div className={styles.metricsGrid}>
          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span className={styles.iconPlaceholder}></span>
              <span className={styles.metricLabel}>Growth Trend</span>
            </div>
            <Badge className={getTrendColor(jobMarket.trend)}>
              {getTrendText(jobMarket.trend)} {jobMarket.trend} (+{jobMarket.growthRate}%)
            </Badge>
          </div>

          <div className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span className={styles.iconPlaceholder}></span>
              <span className={styles.metricLabel}>Competition</span>
            </div>
            <Badge className={getCompetitionColor(jobMarket.competitionLevel)}>
              {jobMarket.competitionLevel} Competition
            </Badge>
          </div>
        </div>
        <br />

        {/* Remote Opportunities */}
        <div className={styles.remoteSection}>
          <div className={styles.remoteHeader}>
            <span className={styles.iconPlaceholder}></span>
            <span className={styles.remoteLabel}>Remote Work Opportunities</span>
          </div>
          <div className={styles.remoteProgress}>
            <div className={styles.remoteBar}>
              <div 
                className={styles.remoteFill}
                style={{ width: `${jobMarket.remoteOpportunities}%` }}
              />
            </div>
            <span className={styles.remotePercentage}>
              {jobMarket.remoteOpportunities}%
            </span>
          </div>
          <p className={styles.remoteDescription}>
            of {suggestedCareer} positions offer remote work options
          </p>
        </div>

        {/* Market Insights */}
        {jobMarket.marketInsights && jobMarket.marketInsights.length > 0 && (
          <div className={styles.insightsSection}>
            <h4 className={styles.insightsHeader}>
              <span className={styles.iconPlaceholder}></span>
              Market Insights
            </h4>
            <div className={styles.insightsList}>
              {jobMarket.marketInsights.map((insight, index) => (
                <div key={index} className={styles.insightItem}>
                  <span className={styles.insightBullet}>•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Region Specific Data */}
        {jobMarket.regionSpecific && (
          <div className={styles.regionSection}>
            <div className={styles.regionHeader}>
              <span className={styles.iconPlaceholder}></span>
              <span className={styles.regionTitle}>Regional Data: {jobMarket.regionSpecific.location}</span>
            </div>
            <div className={styles.regionGrid}>
              <div className={styles.regionItem}>
                <span>Local Demand:</span>
                <span className={styles.regionValue}>
                  {jobMarket.regionSpecific.localDemand}/100
                </span>
              </div>
              <div className={styles.regionItem}>
                <span>Avg. Salary:</span>
                <span className={styles.regionValue}>
                  {jobMarket.regionSpecific.averageSalary.currency}{jobMarket.regionSpecific.averageSalary.mid.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className={styles.summarySection}>
          <h4 className={styles.summaryTitle}>Market Summary</h4>
          <p className={styles.summaryText}>
            The market for {suggestedCareer} shows <span className={styles.summaryStrong}>{demandLevel.level.toLowerCase()}</span> demand 
            with a <span className={styles.summaryStrong}>{jobMarket.trend.toLowerCase()}</span> trend. 
            Competition is <span className={styles.summaryStrong}>{jobMarket.competitionLevel.toLowerCase()}</span>, and 
            <span className={styles.summaryStrong}> {jobMarket.remoteOpportunities}%</span> of positions offer remote work flexibility.
            {jobMarket.growthRate > 0 && (
              <> The field is growing at <span className={styles.summaryStrong}>{jobMarket.growthRate}%</span> annually.</>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobMarketDemand;