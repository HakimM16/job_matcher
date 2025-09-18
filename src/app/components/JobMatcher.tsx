'use client';

import React, { useState, useEffect } from 'react';
import { ComprehensiveAnalysis } from '@/types/analysis';
import { parseComprehensiveAnalysis, parseLegacyFormat } from '@/lib/analysisUtils';
import styles from '../styles/JobMatcher.module.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

// Import new components
import StrengthsSkills from './StrengthsSkills';
import JobMarketDemand from './JobMarketDemand';
import TopCompanies from './TopCompanies';
import LearningResources from './LearningResources';
import MatchPercentage from './MatchPercentage';
import CulturalFit from './CulturalFit';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface JobMatcherProps {
  jobMatch: string;
}

const JobMatcher: React.FC<JobMatcherProps> = ({ jobMatch }) => {
  const [analysis, setAnalysis] = useState<ComprehensiveAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (jobMatch) {
      setIsLoading(true);
      
      // Try to parse as comprehensive analysis first
      const comprehensiveAnalysis = parseComprehensiveAnalysis(jobMatch);
      
      if (comprehensiveAnalysis) {
        setAnalysis(comprehensiveAnalysis);
      } else {
        // Fallback to legacy format
        const legacyAnalysis = parseLegacyFormat(jobMatch);
        setAnalysis(legacyAnalysis as ComprehensiveAnalysis);
      }
      
      setIsLoading(false);
    }
  }, [jobMatch]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className={styles.container}>
        <div className="text-center py-12">
          <p className="text-gray-600">Unable to parse analysis results.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className={styles.worth}>{analysis.suggestedCareer}</div>
        <p className={styles.subtitle}>Recommended career path</p>
        
        {analysis.matchPercentage && (
          <p className={`${styles.matchText} mt-4`}>
            <span className={styles.matchValue}>{analysis.matchPercentage.overall}%</span> match
          </p>
        )}
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          <TabsTrigger value="overview" className="flex-1 min-w-[120px]">Overview</TabsTrigger>
          <TabsTrigger value="strengths" className="flex-1 min-w-[120px]">Strengths</TabsTrigger>
          <TabsTrigger value="market" className="flex-1 min-w-[120px]">Market</TabsTrigger>
          <TabsTrigger value="resources" className="flex-1 min-w-[120px]">Learn</TabsTrigger>
          <TabsTrigger value="companies" className="flex-1 min-w-[120px]">Companies</TabsTrigger>
          <TabsTrigger value="culture" className="flex-1 min-w-[120px]">Culture</TabsTrigger>
          <TabsTrigger value="action" className="flex-1 min-w-[120px]">Action Plan</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Match Percentage */}
            {analysis.matchPercentage && (
              <MatchPercentage 
                matchPercentage={analysis.matchPercentage}
                suggestedCareer={analysis.suggestedCareer}
              />
            )}

            {/* Legacy Skill Gap Analysis */}
            <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>Skill Gap Analysis</CardTitle>
                <CardDescription className={styles.cardDescription}>What to level up next</CardDescription>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                {analysis.skillGaps && analysis.skillGaps.length > 0 ? (
                  <ul className={styles.list}>
                    {analysis.skillGaps.map((gap, index) => (
                      <li key={index} className={styles.listItem}>
                        <div className="flex justify-between items-start">
                          <span className="font-semibold">{gap.skill}</span>
                          <span className={`${styles.importance} ${gap.importance === 'High' ? styles.high : gap.importance === 'Medium' ? styles.medium : styles.low}`}>
                            {gap.importance}
                          </span>
                        </div>
                        <div className={`${styles.mutedText} mt-1`}>
                          {gap.description} • {gap.timeToLearn}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specific skill gaps identified.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Salary Predictions */}
            <Card className={`${styles.card} h-full`}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>Salary Predictions</CardTitle>
                <CardDescription className={styles.cardDescription}>Market outlook by level</CardDescription>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                {analysis.salaryPredictions && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={styles.mutedText}>Entry Level:</span>
                      <span className={styles.valuePositiveBold}>
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.entry.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={styles.mutedText}>Mid Level:</span>
                      <span className={styles.valuePrimaryBold}>
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.mid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={styles.mutedText}>Senior Level:</span>
                      <span className={styles.valueAccentBold}>
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.senior.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Career Path Suggestions */}
            <Card className={`${styles.card} h-full`}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>Career Path Suggestions</CardTitle>
                <CardDescription className={styles.cardDescription}>Your next smart moves</CardDescription>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                {analysis.careerPathSuggestions && analysis.careerPathSuggestions.length > 0 ? (
                  <ul className={styles.list}>
                    {analysis.careerPathSuggestions.map((suggestion, index) => (
                      <li key={index} className={styles.listItem}>
                        <span className="font-semibold">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specific career path suggestions available.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Strengths Tab */}
        <TabsContent value="strengths">
          {analysis.strengths && (
            <StrengthsSkills strengths={analysis.strengths} />
          )}
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market">
          {analysis.jobMarket && (
            <JobMarketDemand 
              jobMarket={analysis.jobMarket}
              suggestedCareer={analysis.suggestedCareer}
            />
          )}
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources">
          {analysis.learningResources && (
            <LearningResources resources={analysis.learningResources} />
          )}
        </TabsContent>

        {/* Companies Tab */}
        <TabsContent value="companies">
          {analysis.topCompanies && (
            <TopCompanies companies={analysis.topCompanies} />
          )}
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture">
          {analysis.culturalFit && (
            <CulturalFit culturalFit={analysis.culturalFit} />
          )}
        </TabsContent>

        {/* Action Plan Tab */}
        <TabsContent value="action">
          <Card className={styles.card}>
            <CardHeader className={styles.cardHeader}>
              <CardTitle className={styles.cardTitle}>Personalised Action Plan</CardTitle>
              <CardDescription className={styles.cardDescription}>Your roadmap to success</CardDescription>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {analysis.actionPlan ? (
                <div className="space-y-6">
                  {analysis.actionPlan.phase1.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Phase 1: Next 3 Months</h4>
                      <div className="space-y-2">
                        {analysis.actionPlan.phase1.map((step, index) => (
                          <div key={step.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <h5 className="font-semibold">{step.title}</h5>
                              <span className={`${styles.tag} ${step.priority === 'High' ? styles.high : step.priority === 'Medium' ? styles.medium : styles.low}`}>
                                {step.priority}
                              </span>
                            </div>
                            <p className={`${styles.mutedText} mt-1`}>{step.description}</p>
                            <div className="flex gap-2 mt-2">
                              <span className={`${styles.tag} text-xs`}>{step.timeframe}</span>
                              <span className={`${styles.tag} text-xs`}>{step.category}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {analysis.actionPlan.quickWins.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Quick Wins</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analysis.actionPlan.quickWins.map((win, index) => (
                          <div key={win.id} className="border border-green-200 rounded-lg p-3 bg-green-50">
                            <h5 className="font-semibold">{win.title}</h5>
                            <p className={`${styles.mutedText} mt-1`}>{win.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Action plan will be generated based on your analysis.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobMatcher;