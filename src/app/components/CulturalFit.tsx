'use client';

import React from 'react';
import { CulturalFitAnalysis } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building, Users, MapPin, Lightbulb, TrendingUp, Gauge } from 'lucide-react';

interface CulturalFitProps {
  culturalFit: CulturalFitAnalysis;
  className?: string;
}

const CulturalFit: React.FC<CulturalFitProps> = ({ culturalFit, className = "" }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getEnvironmentIcon = (env: string) => {
    switch (env) {
      case 'Startup': return '🚀';
      case 'Corporate': return '🏢';
      case 'Agency': return '⚡';
      case 'Consultancy': return '💼';
      case 'Non-profit': return '🌱';
      default: return '🏢';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return '🎯';
      case 'Medium': return '⚖️';
      case 'Low': return '🛡️';
      default: return '⚖️';
    }
  };

  const getWorkStyleIcon = (style: string) => {
    switch (style) {
      case 'Independent': return '🎯';
      case 'Collaborative': return '🤝';
      case 'Mixed': return '🔄';
      default: return '🤝';
    }
  };

  const environmentScores = [
    { name: 'Startup', score: culturalFit.culturalFitScores.startup, icon: '🚀' },
    { name: 'Corporate', score: culturalFit.culturalFitScores.corporate, icon: '🏢' },
    { name: 'Agency', score: culturalFit.culturalFitScores.agency, icon: '⚡' },
    { name: 'Non-profit', score: culturalFit.culturalFitScores.nonprofit, icon: '🌱' }
  ].sort((a, b) => b.score - a.score);

  const topEnvironment = environmentScores[0];

  return (
    <Card className={`${className} border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-orange-600" />
          <CardTitle className="text-orange-800">Cultural Fit Analysis</CardTitle>
        </div>
        <CardDescription className="text-orange-600">
          Find your ideal work environment and company culture 🎯
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Best Environment Match */}
        <div className="text-center space-y-3">
          <div className="text-4xl mb-2">{topEnvironment.icon}</div>
          <h3 className="text-xl font-bold text-gray-800">
            {topEnvironment.name} Environment
          </h3>
          <div className="text-3xl font-bold text-orange-600">
            {topEnvironment.score}% Match
          </div>
          <p className="text-sm text-gray-600">
            This environment aligns best with your working style and preferences
          </p>
        </div>

        {/* Environment Scores */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800">Environment Fit Scores</h4>
          {environmentScores.map((env) => (
            <div key={env.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{env.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{env.name}</span>
                </div>
                <span className="font-bold text-sm text-gray-600">{env.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${env.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Work Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Work Style</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span>{getWorkStyleIcon(culturalFit.workStyle)}</span>
                <Badge variant="outline">{culturalFit.workStyle}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-600" />
                <Badge variant="outline">{culturalFit.teamSize} Team</Badge>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <Badge variant="outline">{culturalFit.workArrangement}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Preferences</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-gray-600" />
                <Badge variant="outline">{culturalFit.innovationLevel} Innovation</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span>{getRiskIcon(culturalFit.riskTolerance)}</span>
                <Badge variant="outline">{culturalFit.riskTolerance} Risk</Badge>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <Badge variant="outline">{culturalFit.managementStyle}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Personality Traits */}
        {culturalFit.personalityTraits && culturalFit.personalityTraits.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Personality Traits</h4>
            <div className="flex flex-wrap gap-2">
              {culturalFit.personalityTraits.map((trait, index) => (
                <Badge 
                  key={index}
                  className="bg-orange-100 text-orange-800 border-orange-200 capitalize"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Environment Recommendations */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-amber-100 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Cultural Fit Insights
          </h4>
          
          <div className="space-y-3 text-sm text-orange-700">
            <div className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <div>
                <span className="font-semibold">Best Match:</span> You're most aligned with{' '}
                <span className="font-semibold">{topEnvironment.name.toLowerCase()}</span> environments
                ({topEnvironment.score}% compatibility)
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <div>
                <span className="font-semibold">Work Style:</span> You prefer{' '}
                <span className="font-semibold">{culturalFit.workStyle.toLowerCase()}</span> work with{' '}
                <span className="font-semibold">{culturalFit.managementStyle.toLowerCase()}</span> management
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">•</span>
              <div>
                <span className="font-semibold">Innovation Level:</span> You thrive in{' '}
                <span className="font-semibold">{culturalFit.innovationLevel.toLowerCase()}</span> innovation environments
              </div>
            </div>
            
            {culturalFit.riskTolerance && (
              <div className="flex items-start gap-2">
                <span className="text-orange-500 mt-1">•</span>
                <div>
                  <span className="font-semibold">Risk Preference:</span> You're comfortable with{' '}
                  <span className="font-semibold">{culturalFit.riskTolerance.toLowerCase()}</span> risk levels
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Size Recommendation */}
        <div className="p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 <span className="font-semibold">Tip:</span> Focus your job search on{' '}
            <span className="font-semibold text-orange-600">{topEnvironment.name.toLowerCase()}</span> companies
            that value <span className="font-semibold">{culturalFit.workStyle.toLowerCase()}</span> work styles
            and offer <span className="font-semibold">{culturalFit.workArrangement.toLowerCase()}</span> arrangements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalFit;