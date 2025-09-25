// This is where the mistral api route is defined.
import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';
 
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
 
    const response = await mistral.chatStream({
    model: 'open-mistral-7b',
    messages: [{ 
      role: 'user',
      content: `CONTEXT: You are a comprehensive career coach, labor market analyst, and professional development expert.
  Your task is to analyze the provided CV and, based on the candidate's skills, education, and experience, determine and return the single most highly matched career path in tech. Your analysis must prioritize the strongest alignment between the candidate's background and specific tech roles, considering all relevant CV sections (skills, education, experience).

  INSTRUCTIONS:
  - Carefully review the candidate's skills, education, and experience sections.
  - Identify the tech career path that most closely matches the candidate's qualifications, strengths, and potential.
  - Justify your choice by referencing specific skills, educational background, and relevant experience from the CV.
  - Do not suggest multiple careers; focus on the one best-matched tech path.
  - Provide a comprehensive analysis including:
    1. The most highly matched tech career path and why it fits best.
    2. Key strengths and qualifications that support this match.
    3. Any skill gaps or areas for improvement for this path.
    4. Actionable next steps for pursuing this career.
  - Ensure your output is practical, specific, and tailored to the candidate's actual CV content.
  - Give realistic scores for demandScore, growthRate and remoteOpportunities based on current market data for the suggested career.
  - For topCompanies, suggest 3 real companies that are actively hiring for the suggested career path and their benefits must be UK based such as 28 days of annual leave, professional development opportunities and pension schemes.
  - Give realistic percentages and scores for cultural fit based on the candidate's personality traits and preferences.
  - For learningResources, suggest resources that are highly rated (4.5+), relevant to the suggested career, and suitable for the candidate's skill level and the links must be to a google search page for the company course page. e.g. https://www.google.com/search?q=coursera/Java, not to specific course pages. e.g. https://coursera.org/Java.
IMPORTANT: Calculate ALL percentages, scores, and ratings based on the actual CV content. Do NOT use the example values below. Analyze the candidate's experience, skills, education, and background to determine realistic match percentages, skill gaps, market demand scores, and all other metrics.

Keep everything practical, encouraging, and specific to the candidate's profile.
CAREER MATCHING LOGIC - FOLLOW THIS PRIORITY:
1. Educational Background Matching:
   - Mathematics/Statistics/Physics → Data Scientist, ML Engineer, Quantitative Analyst
   - Computer Science/Software Engineering → Software Developer, DevOps Engineer, Systems Engineer
   - Business/Economics/Finance → Product Manager, Business Analyst, Technical Consultant
   - Psychology/Design/Arts → UX/UI Designer, User Researcher, Creative Technologist
   - Biology/Chemistry/Research → Bioinformatics, Research Software Engineer, Data Analyst
   - Engineering (non-CS) → Technical Product Manager, Systems Engineer, Solutions Architect

2. Skills-Based Matching (if education unclear):
   - Programming languages → Software Developer roles matching the languages
   - Data analysis/Statistics → Data roles (Scientist, Analyst, Engineer)
   - Design tools → Design roles (UX/UI, Graphic, Web Design)
   - Project management → Product Manager, Technical Project Manager

3. Experience-Based Matching:
   - Previous tech experience → Build upon existing experience
   - Research experience → Data Science, Research Engineer
   - Teaching/Training → Developer Relations, Technical Writing
   - Sales/Customer service → Technical Sales, Customer Success

IMPORTANT: The suggested career MUST align with the candidate's strongest qualifications, not default to generic "Software Developer"

-------
RESUME:
${prompt}
-------
OUTPUT FORMAT (STRICT JSON - CALCULATE ALL VALUES BASED ON ACTUAL CV ANALYSIS):
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
      "url": "https://www.google.com/search?q=coursera/course/javascript",
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