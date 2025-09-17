'use client';

import React, { useState } from 'react';
import { Company } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, MapPin, Users, Globe, CheckCircle, Filter, ExternalLink } from 'lucide-react';

interface TopCompaniesProps {
  companies: Company[];
  className?: string;
}

const TopCompanies: React.FC<TopCompaniesProps> = ({ companies, className = "" }) => {
  const [filter, setFilter] = useState<'all' | 'hiring' | 'remote'>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');

  const getSizeIcon = (size: string) => {
    switch (size) {
      case 'Startup': return '🚀';
      case 'Small': return '🏢';
      case 'Medium': return '🏭';
      case 'Large': return '🏛️';
      case 'Enterprise': return '🌆';
      default: return '🏢';
    }
  };

  const getRemotePolicyColor = (policy: string) => {
    switch (policy) {
      case 'Remote': return 'bg-green-100 text-green-800 border-green-200';
      case 'Hybrid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Flexible': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredCompanies = companies.filter(company => {
    if (filter === 'hiring' && !company.activelyHiring) return false;
    if (filter === 'remote' && !['Remote', 'Hybrid', 'Flexible'].includes(company.remotePolicy)) return false;
    if (sizeFilter !== 'all' && company.size !== sizeFilter) return false;
    return true;
  });

  const uniqueSizes = Array.from(new Set(companies.map(c => c.size)));

  return (
    <Card className={`${className} border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50`}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-purple-600" />
          <CardTitle className="text-purple-800">Top Companies Hiring</CardTitle>
        </div>
        <CardDescription className="text-purple-600">
          Companies actively looking for talent like you 🎯
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Filters */}
        {companies.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter Companies</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({companies.length})
              </button>
              <button
                onClick={() => setFilter('hiring')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'hiring' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Actively Hiring ({companies.filter(c => c.activelyHiring).length})
              </button>
              <button
                onClick={() => setFilter('remote')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  filter === 'remote' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Remote-Friendly ({companies.filter(c => ['Remote', 'Hybrid', 'Flexible'].includes(c.remotePolicy)).length})
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSizeFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  sizeFilter === 'all' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Sizes
              </button>
              {uniqueSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSizeFilter(size)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    sizeFilter === size 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getSizeIcon(size)} {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Companies List */}
        <div className="space-y-4">
          {filteredCompanies.length === 0 && companies.length > 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No companies match your current filters.</p>
              <p className="text-sm">Try adjusting the filters above.</p>
            </div>
          )}

          {companies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No company data available yet.</p>
              <p className="text-sm">Company recommendations will appear after analysis.</p>
            </div>
          )}

          {filteredCompanies.map((company, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
              <div className="space-y-3">
                {/* Company Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getSizeIcon(company.size)}</div>
                    <div>
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        {company.name}
                        {company.activelyHiring && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {company.website && (
                          <ExternalLink 
                            className="h-3 w-3 text-gray-400 hover:text-purple-600 cursor-pointer"
                            onClick={() => window.open(company.website, '_blank')}
                          />
                        )}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{company.industry}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {company.activelyHiring && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Hiring Now
                    </Badge>
                  )}
                </div>

                {/* Company Details */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {company.size}
                  </Badge>
                  <Badge className={getRemotePolicyColor(company.remotePolicy)}>
                    <Globe className="h-3 w-3 mr-1" />
                    {company.remotePolicy}
                  </Badge>
                </div>

                {/* Culture & Benefits */}
                {(company.culture.length > 0 || company.benefits.length > 0) && (
                  <div className="space-y-2">
                    {company.culture.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">Culture: </span>
                        <span className="text-xs text-gray-700">
                          {company.culture.join(', ')}
                        </span>
                      </div>
                    )}
                    {company.benefits.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-gray-600">Benefits: </span>
                        <span className="text-xs text-gray-700">
                          {company.benefits.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        {filteredCompanies.length > 0 && (
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">Company Insights</h4>
            <div className="text-sm text-purple-700 space-y-1">
              <p>
                <strong>{companies.filter(c => c.activelyHiring).length}</strong> companies are actively hiring
              </p>
              <p>
                <strong>{companies.filter(c => ['Remote', 'Hybrid', 'Flexible'].includes(c.remotePolicy)).length}</strong> offer remote work options
              </p>
              <p>
                Most common company sizes: <strong>
                  {uniqueSizes.slice(0, 3).join(', ')}
                </strong>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCompanies;