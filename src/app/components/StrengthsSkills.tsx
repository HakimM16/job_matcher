'use client';

import React from 'react';
import { StrengthsAnalysis } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "../components/ui/badge";
import { Star, TrendingUp, Award, Heart, Zap } from 'lucide-react';

interface StrengthsSkillsProps {
  strengths: StrengthsAnalysis;
  className?: string;
}

const StrengthsSkills: React.FC<StrengthsSkillsProps> = ({ strengths, className = "" }) => {
  const iconMap = {
    highlightedSkills: Star,
    keyStrengths: TrendingUp,
    experienceHighlights: Award,
    softSkills: Heart,
    positiveIndicators: Zap
  };

  const colorMap = {
    highlightedSkills: "bg-blue-100 text-blue-800 border-blue-200",
    keyStrengths: "bg-green-100 text-green-800 border-green-200",
    experienceHighlights: "bg-purple-100 text-purple-800 border-purple-200",
    softSkills: "bg-pink-100 text-pink-800 border-pink-200",
    positiveIndicators: "bg-yellow-100 text-yellow-800 border-yellow-200"
  };

  const sections = [
    {
      key: 'highlightedSkills' as keyof StrengthsAnalysis,
      title: '⭐ Highlighted Skills',
      description: 'Your standout technical abilities',
      items: strengths.highlightedSkills
    },
    {
      key: 'keyStrengths' as keyof StrengthsAnalysis,
      title: '💪 Key Strengths',
      description: 'What makes you unique',
      items: strengths.keyStrengths
    },
    {
      key: 'experienceHighlights' as keyof StrengthsAnalysis,
      title: '🏆 Experience Highlights',
      description: 'Your proven track record',
      items: strengths.experienceHighlights
    },
    {
      key: 'softSkills' as keyof StrengthsAnalysis,
      title: '❤️ Soft Skills',
      description: 'Your interpersonal superpowers',
      items: strengths.softSkills
    },
    {
      key: 'positiveIndicators' as keyof StrengthsAnalysis,
      title: '⚡ Positive Indicators',
      description: 'Signals of your potential',
      items: strengths.positiveIndicators
    }
  ];

  const totalStrengths = sections.reduce((acc, section) => acc + section.items.length, 0);

  return (
    <Card className={`${className} border-green-200 bg-gradient-to-br from-green-50 to-blue-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <CardTitle className="text-green-800">Your Strengths & Skills</CardTitle>
        </div>
        <CardDescription className="text-green-600">
          🎉 We found {totalStrengths} awesome things about your profile! Here's what makes you shine:
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {sections.map((section) => {
          if (!section.items || section.items.length === 0) return null;
          
          const IconComponent = iconMap[section.key];
          
          return (
            <div key={section.key} className="space-y-3">
              <div className="flex items-center gap-2">
                <IconComponent className="h-4 w-4 text-gray-600" />
                <h4 className="font-semibold text-gray-800">{section.title}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">{section.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {section.items.map((item, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className={`${colorMap[section.key]} text-xs px-3 py-1 font-medium transition-all hover:scale-105`}
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
        
        {totalStrengths === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Star className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No strengths data available yet.</p>
            <p className="text-sm">Upload your resume to discover your superpowers!</p>
          </div>
        )}
        
        {totalStrengths > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Strengths Summary</span>
            </div>
            <p className="text-sm text-green-700">
              You have a strong foundation with {strengths.highlightedSkills?.length || 0} key technical skills,
              {' '}{strengths.keyStrengths?.length || 0} core strengths, and
              {' '}{strengths.softSkills?.length || 0} valuable soft skills. 
              This combination makes you a well-rounded candidate! 🚀
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StrengthsSkills;