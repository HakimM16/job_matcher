// Comprehensive type definitions for the enhanced job matcher analysis

export interface MatchPercentage {
  overall: number;
  technical: number;
  experience: number;
  education: number;
}

export interface StrengthsAnalysis {
  highlightedSkills: string[];
  keyStrengths: string[];
  experienceHighlights: string[];
  softSkills: string[];
  positiveIndicators: string[];
}

export interface SkillGap {
  skill: string;
  importance: 'High' | 'Medium' | 'Low';
  timeToLearn: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
}

export interface JobMarketData {
  demandScore: number; // 1-100
  growthRate: number; // percentage
  trend: 'Growing' | 'Stable' | 'Declining';
  competitionLevel: 'Low' | 'Medium' | 'High';
  remoteOpportunities: number; // percentage
  marketInsights: string[];
  regionSpecific?: {
    location: string;
    localDemand: number;
    averageSalary: SalaryRange;
  };
}

export interface SalaryRange {
  currency: string;
  entry: number;
  mid: number;
  senior: number;
  location?: string;
}

export interface Company {
  name: string;
  industry: string;
  size: 'Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location: string;
  remotePolicy: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  activelyHiring: boolean;
  culture: string[];
  benefits: string[];
  website?: string;
  logoUrl?: string;
}

export interface LearningResource {
  title: string;
  provider: string;
  type: 'Course' | 'Certification' | 'Tutorial' | 'Book' | 'Documentation';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  cost: 'Free' | 'Paid' | 'Freemium';
  rating: number;
  url: string;
  description: string;
  skills: string[];
}

export interface CulturalFitAnalysis {
  workStyle: 'Independent' | 'Collaborative' | 'Mixed';
  environmentPreference: 'Startup' | 'Corporate' | 'Agency' | 'Consultancy' | 'Non-profit';
  teamSize: 'Small' | 'Medium' | 'Large' | 'Flexible';
  workArrangement: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  managementStyle: 'Autonomous' | 'Guided' | 'Structured';
  innovationLevel: 'High' | 'Medium' | 'Low';
  riskTolerance: 'High' | 'Medium' | 'Low';
  personalityTraits: string[];
  culturalFitScores: {
    startup: number;
    corporate: number;
    agency: number;
    nonprofit: number;
  };
}

export interface AlternativeCareer {
  title: string;
  matchPercentage: number;
  overlapSkills: string[];
  additionalSkillsNeeded: string[];
  transitionDifficulty: 'Easy' | 'Medium' | 'Hard';
  timeToTransition: string;
  salaryComparison: 'Higher' | 'Similar' | 'Lower';
  description: string;
  keyDifferences: string[];
}

export interface CareerMilestone {
  year: number;
  level: 'Junior' | 'Mid-level' | 'Senior' | 'Lead' | 'Principal';
  title: string;
  responsibilities: string[];
  requiredSkills: string[];
  certifications: string[];
  averageSalary: number;
  keyAchievements: string[];
}

export interface CareerTimeline {
  currentLevel: string;
  timeToNextLevel: string;
  milestones: CareerMilestone[];
  alternativePaths: string[];
  skillProgression: {
    technical: string[];
    leadership: string[];
    domain: string[];
  };
}

export interface ResumeFeeback {
  overallScore: number;
  clarity: {
    score: number;
    suggestions: string[];
  };
  keywordOptimization: {
    score: number;
    missingKeywords: string[];
    suggestions: string[];
  };
  formatting: {
    score: number;
    issues: string[];
    improvements: string[];
  };
  content: {
    score: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  atsCompatibility: {
    score: number;
    issues: string[];
    improvements: string[];
  };
}

export interface NetworkingOpportunity {
  name: string;
  type: 'Event' | 'Community' | 'Group' | 'Conference' | 'Meetup' | 'Online Forum';
  description: string;
  url: string;
  location?: string;
  date?: string;
  cost: 'Free' | 'Paid';
  relevanceScore: number;
  attendeeCount?: string;
  focus: string[];
}

export interface ActionPlanStep {
  id: number;
  title: string;
  description: string;
  category: 'Learning' | 'Building' | 'Networking' | 'Applying' | 'Certification';
  timeframe: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  priority: 'High' | 'Medium' | 'Low';
  resources: LearningResource[];
  completed: boolean;
  prerequisites?: number[];
  estimatedHours: number;
}

export interface ActionPlan {
  phase1: ActionPlanStep[];  // First 3 months
  phase2: ActionPlanStep[];  // 3-6 months
  phase3: ActionPlanStep[];  // 6-12 months
  totalEstimatedTime: string;
  quickWins: ActionPlanStep[];
}

export interface PortfolioAnalysis {
  githubStats?: {
    repositories: number;
    contributions: number;
    languages: { [key: string]: number };
    topProjects: GitHubProject[];
  };
  portfolioScore: number;
  strengths: string[];
  improvements: string[];
  missingProjects: string[];
  recommendations: string[];
}

export interface GitHubProject {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  lastUpdated: string;
  relevanceScore: number;
}

export interface GamificationData {
  level: number;
  xp: number;
  xpToNextLevel: number;
  badges: Badge[];
  achievements: Achievement[];
  careerReadinessLevel: number;
  weeklyProgress: {
    skillsLearned: number;
    projectsCompleted: number;
    applicationsSubmitted: number;
    networkingEvents: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'Learning' | 'Building' | 'Networking' | 'Achievement';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: string;
  category: string;
}

export interface LocationData {
  city: string;
  country: string;
  region: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface LocationBasedData {
  location: LocationData;
  jobMarket: {
    totalJobs: number;
    demandTrend: 'High' | 'Medium' | 'Low';
    competitionLevel: 'Low' | 'Medium' | 'High';
    averageTimeToHire: number;
  };
  salaryData: SalaryRange;
  costOfLiving: {
    index: number;
    adjustedSalary: SalaryRange;
  };
  topEmployers: Company[];
  networkingEvents: NetworkingOpportunity[];
}

// Main comprehensive analysis interface
export interface ComprehensiveAnalysis {
  timestamp: Date;
  userId?: string;
  
  // Core Analysis
  suggestedCareer: string;
  matchPercentage: MatchPercentage;
  
  // Enhanced Sections
  strengths: StrengthsAnalysis;
  skillGaps: SkillGap[];
  jobMarket: JobMarketData;
  topCompanies: Company[];
  learningResources: LearningResource[];
  culturalFit: CulturalFitAnalysis;
  alternativeCareers: AlternativeCareer[];
  careerTimeline: CareerTimeline;
  resumeFeedback: ResumeFeeback;
  networkingOpportunities: NetworkingOpportunity[];
  
  // Interactive Features
  actionPlan: ActionPlan;
  locationData?: LocationBasedData;
  portfolioAnalysis?: PortfolioAnalysis;
  gamification: GamificationData;
  
  // Original sections (for backward compatibility)
  salaryPredictions: SalaryRange;
  careerPathSuggestions: string[];
}

// API Response Types
export interface AnalysisAPIResponse {
  success: boolean;
  data: ComprehensiveAnalysis;
  error?: string;
}

export interface ProgressUpdate {
  stepId: number;
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface UserPreferences {
  location?: LocationData;
  salaryExpectations?: {
    min: number;
    max: number;
    currency: string;
  };
  workArrangementPreference: 'Remote' | 'Hybrid' | 'On-site' | 'Flexible';
  companySize: ('Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise')[];
  industries: string[];
  githubUsername?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
}