
# Job Matching Platform

A web application that helps users analyze their CVs to identify skill gaps, predict salaries, and suggest career paths.

## Features
- **Skill Gap Analysis**: Identifies missing or improvable skills based on your CV.
- **Salary Predictions**: Estimates potential salaries for your profile.
- **Career Path Suggestions**: Recommends career paths and provides detailed descriptions.

## Tech Stack
- [Next.js](https://nextjs.org/)
- [Mistral API](https://docs.mistral.ai/) (for AI-powered analysis)
- [PDF.js](https://mozilla.github.io/pdf.js/) (for CV parsing)

## How It Works
1. **Upload Your CV**: On the home page, upload your CV (PDF format recommended) and press submit.
2. **Automated Analysis**: The platform extracts information from your CV using PDF.js and analyzes it with the Mistral API.
3. **Results Page**: View your skills, salary predictions, and suggested career paths with detailed descriptions.

## Getting Started
1. Clone the repository and install dependencies:
	```sh
	git clone <repo-url>
	cd job_matcher
	npm install
	```
2. Start the development server:
	```sh
	npm run dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
