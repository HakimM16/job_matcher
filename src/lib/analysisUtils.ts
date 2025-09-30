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

  // Calculate more realistic percentages based on content analysis
  const calculateRealisticPercentages = (career: string, skillGap: string, salaryPredictions: string) => {
    let technical = 45;
    let experience = 40;
    let education = 65;
    
    // Adjust based on career type
    if (career.toLowerCase().includes('senior') || career.toLowerCase().includes('lead')) {
      technical += 20;
      experience += 25;
    } else if (career.toLowerCase().includes('junior') || career.toLowerCase().includes('entry')) {
      technical -= 5;
      experience -= 10;
    }
    
    // Adjust based on skill gap content
    if (skillGap.includes('advanced') || skillGap.includes('expert')) {
      technical += 15;
    } else if (skillGap.includes('beginner') || skillGap.includes('basic')) {
      technical -= 10;
    }
    
    // Adjust based on salary predictions (higher salaries = more experience expected)
    const salaryMatch = salaryPredictions.match(/£(\d+)/g);
    if (salaryMatch) {
      const salaries = salaryMatch.map(s => parseInt(s.replace('£', '')));
      const avgSalary = salaries.reduce((a, b) => a + b, 0) / salaries.length;
      if (avgSalary > 60000) {
        experience += 15;
        technical += 8;
      } else if (avgSalary < 30000) {
        experience -= 8;
        technical -= 3;
      }
    }
    
    // Add some randomness to make it feel more realistic
    const randomVariation = () => Math.floor(Math.random() * 8) - 4; // -4 to +4
    
    technical = Math.max(25, Math.min(90, technical + randomVariation()));
    experience = Math.max(20, Math.min(85, experience + randomVariation()));
    education = Math.max(35, Math.min(90, education + randomVariation()));
    
    const overall = Math.round((technical + experience + education) / 3);
    
    return { overall, technical, experience, education };
  };

  const matchPercentage = calculateRealisticPercentages(suggestedCareer, skillGap, salaryPredictions);

  return {
    timestamp: new Date(),
    suggestedCareer,
    matchPercentage,
    skillGaps: skillGapItems.map((skill) => ({
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
      demandScore: 65,
      growthRate: 8,
      trend: 'Growing' as const,
      competitionLevel: 'High' as const,
      remoteOpportunities: 45,
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
        startup: 45,
        corporate: 55,
        agency: 50,
        nonprofit: 40
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
      overallScore: 65,
      clarity: { score: 70, suggestions: [] },
      keywordOptimization: { score: 55, missingKeywords: [], suggestions: [] },
      formatting: { score: 75, issues: [], improvements: [] },
      content: { score: 60, strengths: [], weaknesses: [], suggestions: [] },
      atsCompatibility: { score: 65, issues: [], improvements: [] }
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
      careerReadinessLevel: 35,
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