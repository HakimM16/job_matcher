'use client';

import React from 'react';
import { MatchPercentage } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, Brain, Briefcase, GraduationCap, Target } from 'lucide-react';

interface MatchPercentageProps {
  matchPercentage: MatchPercentage;
  suggestedCareer: string;
  className?: string;
}

const MatchPercentageComponent: React.FC<MatchPercentageProps> = ({ 
  matchPercentage, 
  suggestedCareer,
  className = "" 
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-indigo-600';
    if (score >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { emoji: '🎉', message: 'Excellent match!' };
    if (score >= 60) return { emoji: '👍', message: 'Good match' };
    if (score >= 40) return { emoji: '📈', message: 'Room for growth' };
    return { emoji: '💪', message: 'Let\'s build those skills!' };
  };

  const categories = [
    {
      key: 'technical',
      title: 'Technical Skills',
      icon: Brain,
      description: 'Programming and technical abilities',
      score: matchPercentage.technical
    },
    {
      key: 'experience',
      title: 'Experience',
      icon: Briefcase,
      description: 'Relevant work experience',
      score: matchPercentage.experience
    },
    {
      key: 'education',
      title: 'Education',
      icon: GraduationCap,
      description: 'Educational background',
      score: matchPercentage.education
    }
  ];

  const overallMessage = getScoreMessage(matchPercentage.overall);

  return (
    <Card className={`${className} border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50`}>
      <CardHeader className="pb-6">
        <div className="flex items-center gap-2">
          <Target className="h-6 w-6 text-indigo-600" />
          <CardTitle className="text-indigo-800">CV Match Score</CardTitle>
        </div>
        <CardDescription className="text-indigo-600">
          How well you match {suggestedCareer} requirements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-4">
          <div className="relative w-32 h-32 mx-auto">
            {/* Background Circle */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
            
            {/* Progress Circle */}
            <div 
              className={`absolute inset-0 rounded-full border-8 border-transparent bg-gradient-to-r ${getScoreBackground(matchPercentage.overall)} animate-pulse`}
              style={{
                background: `conic-gradient(from 0deg, var(--tw-gradient-stops) ${matchPercentage.overall * 3.6}deg, transparent ${matchPercentage.overall * 3.6}deg)`,
                borderRadius: '50%',
                mask: 'radial-gradient(circle at center, transparent 60%, black 60%)',
                WebkitMask: 'radial-gradient(circle at center, transparent 60%, black 60%)'
              }}
            ></div>
            
            {/* Score Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(matchPercentage.overall)}`}>
                  {matchPercentage.overall}%
                </div>
                <div className="text-xs text-gray-600">Overall</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-lg font-semibold text-gray-800">
              {overallMessage.emoji} {overallMessage.message}
            </div>
            <p className="text-sm text-gray-600">
              You're {matchPercentage.overall >= 70 ? 'well-positioned' : 'on your way'} for this role
            </p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 text-center">Score Breakdown</h4>
          
          {categories.map((category) => {
            const IconComponent = category.icon;
            
            return (
              <div key={category.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {category.title}
                    </span>
                  </div>
                  <span className={`font-bold text-sm ${getScoreColor(category.score)}`}>
                    {category.score}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${getScoreBackground(category.score)} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
                
                <p className="text-xs text-gray-500">{category.description}</p>
              </div>
            );
          })}
        </div>

        {/* Improvement Suggestions */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Quick Improvement Tips
          </h4>
          
          <div className="space-y-2 text-sm text-indigo-700">
            {matchPercentage.technical < 70 && (
              <div className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Focus on building core technical skills for this role</span>
              </div>
            )}
            
            {matchPercentage.experience < 70 && (
              <div className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Consider building portfolio projects to demonstrate experience</span>
              </div>
            )}
            
            {matchPercentage.education < 70 && (
              <div className="flex items-start gap-2">
                <span className="text-indigo-500 mt-1">•</span>
                <span>Explore relevant courses or certifications to strengthen your background</span>
              </div>
            )}
            
            {matchPercentage.overall >= 70 && (
              <div className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span>You're in great shape! Focus on polishing your resume and portfolio</span>
              </div>
            )}
          </div>
        </div>

        {/* Match Summary */}
        <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            Based on your profile, you have a{' '}
            <span className={`font-semibold ${getScoreColor(matchPercentage.overall)}`}>
              {matchPercentage.overall >= 70 ? 'strong' : matchPercentage.overall >= 50 ? 'moderate' : 'developing'}
            </span>{' '}
            match for <span className="font-semibold text-gray-800">{suggestedCareer}</span> positions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchPercentageComponent;