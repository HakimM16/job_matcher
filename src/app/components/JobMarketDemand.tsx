'use client';

import React from 'react';
import { JobMarketData } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Minus, Globe, Users, MapPin, BarChart3 } from 'lucide-react';
import { getTrendEmoji } from '@/lib/analysisUtils';

interface JobMarketDemandProps {
  jobMarket: JobMarketData;
  suggestedCareer: string;
  className?: string;
}

const JobMarketDemand: React.FC<JobMarketDemandProps> = ({ 
  jobMarket, 
  suggestedCareer,
  className = "" 
}) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Growing': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'Declining': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Growing': return 'text-green-600 bg-green-50 border-green-200';
      case 'Declining': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const getDemandLevel = (score: number) => {
    if (score >= 80) return { level: 'Very High', color: 'text-green-700' };
    if (score >= 60) return { level: 'High', color: 'text-green-600' };
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'Low', color: 'text-red-600' };
  };

  const demandLevel = getDemandLevel(jobMarket.demandScore);

  return (
    <Card className={`${className} border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-blue-600" />
          <CardTitle className="text-blue-800">Job Market Demand</CardTitle>
        </div>
        <CardDescription className="text-blue-600">
          Market insights for {suggestedCareer} {getTrendEmoji(jobMarket.trend)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Demand Score */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Market Demand</span>
            <span className={`font-bold text-2xl ${demandLevel.color}`}>
              {jobMarket.demandScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${jobMarket.demandScore}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            <span className={`font-semibold ${demandLevel.color}`}>
              {demandLevel.level}
            </span> demand in the current market
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {getTrendIcon(jobMarket.trend)}
              <span className="text-sm font-medium text-gray-700">Growth Trend</span>
            </div>
            <Badge className={getTrendColor(jobMarket.trend)}>
              {jobMarket.trend} (+{jobMarket.growthRate}%)
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Competition</span>
            </div>
            <Badge className={getCompetitionColor(jobMarket.competitionLevel)}>
              {jobMarket.competitionLevel} Competition
            </Badge>
          </div>
        </div>

        {/* Remote Opportunities */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-600" />
            <span className="font-semibold text-gray-700">Remote Work Opportunities</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${jobMarket.remoteOpportunities}%` }}
              />
            </div>
            <span className="font-semibold text-green-600 text-sm">
              {jobMarket.remoteOpportunities}%
            </span>
          </div>
          <p className="text-sm text-gray-600">
            of {suggestedCareer} positions offer remote work options
          </p>
        </div>

        {/* Market Insights */}
        {jobMarket.marketInsights && jobMarket.marketInsights.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Market Insights
            </h4>
            <div className="space-y-2">
              {jobMarket.marketInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Region Specific Data */}
        {jobMarket.regionSpecific && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">Regional Data: {jobMarket.regionSpecific.location}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Local Demand:</span>
                <span className="font-semibold text-blue-800 ml-2">
                  {jobMarket.regionSpecific.localDemand}/100
                </span>
              </div>
              <div>
                <span className="text-blue-700">Avg. Salary:</span>
                <span className="font-semibold text-blue-800 ml-2">
                  {jobMarket.regionSpecific.averageSalary.currency}{jobMarket.regionSpecific.averageSalary.mid.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Market Summary</h4>
          <p className="text-sm text-blue-700">
            The market for {suggestedCareer} shows <strong>{demandLevel.level.toLowerCase()}</strong> demand 
            with a <strong>{jobMarket.trend.toLowerCase()}</strong> trend. 
            Competition is <strong>{jobMarket.competitionLevel.toLowerCase()}</strong>, and 
            <strong> {jobMarket.remoteOpportunities}%</strong> of positions offer remote work flexibility.
            {jobMarket.growthRate > 0 && (
              <> The field is growing at <strong>{jobMarket.growthRate}%</strong> annually.</>
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobMarketDemand;