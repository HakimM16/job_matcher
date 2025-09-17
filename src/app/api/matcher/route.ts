// This is where the mistral api route is defined.
import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';
import { ComprehensiveAnalysis } from '@/types/analysis';
 
const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');
 
export const runtime = 'edge';
 
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);
    
    // useCompletion sends data in 'prompt' field
    const prompt = body.prompt;
    console.log('Extracted prompt:', prompt);

    if (!prompt) {
      return new Response('No prompt provided', { status: 400 });
    }

    if (!process.env.MISTRAL_API_KEY) {
      console.error('MISTRAL_API_KEY not found in environment variables');
      return new Response('API key not configured', { status: 500 });
    }
 
   //  console.log('About to call Mistral API with model: open-mistral-7b');
   //  console.log('API Key exists:', !!process.env.MISTRAL_API_KEY);
   //  console.log('API Key length:', process.env.MISTRAL_API_KEY?.length);

   //  // Test if API key works with a simple call first
   //  try {
   //    console.log('Testing Mistral API connection...');
   //    const testResponse = await mistral.chat({
   //      model: 'open-mistral-7b',
   //      messages: [{ role: 'user', content: 'Hello' }],
   //    });
   //    console.log('Test response received:', !!testResponse);
   //  } catch (testError: any) {
   //    console.error('Mistral API test failed:', testError);
   //    return new Response(`Mistral API error: ${testError?.message || 'Unknown error'}`, { status: 500 });
   //  }
 
    const response = await mistral.chatStream({
    model: 'open-mistral-7b',
    messages: [{ 
      role: 'user',
      content: `CONTEXT: You are a comprehensive career coach, labor market analyst, and professional development expert.
You provide detailed, actionable career guidance with personality, market insights, and concrete next steps.
You are encouraging, witty, and practical - like a mentor who truly wants to see someone succeed.
-------
TASK: 
Analyze the resume below and provide a comprehensive career analysis including:

1. CORE ANALYSIS: Suggested career, overall match percentage, key strengths
2. ENHANCED INSIGHTS: Market demand, cultural fit, alternative paths, learning resources
3. ACTIONABLE GUIDANCE: Personalized action plan, networking opportunities, resume feedback
4. MOTIVATION: Positive reinforcement and clear next steps

Keep everything practical, encouraging, and specific to the candidate's profile.
-------
RESUME:
${prompt}
-------
OUTPUT FORMAT (STRICT JSON):
{
  "suggestedCareer": "specific job title",
  "matchPercentage": {
    "overall": 85,
    "technical": 80,
    "experience": 90,
    "education": 75
  },
  "strengths": {
    "highlightedSkills": ["skill1", "skill2", "skill3"],
    "keyStrengths": ["strength1", "strength2"],
    "experienceHighlights": ["highlight1", "highlight2"],
    "softSkills": ["communication", "leadership"],
    "positiveIndicators": ["indicator1", "indicator2"]
  },
  "skillGaps": [
    {
      "skill": "Node.js",
      "importance": "High",
      "timeToLearn": "2-3 months",
      "difficulty": "Intermediate",
      "description": "Backend development framework"
    }
  ],
  "jobMarket": {
    "demandScore": 85,
    "growthRate": 15,
    "trend": "Growing",
    "competitionLevel": "Medium",
    "remoteOpportunities": 75,
    "marketInsights": ["insight1", "insight2"]
  },
  "topCompanies": [
    {
      "name": "Company Name",
      "industry": "Tech",
      "size": "Medium",
      "location": "London",
      "remotePolicy": "Hybrid",
      "activelyHiring": true,
      "culture": ["innovative", "collaborative"],
      "benefits": ["flexible hours", "learning budget"]
    }
  ],
  "learningResources": [
    {
      "title": "JavaScript Mastery Course",
      "provider": "Coursera",
      "type": "Course",
      "duration": "6 weeks",
      "difficulty": "Intermediate",
      "cost": "Paid",
      "rating": 4.8,
      "url": "https://coursera.org/course",
      "description": "Comprehensive JS course",
      "skills": ["JavaScript", "ES6", "DOM"]
    }
  ],
  "culturalFit": {
    "workStyle": "Collaborative",
    "environmentPreference": "Startup",
    "teamSize": "Medium",
    "workArrangement": "Hybrid",
    "managementStyle": "Autonomous",
    "innovationLevel": "High",
    "riskTolerance": "Medium",
    "personalityTraits": ["analytical", "creative"],
    "culturalFitScores": {
      "startup": 85,
      "corporate": 60,
      "agency": 75,
      "nonprofit": 45
    }
  },
  "alternativeCareers": [
    {
      "title": "Frontend Developer",
      "matchPercentage": 85,
      "overlapSkills": ["JavaScript", "HTML", "CSS"],
      "additionalSkillsNeeded": ["React", "Vue"],
      "transitionDifficulty": "Easy",
      "timeToTransition": "3-6 months",
      "salaryComparison": "Similar",
      "description": "Focus on user interfaces",
      "keyDifferences": ["More visual", "User-focused"]
    }
  ],
  "careerTimeline": {
    "currentLevel": "Junior",
    "timeToNextLevel": "12-18 months",
    "milestones": [
      {
        "year": 1,
        "level": "Junior",
        "title": "Junior Developer",
        "responsibilities": ["Code features", "Bug fixes"],
        "requiredSkills": ["HTML", "CSS", "JavaScript"],
        "certifications": ["AWS Cloud Practitioner"],
        "averageSalary": 30000,
        "keyAchievements": ["First production deploy"]
      }
    ],
    "alternativePaths": ["DevOps", "Product Manager"],
    "skillProgression": {
      "technical": ["JavaScript", "React", "Node.js"],
      "leadership": ["Mentoring", "Project management"],
      "domain": ["E-commerce", "FinTech"]
    }
  },
  "resumeFeedback": {
    "overallScore": 75,
    "clarity": {
      "score": 80,
      "suggestions": ["Add more quantified achievements"]
    },
    "keywordOptimization": {
      "score": 70,
      "missingKeywords": ["React", "API"],
      "suggestions": ["Include more technical keywords"]
    },
    "formatting": {
      "score": 85,
      "issues": ["Inconsistent bullet points"],
      "improvements": ["Use consistent formatting"]
    },
    "content": {
      "score": 75,
      "strengths": ["Good project descriptions"],
      "weaknesses": ["Missing soft skills"],
      "suggestions": ["Add leadership examples"]
    },
    "atsCompatibility": {
      "score": 80,
      "issues": ["Complex formatting"],
      "improvements": ["Simplify layout for ATS"]
    }
  },
  "networkingOpportunities": [
    {
      "name": "London Tech Meetup",
      "type": "Meetup",
      "description": "Monthly tech networking",
      "url": "https://meetup.com/london-tech",
      "location": "London",
      "cost": "Free",
      "relevanceScore": 90,
      "attendeeCount": "200+",
      "focus": ["JavaScript", "Networking"]
    }
  ],
  "actionPlan": {
    "phase1": [
      {
        "id": 1,
        "title": "Complete React Fundamentals",
        "description": "Master React basics and hooks",
        "category": "Learning",
        "timeframe": "4 weeks",
        "difficulty": "Medium",
        "priority": "High",
        "resources": [],
        "completed": false,
        "estimatedHours": 40
      }
    ],
    "phase2": [],
    "phase3": [],
    "totalEstimatedTime": "6 months",
    "quickWins": []
  },
  "gamification": {
    "level": 3,
    "xp": 1250,
    "xpToNextLevel": 750,
    "badges": [],
    "achievements": [],
    "careerReadinessLevel": 65,
    "weeklyProgress": {
      "skillsLearned": 2,
      "projectsCompleted": 1,
      "applicationsSubmitted": 5,
      "networkingEvents": 0
    }
  },
  "salaryPredictions": {
    "currency": "GBP",
    "entry": 25000,
    "mid": 45000,
    "senior": 75000
  },
  "careerPathSuggestions": [
    "Focus on React ecosystem",
    "Build portfolio projects", 
    "Contribute to open source",
    "Attend networking events"
  ]
}`
    }],
  });
  
//   console.log('Mistral response received:', !!response);
//   console.log('Response type:', typeof response);
  
  if (!response) {
    console.error('Mistral API returned null/undefined response');
    return new Response('Mistral API returned empty response', { status: 500 });
  }
 
  const stream = MistralStream(response);
  //console.log('Stream created:', !!stream);
 
  return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response('Internal server error', { status: 500 });
  }
}