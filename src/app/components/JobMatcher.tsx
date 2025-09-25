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
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <p className={styles.errorText}>Unable to parse analysis results.</p>
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
      </div>
      <br />

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
          <TabsTrigger value="overview" className="flex-1 min-w-[120px]">📊 Overview</TabsTrigger>
          <TabsTrigger value="strengths" className="flex-1 min-w-[120px]">💪 Strengths</TabsTrigger>
          <TabsTrigger value="market" className="flex-1 min-w-[120px]">📈 Market</TabsTrigger>
          <TabsTrigger value="resources" className="flex-1 min-w-[120px]">📚 Learn</TabsTrigger>
          <TabsTrigger value="companies" className="flex-1 min-w-[120px]">🏢 Companies</TabsTrigger>
          <TabsTrigger value="culture" className="flex-1 min-w-[120px]">🎯 Culture</TabsTrigger>
          <TabsTrigger value="action" className="flex-1 min-w-[120px]">🚀 Action Plan</TabsTrigger>
        </TabsList>
        <br/>

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
            <br/>
            {/* Career Path Explanation */}
            <Card className={styles.card}>
              <CardHeader className={styles.cardHeader}>
                <CardTitle className={styles.cardTitle}>Why This Career Path?</CardTitle>
                <CardDescription className={styles.cardDescription}>Analysis behind the recommendation</CardDescription>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                <div className={styles.careerPathExplanation}>
                  <div className={styles.explanationStep}>
                    <div className={`${styles.stepNumber} ${styles.stepNumberBlue}`}>
                      <span>1</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Skills Alignment</h4>
                      <p className={styles.stepDescription}>
                        Your technical background shows strong compatibility with <span className={styles.careerPathHighlight}>{analysis.suggestedCareer}</span> requirements, 
                        with particular strengths in areas that are highly valued in this field.
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.explanationStep}>
                    <div className={`${styles.stepNumber} ${styles.stepNumberGreen}`}>
                      <span>2</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Market Opportunity</h4>
                      <p className={styles.stepDescription}>
                        The <span className={styles.careerPathHighlight}>{analysis.suggestedCareer}</span> field is experiencing strong growth with increasing demand for skilled professionals, 
                        making it an excellent time to pursue this career path.
                      </p>
                    </div>
                  </div>
                  
                  <div className={styles.explanationStep}>
                    <div className={`${styles.stepNumber} ${styles.stepNumberPurple}`}>
                      <span>3</span>
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>Career Progression</h4>
                      <p className={styles.stepDescription}>
                        This path offers clear advancement opportunities and aligns with your professional goals, 
                        providing a solid foundation for long-term career growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <br/>

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
            <br/>

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
              <div className={styles.headerContent}>
                <span className={styles.title}>🚀</span>
                <CardTitle className={styles.cardTitle}>Personalised Action Plan</CardTitle>
              </div>
              <CardDescription className={styles.cardDescription}>Your roadmap to success</CardDescription>
            </CardHeader>
            <CardContent className={styles.cardContent}>
              {analysis.actionPlan ? (
                <div className={styles.actionPlanContainer}>
                  {analysis.actionPlan.phase1.length > 0 && (
                    <div className={styles.actionPlanPhase}>
                      <h4 className={styles.actionPlanPhaseTitle}>Phase 1: Next 3 Months</h4>
                      <div className={styles.actionPlanPhaseContent}>
                        {analysis.actionPlan.phase1.map((step) => (
                          <div key={step.id} className={styles.actionPlanStep}>
                            <div className={styles.actionPlanStepHeader}>
                              <h5 className={styles.actionPlanStepTitle}>{step.title}</h5>
                              <span className={`${styles.tag} ${step.priority === 'High' ? styles.high : step.priority === 'Medium' ? styles.medium : styles.low}`}>
                                {step.priority}
                              </span>
                            </div>
                            <p className={styles.actionPlanStepDescription}>{step.description}</p>
                            <div className={styles.actionPlanStepTags}>
                              <span className={styles.actionPlanStepTag}>{step.timeframe}</span>
                              <span className={styles.actionPlanStepTag}>{step.category}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {analysis.actionPlan.quickWins && Array.isArray(analysis.actionPlan.quickWins) && analysis.actionPlan.quickWins.length > 0 && (
                    <div className={styles.quickWinsSection}>
                      <h4 className={styles.quickWinsTitle}>Quick Wins</h4>
                      <div className={styles.quickWinsGrid}>
                        {analysis.actionPlan.quickWins.map((win, index) => (
                          <div key={win.id || index} className={styles.quickWinCard}>
                            <h5 className={styles.quickWinTitle}>{win.title}</h5>
                            <p className={styles.quickWinDescription}>{win.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className={styles.emptyStateText}>Action plan will be generated based on your analysis.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobMatcher;