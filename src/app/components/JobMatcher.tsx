'use client';

import React from 'react';
import styles from '../styles/JobMatcher.module.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface JobMatcherProps {
  jobMatch: string;
}

const JobMatcher: React.FC<JobMatcherProps> = ({ jobMatch }) => {
  // Extract new fields from the analysis result
  const suggestedCareerMatch = jobMatch.match(/<Suggested Career>([\s\S]*?)<\/Suggested Career>/);
  const skillGapMatch = jobMatch.match(/<Skill Gap Analysis>([\s\S]*?)<\/Skill Gap Analysis>/);
  const salaryPredictionsMatch = jobMatch.match(/<Salary Predictions>([\s\S]*?)<\/Salary Predictions>/);
  const careerPathMatch = jobMatch.match(/<Career Path Suggestions>([\s\S]*?)<\/Career Path Suggestions>/);

  const suggestedCareer = suggestedCareerMatch ? suggestedCareerMatch[1].trim() : 'Not determined';
  const skillGap = skillGapMatch ? skillGapMatch[1] : '';
  const salaryPredictions = salaryPredictionsMatch ? salaryPredictionsMatch[1] : '';
  const careerPath = careerPathMatch ? careerPathMatch[1] : '';

  // Extract list items
  const skillGapItems = skillGap.match(/<li>(.+?)<\/li>/g);
  const salaryPredictionItems = salaryPredictions.match(/<li>(.+?)<\/li>/g);
  const careerPathItems = careerPath.match(/<li>(.+?)<\/li>/g);

  console.log('Job Match Data:', { suggestedCareer, skillGapItems, salaryPredictionItems, careerPathItems });

  return (
    <div className={styles.container}>
      <div className={styles.worth}>{suggestedCareer}</div>
      <p className={styles.subtitle}>Suggested career</p>
      
      <div className={styles.content}>
        <div className={styles.column}>
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Analysis</CardTitle>
              <CardDescription>What to level up next</CardDescription>
            </CardHeader>
            <CardContent>
              {skillGapItems && (
                <ul className={styles.list}>
                  {skillGapItems.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      {item.replace(/<\/?li>/g, '')}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        <div className={styles.column}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Salary Predictions</CardTitle>
              <CardDescription>Market outlook by level</CardDescription>
            </CardHeader>
            <CardContent>
              {salaryPredictionItems && (
                <ul className={styles.list}>
                  {salaryPredictionItems.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      {item.replace(/<\/?li>/g, '')}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
        <div className={styles.column}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Career Path Suggestions</CardTitle>
              <CardDescription>Your next smart moves</CardDescription>
            </CardHeader>
            <CardContent>
              {careerPathItems && (
                <ul className={styles.list}>
                  {careerPathItems.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      {item.replace(/<\/?li>/g, '')}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobMatcher;