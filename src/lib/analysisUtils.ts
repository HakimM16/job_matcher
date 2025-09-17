// Utility functions for processing comprehensive analysis data

import { ComprehensiveAnalysis } from '@/types/analysis';

/**
 * Parse the enhanced JSON response from the AI API
 */
export function parseComprehensiveAnalysis(response: string): ComprehensiveAnalysis | null {
  try {
    // Find JSON content in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Add timestamp and validation
    const analysis: ComprehensiveAnalysis = {
      timestamp: new Date(),
      ...parsed
    };

    return analysis;
  } catch (error) {
    console.error('Error parsing comprehensive analysis:', error);
    return null;
  }
}

/**
 * Fallback parser for legacy format (backward compatibility)
 */
export function parseLegacyFormat(jobMatch: string): Partial<ComprehensiveAnalysis> {
  const suggestedCareerMatch = jobMatch.match(/<Suggested Career>([\s\S]*?)<\/Suggested Career>/);
  const skillGapMatch = jobMatch.match(/<Skill Gap Analysis>([\s\S]*?)<\/Skill Gap Analysis>/);
  const salaryPredictionsMatch = jobMatch.match(/<Salary Predictions>([\s\S]*?)<\/Salary Predictions>/);
  const careerPathMatch = jobMatch.match(/<Career Path Suggestions>([\s\S]*?)<\/Career Path Suggestions>/);

  const suggestedCareer = suggestedCareerMatch ? suggestedCareerMatch[1].trim() : 'Not determined';
  const skillGap = skillGapMatch ? skillGapMatch[1] : '';
  const salaryPredictions = salaryPredictionsMatch ? salaryPredictionsMatch[1] : '';
  const careerPath = careerPathMatch ? careerPathMatch[1] : '';

  // Extract list items
  const skillGapItems = skillGap.match(/<li>(.+?)<\/li>/g)?.map(item => 
    item.replace(/<\/?li>/g, '')
  ) || [];
  
  const salaryPredictionItems = salaryPredictions.match(/<li>(.+?)<\/li>/g)?.map(item => 
    item.replace(/<\/?li>/g, '')
  ) || [];
  
  const careerPathItems = careerPath.match(/<li>(.+?)<\/li>/g)?.map(item => 
    item.replace(/<\/?li>/g, '')
  ) || [];

  // Parse salary predictions
  const entrySalary = salaryPredictionItems.find(item => item.includes('Entry:'))?.match(/£(\d+)/)?.[1];
  const midSalary = salaryPredictionItems.find(item => item.includes('Mid:'))?.match(/£(\d+)/)?.[1];
  const seniorSalary = salaryPredictionItems.find(item => item.includes('Senior:'))?.match(/£(\d+)/)?.[1];

  return {
    timestamp: new Date(),
    suggestedCareer,
    matchPercentage: {
      overall: 75, // Default value
      technical: 70,
      experience: 75,
      education: 80
    },
    skillGaps: skillGapItems.map((skill, index) => ({
      skill: skill.trim(),
      importance: 'Medium' as const,
      timeToLearn: '2-3 months',
      difficulty: 'Intermediate' as const,
      description: skill.trim()
    })),
    salaryPredictions: {
      currency: 'GBP',
      entry: entrySalary ? parseInt(entrySalary) : 25000,
      mid: midSalary ? parseInt(midSalary) : 45000,
      senior: seniorSalary ? parseInt(seniorSalary) : 75000
    },
    careerPathSuggestions: careerPathItems,
    // Default values for new sections
    strengths: {
      highlightedSkills: [],
      keyStrengths: [],
      experienceHighlights: [],
      softSkills: [],
      positiveIndicators: []
    },
    jobMarket: {
      demandScore: 75,
      growthRate: 10,
      trend: 'Growing' as const,
      competitionLevel: 'Medium' as const,
      remoteOpportunities: 60,
      marketInsights: []
    },
    topCompanies: [],
    learningResources: [],
    culturalFit: {
      workStyle: 'Mixed' as const,
      environmentPreference: 'Corporate' as const,
      teamSize: 'Medium' as const,
      workArrangement: 'Hybrid' as const,
      managementStyle: 'Guided' as const,
      innovationLevel: 'Medium' as const,
      riskTolerance: 'Medium' as const,
      personalityTraits: [],
      culturalFitScores: {
        startup: 60,
        corporate: 70,
        agency: 65,
        nonprofit: 50
      }
    },
    alternativeCareers: [],
    careerTimeline: {
      currentLevel: 'Junior',
      timeToNextLevel: '12-18 months',
      milestones: [],
      alternativePaths: [],
      skillProgression: {
        technical: [],
        leadership: [],
        domain: []
      }
    },
    resumeFeedback: {
      overallScore: 75,
      clarity: { score: 80, suggestions: [] },
      keywordOptimization: { score: 70, missingKeywords: [], suggestions: [] },
      formatting: { score: 85, issues: [], improvements: [] },
      content: { score: 75, strengths: [], weaknesses: [], suggestions: [] },
      atsCompatibility: { score: 80, issues: [], improvements: [] }
    },
    networkingOpportunities: [],
    actionPlan: {
      phase1: [],
      phase2: [],
      phase3: [],
      totalEstimatedTime: '6 months',
      quickWins: []
    },
    gamification: {
      level: 1,
      xp: 0,
      xpToNextLevel: 1000,
      badges: [],
      achievements: [],
      careerReadinessLevel: 50,
      weeklyProgress: {
        skillsLearned: 0,
        projectsCompleted: 0,
        applicationsSubmitted: 0,
        networkingEvents: 0
      }
    }
  };
}

/**
 * Calculate match percentage based on various factors
 */
export function calculateMatchPercentage(
  technicalSkills: number,
  experience: number,
  education: number
): { overall: number; technical: number; experience: number; education: number } {
  const overall = Math.round((technicalSkills + experience + education) / 3);
  
  return {
    overall,
    technical: technicalSkills,
    experience,
    education
  };
}

/**
 * Generate mock learning resources based on skill gaps
 */
export function generateLearningResources(skills: string[]) {
  const resourceTemplates = [
    {
      provider: 'Coursera',
      type: 'Course' as const,
      cost: 'Paid' as const,
      rating: 4.5
    },
    {
      provider: 'freeCodeCamp',
      type: 'Tutorial' as const,
      cost: 'Free' as const,
      rating: 4.8
    },
    {
      provider: 'Udemy',
      type: 'Course' as const,
      cost: 'Paid' as const,
      rating: 4.3
    }
  ];

  return skills.slice(0, 5).map((skill, index) => {
    const template = resourceTemplates[index % resourceTemplates.length];
    return {
      title: `Master ${skill}`,
      provider: template.provider,
      type: template.type,
      duration: '4-6 weeks',
      difficulty: 'Intermediate' as const,
      cost: template.cost,
      rating: template.rating,
      url: `https://${template.provider.toLowerCase()}.com/${skill.toLowerCase().replace(/\s+/g, '-')}`,
      description: `Comprehensive ${skill} course for career advancement`,
      skills: [skill]
    };
  });
}

/**
 * Format currency with proper symbol
 */
export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  const symbols = {
    GBP: '£',
    USD: '$',
    EUR: '€'
  };
  
  const symbol = symbols[currency as keyof typeof symbols] || currency;
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Get trend emoji for visual indicators
 */
export function getTrendEmoji(trend: string): string {
  switch (trend) {
    case 'Growing': return '📈';
    case 'Stable': return '📊';
    case 'Declining': return '📉';
    default: return '📊';
  }
}

/**
 * Calculate career readiness level
 */
export function calculateCareerReadiness(analysis: Partial<ComprehensiveAnalysis>): number {
  let score = 0;
  let maxScore = 0;

  // Technical skills (30 points)
  if (analysis.matchPercentage?.technical) {
    score += (analysis.matchPercentage.technical / 100) * 30;
  }
  maxScore += 30;

  // Experience (25 points)
  if (analysis.matchPercentage?.experience) {
    score += (analysis.matchPercentage.experience / 100) * 25;
  }
  maxScore += 25;

  // Resume quality (20 points)
  if (analysis.resumeFeedback?.overallScore) {
    score += (analysis.resumeFeedback.overallScore / 100) * 20;
  }
  maxScore += 20;

  // Portfolio (15 points)
  if (analysis.portfolioAnalysis?.portfolioScore) {
    score += (analysis.portfolioAnalysis.portfolioScore / 100) * 15;
  }
  maxScore += 15;

  // Action plan progress (10 points)
  if (analysis.actionPlan) {
    const totalSteps = [
      ...analysis.actionPlan.phase1,
      ...analysis.actionPlan.phase2,
      ...analysis.actionPlan.phase3
    ].length;
    const completedSteps = [
      ...analysis.actionPlan.phase1,
      ...analysis.actionPlan.phase2,
      ...analysis.actionPlan.phase3
    ].filter(step => step.completed).length;
    
    if (totalSteps > 0) {
      score += (completedSteps / totalSteps) * 10;
    }
  }
  maxScore += 10;

  return Math.round((score / maxScore) * 100);
}