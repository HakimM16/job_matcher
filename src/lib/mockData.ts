// Mock data generator for testing comprehensive analysis features

import { ComprehensiveAnalysis } from '@/types/analysis';

export function generateMockAnalysis(): ComprehensiveAnalysis {
  return {
    timestamp: new Date(),
    
    // Core Analysis
    suggestedCareer: "Frontend Developer",
    matchPercentage: {
      overall: 78,
      technical: 75,
      experience: 80,
      education: 80
    },
    
    // Enhanced Sections
    strengths: {
      highlightedSkills: ["JavaScript", "React", "CSS", "HTML", "Git"],
      keyStrengths: ["Problem Solving", "Attention to Detail", "Quick Learner"],
      experienceHighlights: ["Built 3 web applications", "Contributed to open source"],
      softSkills: ["Communication", "Teamwork", "Adaptability"],
      positiveIndicators: ["Active GitHub profile", "Recent project portfolio", "Continuous learning"]
    },
    
    skillGaps: [
      {
        skill: "TypeScript",
        importance: "High" as const,
        timeToLearn: "2-3 months",
        difficulty: "Intermediate" as const,
        description: "Essential for modern React development"
      },
      {
        skill: "Node.js",
        importance: "Medium" as const,
        timeToLearn: "3-4 months",
        difficulty: "Intermediate" as const,
        description: "Useful for full-stack capabilities"
      },
      {
        skill: "Testing (Jest/Cypress)",
        importance: "High" as const,
        timeToLearn: "1-2 months",
        difficulty: "Beginner" as const,
        description: "Critical for professional development"
      }
    ],
    
    jobMarket: {
      demandScore: 85,
      growthRate: 12,
      trend: "Growing" as const,
      competitionLevel: "Medium" as const,
      remoteOpportunities: 78,
      marketInsights: [
        "Frontend roles are in high demand across all industries",
        "React remains the most sought-after frontend framework",
        "Remote-first companies increasing hiring for this role"
      ]
    },
    
    topCompanies: [
      {
        name: "TechCorp Solutions",
        industry: "Technology",
        size: "Medium" as const,
        location: "London",
        remotePolicy: "Hybrid" as const,
        activelyHiring: true,
        culture: ["innovative", "collaborative", "fast-paced"],
        benefits: ["flexible hours", "learning budget", "health insurance"]
      },
      {
        name: "StartupXYZ",
        industry: "FinTech",
        size: "Startup" as const,
        location: "Remote",
        remotePolicy: "Remote" as const,
        activelyHiring: true,
        culture: ["entrepreneurial", "agile", "growth-focused"],
        benefits: ["equity", "unlimited PTO", "home office stipend"]
      },
      {
        name: "Global Enterprise Ltd",
        industry: "Finance",
        size: "Large" as const,
        location: "Manchester",
        remotePolicy: "Hybrid" as const,
        activelyHiring: false,
        culture: ["structured", "stable", "professional"],
        benefits: ["pension", "training programs", "career progression"]
      }
    ],
    
    learningResources: [
      {
        title: "React - The Complete Guide",
        provider: "Udemy",
        type: "Course" as const,
        duration: "8 weeks",
        difficulty: "Intermediate" as const,
        cost: "Paid" as const,
        rating: 4.7,
        url: "https://udemy.com/react-complete-guide",
        description: "Master React with hooks, context, and modern patterns",
        skills: ["React", "JavaScript", "Hooks"]
      },
      {
        title: "TypeScript Fundamentals",
        provider: "freeCodeCamp",
        type: "Tutorial" as const,
        duration: "4 weeks",
        difficulty: "Beginner" as const,
        cost: "Free" as const,
        rating: 4.5,
        url: "https://freecodecamp.org/typescript",
        description: "Learn TypeScript from basics to advanced concepts",
        skills: ["TypeScript", "JavaScript"]
      },
      {
        title: "AWS Certified Developer",
        provider: "AWS",
        type: "Certification" as const,
        duration: "12 weeks",
        difficulty: "Advanced" as const,
        cost: "Paid" as const,
        rating: 4.8,
        url: "https://aws.amazon.com/certification/",
        description: "Become certified in AWS development services",
        skills: ["AWS", "Cloud", "DevOps"]
      }
    ],
    
    culturalFit: {
      workStyle: "Collaborative" as const,
      environmentPreference: "Startup" as const,
      teamSize: "Medium" as const,
      workArrangement: "Hybrid" as const,
      managementStyle: "Autonomous" as const,
      innovationLevel: "High" as const,
      riskTolerance: "Medium" as const,
      personalityTraits: ["analytical", "creative", "detail-oriented"],
      culturalFitScores: {
        startup: 85,
        corporate: 65,
        agency: 78,
        nonprofit: 45
      }
    },
    
    alternativeCareers: [
      {
        title: "Full Stack Developer",
        matchPercentage: 85,
        overlapSkills: ["JavaScript", "React", "Git"],
        additionalSkillsNeeded: ["Node.js", "Databases", "APIs"],
        transitionDifficulty: "Medium" as const,
        timeToTransition: "6-9 months",
        salaryComparison: "Higher" as const,
        description: "Combine frontend skills with backend development",
        keyDifferences: ["Backend development", "Database management", "API design"]
      },
      {
        title: "UI/UX Designer",
        matchPercentage: 70,
        overlapSkills: ["CSS", "User Experience", "Design Thinking"],
        additionalSkillsNeeded: ["Figma", "Design Principles", "User Research"],
        transitionDifficulty: "Medium" as const,
        timeToTransition: "4-6 months",
        salaryComparison: "Similar" as const,
        description: "Focus on user interface and experience design",
        keyDifferences: ["More design-focused", "User research", "Prototyping"]
      }
    ],
    
    careerTimeline: {
      currentLevel: "Junior",
      timeToNextLevel: "12-18 months",
      milestones: [
        {
          year: 1,
          level: "Junior" as const,
          title: "Junior Frontend Developer",
          responsibilities: ["Implement UI components", "Fix bugs", "Learn codebase"],
          requiredSkills: ["HTML", "CSS", "JavaScript", "React"],
          certifications: [],
          averageSalary: 28000,
          keyAchievements: ["First production deployment", "Code review participation"]
        },
        {
          year: 2,
          level: "Mid-level" as const,
          title: "Frontend Developer",
          responsibilities: ["Feature development", "Code reviews", "Mentor juniors"],
          requiredSkills: ["TypeScript", "Testing", "Performance optimization"],
          certifications: ["React Developer Certification"],
          averageSalary: 45000,
          keyAchievements: ["Lead feature development", "Improve code quality"]
        },
        {
          year: 3,
          level: "Senior" as const,
          title: "Senior Frontend Developer",
          responsibilities: ["Architecture decisions", "Team leadership", "Technical strategy"],
          requiredSkills: ["System design", "Leadership", "Advanced React patterns"],
          certifications: ["AWS Developer Associate"],
          averageSalary: 65000,
          keyAchievements: ["Technical leadership", "Mentor team members"]
        }
      ],
      alternativePaths: ["Full Stack Developer", "Frontend Architect", "Technical Lead"],
      skillProgression: {
        technical: ["TypeScript", "Testing", "Performance", "Architecture"],
        leadership: ["Mentoring", "Code Reviews", "Technical Decision Making"],
        domain: ["E-commerce", "SaaS", "Mobile Web"]
      }
    },
    
    resumeFeedback: {
      overallScore: 75,
      clarity: {
        score: 80,
        suggestions: ["Add more quantified achievements", "Use stronger action verbs"]
      },
      keywordOptimization: {
        score: 70,
        missingKeywords: ["TypeScript", "Testing", "Agile"],
        suggestions: ["Include more technical keywords", "Add industry buzzwords"]
      },
      formatting: {
        score: 85,
        issues: ["Inconsistent bullet points"],
        improvements: ["Use consistent formatting", "Better spacing"]
      },
      content: {
        score: 75,
        strengths: ["Good project descriptions", "Clear education section"],
        weaknesses: ["Missing soft skills", "No leadership examples"],
        suggestions: ["Add team collaboration examples", "Include problem-solving scenarios"]
      },
      atsCompatibility: {
        score: 80,
        issues: ["Complex formatting might confuse ATS"],
        improvements: ["Simplify layout", "Use standard section headers"]
      }
    },
    
    networkingOpportunities: [
      {
        name: "London React Meetup",
        type: "Meetup" as const,
        description: "Monthly meetup for React developers",
        url: "https://meetup.com/london-react",
        location: "London",
        cost: "Free" as const,
        relevanceScore: 95,
        attendeeCount: "200+",
        focus: ["React", "JavaScript", "Frontend"]
      },
      {
        name: "Frontend Developer Community",
        type: "Online Forum" as const,
        description: "Active online community for frontend developers",
        url: "https://dev.to/frontend",
        cost: "Free" as const,
        relevanceScore: 90,
        focus: ["Frontend", "Networking", "Learning"]
      }
    ],
    
    actionPlan: {
      phase1: [
        {
          id: 1,
          title: "Learn TypeScript Fundamentals",
          description: "Complete TypeScript course and apply to existing projects",
          category: "Learning" as const,
          timeframe: "4 weeks",
          difficulty: "Medium" as const,
          priority: "High" as const,
          resources: [],
          completed: false,
          estimatedHours: 30
        },
        {
          id: 2,
          title: "Build Portfolio Project",
          description: "Create a React TypeScript application with testing",
          category: "Building" as const,
          timeframe: "6 weeks",
          difficulty: "Medium" as const,
          priority: "High" as const,
          resources: [],
          completed: false,
          estimatedHours: 50
        }
      ],
      phase2: [],
      phase3: [],
      totalEstimatedTime: "6 months",
      quickWins: [
        {
          id: 100,
          title: "Update LinkedIn Profile",
          description: "Add recent projects and skills to your LinkedIn",
          category: "Networking" as const,
          timeframe: "1 day",
          difficulty: "Easy" as const,
          priority: "High" as const,
          resources: [],
          completed: false,
          estimatedHours: 2
        },
        {
          id: 101,
          title: "Join React Community",
          description: "Join local React meetup and online communities",
          category: "Networking" as const,
          timeframe: "1 week",
          difficulty: "Easy" as const,
          priority: "Medium" as const,
          resources: [],
          completed: false,
          estimatedHours: 3
        }
      ]
    },
    
    gamification: {
      level: 3,
      xp: 1250,
      xpToNextLevel: 750,
      badges: [],
      achievements: [],
      careerReadinessLevel: 65,
      weeklyProgress: {
        skillsLearned: 2,
        projectsCompleted: 1,
        applicationsSubmitted: 5,
        networkingEvents: 0
      }
    },
    
    // Original sections (for backward compatibility)
    salaryPredictions: {
      currency: "GBP",
      entry: 28000,
      mid: 45000,
      senior: 65000
    },
    careerPathSuggestions: [
      "Focus on TypeScript and modern React patterns",
      "Build a comprehensive portfolio with 3-5 projects",
      "Contribute to open source React projects",
      "Attend local tech meetups and networking events",
      "Consider pursuing React or AWS certifications"
    ]
  };
}