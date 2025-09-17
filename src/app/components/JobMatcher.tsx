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
import { Badge } from "./ui/badge";

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
          <div className="mt-4 flex justify-center">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2 text-lg">
              {analysis.matchPercentage.overall}% Match
            </Badge>
          </div>
        )}
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strengths">Strengths</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="resources">Learn</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="action">Action Plan</TabsTrigger>
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
            <Card>
              <CardHeader>
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>What to level up next</CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.skillGaps && analysis.skillGaps.length > 0 ? (
                  <ul className={styles.list}>
                    {analysis.skillGaps.map((gap, index) => (
                      <li key={index} className={styles.listItem}>
                        <div className="flex justify-between items-start">
                          <span className="font-medium">{gap.skill}</span>
                          <Badge 
                            variant="outline" 
                            className={
                              gap.importance === 'High' ? 'border-red-200 text-red-700' :
                              gap.importance === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                              'border-green-200 text-green-700'
                            }
                          >
                            {gap.importance}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
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
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Salary Predictions</CardTitle>
                <CardDescription>Market outlook by level</CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.salaryPredictions && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Entry Level:</span>
                      <span className="font-semibold text-green-600">
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.entry.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Mid Level:</span>
                      <span className="font-semibold text-blue-600">
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.mid.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Senior Level:</span>
                      <span className="font-semibold text-purple-600">
                        {analysis.salaryPredictions.currency === 'GBP' ? '£' : '$'}
                        {analysis.salaryPredictions.senior.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Career Path Suggestions */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Career Path Suggestions</CardTitle>
                <CardDescription>Your next smart moves</CardDescription>
              </CardHeader>
              <CardContent>
                {analysis.careerPathSuggestions && analysis.careerPathSuggestions.length > 0 ? (
                  <ul className={styles.list}>
                    {analysis.careerPathSuggestions.map((suggestion, index) => (
                      <li key={index} className={styles.listItem}>
                        {suggestion}
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
          <Card>
            <CardHeader>
              <CardTitle>Personalized Action Plan</CardTitle>
              <CardDescription>Your roadmap to success</CardDescription>
            </CardHeader>
            <CardContent>
              {analysis.actionPlan ? (
                <div className="space-y-6">
                  {analysis.actionPlan.phase1.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Phase 1: Next 3 Months</h4>
                      <div className="space-y-2">
                        {analysis.actionPlan.phase1.map((step, index) => (
                          <div key={step.id} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <h5 className="font-medium text-gray-800">{step.title}</h5>
                              <Badge variant="outline" className={
                                step.priority === 'High' ? 'border-red-200 text-red-700' :
                                step.priority === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                                'border-green-200 text-green-700'
                              }>
                                {step.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {step.timeframe}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {step.category}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {analysis.actionPlan.quickWins.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Quick Wins</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {analysis.actionPlan.quickWins.map((win, index) => (
                          <div key={win.id} className="border border-green-200 rounded-lg p-3 bg-green-50">
                            <h5 className="font-medium text-green-800">{win.title}</h5>
                            <p className="text-sm text-green-600 mt-1">{win.description}</p>
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