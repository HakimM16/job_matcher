'use client';

import React, { useState } from 'react';
import { Company } from '@/types/analysis';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import styles from '../styles/TopCompanies.module.css';

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
      case 'Remote': return 'green';
      case 'Hybrid': return 'blue';
      case 'Flexible': return 'purple';
      default: return 'gray';
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
    <Card className={`${className} ${styles.topCompaniesCard}`}>
      <CardHeader className={styles.topCompaniesHeader}>
        <div className={styles.topCompaniesTitleContainer}>
          <span className={styles.topCompaniesIcon}>🏢</span>
          <CardTitle className={styles.topCompaniesTitle}>Top Companies Hiring</CardTitle>
        </div>
        <CardDescription className={styles.topCompaniesDescription}>
          Companies actively looking for talent like you 🎯
        </CardDescription>
      </CardHeader>
      
      <CardContent className={styles.topCompaniesContent}>
        {/* Filters */}
        {companies.length > 0 && (
          <div className={styles.filtersSection}>
            <div className={styles.filterHeader}>
              <span className={styles.filterIcon}>🔍</span>
              <span className={styles.filterLabel}>Filter Companies</span>
            </div>
            
            <div className={styles.filterButtons}>
              <button
                onClick={() => setFilter('all')}
                className={`${styles.filterButton} ${filter === 'all' ? styles.filterButtonActive : styles.filterButtonInactive}`}
              >
                All ({companies.length})
              </button>
              <button
                onClick={() => setFilter('hiring')}
                className={`${styles.filterButton} ${filter === 'hiring' ? styles.filterButtonGreenActive : styles.filterButtonInactive}`}
              >
                Actively Hiring ({companies.filter(c => c.activelyHiring).length})
              </button>
              <button
                onClick={() => setFilter('remote')}
                className={`${styles.filterButton} ${filter === 'remote' ? styles.filterButtonBlueActive : styles.filterButtonInactive}`}
              >
                Remote-Friendly ({companies.filter(c => ['Remote', 'Hybrid', 'Flexible'].includes(c.remotePolicy)).length})
              </button>
            </div>

            <div className={styles.sizeFilterButtons}>
              <button
                onClick={() => setSizeFilter('all')}
                className={`${styles.filterButton} ${sizeFilter === 'all' ? styles.filterButtonActive : styles.filterButtonInactive}`}
              >
                All Sizes
              </button>
              {uniqueSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSizeFilter(size)}
                  className={`${styles.filterButton} ${sizeFilter === size ? styles.filterButtonActive : styles.filterButtonInactive}`}
                >
                  {getSizeIcon(size)} {size}
                </button>
              ))}
            </div>
          </div>
        )}
        <br />

        {/* Companies List */}
        <div className={styles.companiesList}>
          {filteredCompanies.length === 0 && companies.length > 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🏢</div>
              <p className={styles.emptyStateText}>No companies match your current filters.</p>
              <p className={styles.emptyStateSubtext}>Try adjusting the filters above.</p>
            </div>
          )}

          {companies.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>🏢</div>
              <p className={styles.emptyStateText}>No company data available yet.</p>
              <p className={styles.emptyStateSubtext}>Company recommendations will appear after analysis.</p>
            </div>
          )}

          {filteredCompanies.map((company, index) => (
            <div key={index} className={styles.companyCard}>
              <div className={styles.companyContent}>
                {/* Company Header */}
                <div className={styles.companyHeader}>
                  <div className={styles.companyInfo}>
                    <div className={styles.companyIcon}>{getSizeIcon(company.size)}</div>
                    <div className={styles.companyDetails}>
                      <h4 className={styles.companyName}>
                        {company.name}
                        {company.activelyHiring && (
                          <span className={styles.companyNameIcon}>✅</span>
                        )}
                        {company.website && (
                          <span 
                            className={styles.companyExternalLink}
                            onClick={() => window.open(company.website, '_blank')}
                          >
                            🔗
                          </span>
                        )}
                      </h4>
                      <div className={styles.companyMeta}>
                        <span>{company.industry}</span>
                        <span>•</span>
                        <span className={styles.companyLocation}>
                          <span className={styles.locationIcon}>📍</span>
                          {company.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  {company.activelyHiring && (
                    <Badge className={styles.hiringBadge}>
                      Hiring Now
                    </Badge>
                  )}
                </div>

                {/* Company Details */}
                <div className={styles.companyBadges}>
                  <Badge variant="outline" className={`${styles.companyBadge} ${styles.companyBadgeOutline}`}>
                    <span className={styles.badgeIcon}>👥</span>
                    {company.size}
                  </Badge>
                  <Badge className={`${styles.companyBadge} ${styles[`companyBadge${getRemotePolicyColor(company.remotePolicy).charAt(0).toUpperCase() + getRemotePolicyColor(company.remotePolicy).slice(1)}`]}`}>
                    <span className={styles.badgeIcon}>🌐</span>
                    {company.remotePolicy}
                  </Badge>
                </div>

                {/* Culture & Benefits */}
                {(company.culture.length > 0 || company.benefits.length > 0) && (
                  <div className={styles.companyExtraInfo}>
                    {company.culture.length > 0 && (
                      <div className={styles.cultureInfo}>
                        <span className={styles.cultureLabel}>Culture: </span>
                        <span className={styles.cultureText}>
                          {company.culture.join(', ')}
                        </span>
                      </div>
                    )}
                    {company.benefits.length > 0 && (
                      <div className={styles.benefitsInfo}>
                        <span className={styles.benefitsLabel}>Benefits: </span>
                        <span className={styles.benefitsText}>
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
          <div className={styles.summarySection}>
            <h4 className={styles.summaryTitle}>Company Insights</h4>
            <div className={styles.summaryContent}>
              <p className={styles.summaryItem}>
                <span className={styles.summaryStrong}>{companies.filter(c => c.activelyHiring).length}</span> companies are actively hiring
              </p>
              <p className={styles.summaryItem}>
                <span className={styles.summaryStrong}>{companies.filter(c => ['Remote', 'Hybrid', 'Flexible'].includes(c.remotePolicy)).length}</span> offer remote work options
              </p>
              <p className={styles.summaryItem}>
                Most common company sizes: <span className={styles.summaryStrong}>
                  {uniqueSizes.slice(0, 3).join(', ')}
                </span>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopCompanies;