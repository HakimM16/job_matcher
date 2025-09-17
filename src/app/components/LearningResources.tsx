'use client';

import React, { useState } from 'react';
import { LearningResource } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, ExternalLink, Star, Clock, DollarSign, Filter, Award, PlayCircle } from 'lucide-react';

interface LearningResourcesProps {
  resources: LearningResource[];
  className?: string;
}

const LearningResources: React.FC<LearningResourcesProps> = ({ resources, className = "" }) => {
  const [filter, setFilter] = useState<'all' | 'free' | 'course' | 'certification'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Course': return <PlayCircle className="h-4 w-4" />;
      case 'Certification': return <Award className="h-4 w-4" />;
      case 'Tutorial': return <BookOpen className="h-4 w-4" />;
      case 'Book': return <BookOpen className="h-4 w-4" />;
      case 'Documentation': return <BookOpen className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Course': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Certification': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Tutorial': return 'bg-green-100 text-green-800 border-green-200';
      case 'Book': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Documentation': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCostColor = (cost: string) => {
    switch (cost) {
      case 'Free': return 'bg-green-100 text-green-800 border-green-200';
      case 'Freemium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Paid': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredResources = resources.filter(resource => {
    if (filter === 'free' && resource.cost !== 'Free') return false;
    if (filter === 'course' && resource.type !== 'Course') return false;
    if (filter === 'certification' && resource.type !== 'Certification') return false;
    if (difficultyFilter !== 'all' && resource.difficulty !== difficultyFilter) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />);
    }
    return stars;
  };

  const uniqueDifficulties = Array.from(new Set(resources.map(r => r.difficulty)));

  return (
    <Card className={`${className} border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-emerald-600" />
          <CardTitle className="text-emerald-800">Learning Resources</CardTitle>
        </div>
        <CardDescription className="text-emerald-600">
          Curated courses and tutorials to fill your skill gaps 📚
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Filters */}
        {resources.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter Resources</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({resources.length})
              </button>
              <button
                onClick={() => setFilter('free')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'free' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Free ({resources.filter(r => r.cost === 'Free').length})
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'course' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Courses ({resources.filter(r => r.type === 'Course').length})
              </button>
              <button
                onClick={() => setFilter('certification')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'certification' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Certifications ({resources.filter(r => r.type === 'Certification').length})
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDifficultyFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  difficultyFilter === 'all' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Levels
              </button>
              {uniqueDifficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    difficultyFilter === difficulty 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Resources List */}
        <div className="space-y-4">
          {filteredResources.length === 0 && resources.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No resources match your current filters.</p>
              <p className="text-sm">Try adjusting the filters above.</p>
            </div>
          )}

          {resources.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No learning resources available yet.</p>
              <p className="text-sm">Resources will be recommended after analysis.</p>
            </div>
          )}

          {filteredResources.map((resource, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-all group">
              <div className="space-y-3">
                {/* Resource Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(resource.type)}
                      <h4 className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                        {resource.title}
                      </h4>
                      <ExternalLink 
                        className="h-4 w-4 text-gray-400 hover:text-emerald-600 cursor-pointer transition-colors"
                        onClick={() => window.open(resource.url, '_blank')}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                    <p className="text-xs text-gray-500">by {resource.provider}</p>
                  </div>
                </div>

                {/* Resource Details */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={getTypeColor(resource.type)}>
                    {getTypeIcon(resource.type)}
                    <span className="ml-1">{resource.type}</span>
                  </Badge>
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                  <Badge className={getCostColor(resource.cost)}>
                    <DollarSign className="h-3 w-3 mr-1" />
                    {resource.cost}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {resource.duration}
                  </Badge>
                </div>

                {/* Rating & Skills */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {renderStars(resource.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {resource.rating.toFixed(1)}
                    </span>
                  </div>
                  
                  {resource.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {resource.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {resource.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => window.open(resource.url, '_blank')}
                  className="w-full mt-3 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  Start Learning
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {filteredResources.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg border border-emerald-200">
            <h4 className="font-semibold text-emerald-800 mb-2">Learning Insights</h4>
            <div className="text-sm text-emerald-700 space-y-1">
              <p>
                <strong>{resources.filter(r => r.cost === 'Free').length}</strong> free resources available
              </p>
              <p>
                <strong>{resources.filter(r => r.type === 'Certification').length}</strong> certification opportunities
              </p>
              <p>
                Average rating: <strong>
                  {(resources.reduce((acc, r) => acc + r.rating, 0) / resources.length).toFixed(1)}
                </strong> ⭐
              </p>
              <p className="text-xs mt-2 text-emerald-600">
                💡 Start with free resources to build foundation, then pursue paid courses for advanced skills.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningResources;