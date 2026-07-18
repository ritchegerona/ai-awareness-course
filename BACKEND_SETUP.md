# Google Drive Backend Setup Guide

This guide explains how to set up automatic progress tracking using Google Drive (via Google Apps Script).

## Overview

When configured, learner progress will be automatically saved to a Google Sheet in your Google Drive, allowing you to track all users in real-time.

## Step 1: Create Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "AI Course Learners" (or any name you prefer)
4. Note the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

## Step 2: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Create a file named `Code.gs` (or use the default `Code.gs`)
4. Copy and paste the code from `/backend/google-apps-script.js`

## Step 3: Link Script to Spreadsheet

1. In the Apps Script editor, click "Select Project" (top-left)
2. Click "Add a file" → "Script file" → Name it `Code.gs` if not already
3. Click the "+" next to "Services" and add "Google Sheets API"
4. Or: In the script, go to "Project Settings" and link to your spreadsheet

## Step 4: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Select type: "Web app"
3. Set:
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
4. Click "Deploy"
5. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 5: Configure Your Course

1. Open `/public/js/app.js`
2. Find line: `const BACKEND_URL = '';`
3. Replace with your Web App URL:
   ```javascript
   const BACKEND_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save and redeploy to GitHub Pages

## Step 6: View Your Records

1. Run your course locally: `node server.js` or `start.sh`
2. Open `http://localhost:3000`
3. Check your Google Sheet - progress will appear there!

## Data Fields

Each progress entry includes:
- **Timestamp**: When the progress was recorded
- **Name**: Learner's name
- **Track**: Current track (foundations, intermediate, advanced)
- **Status**: `not_started`, `in_progress`, or `completed`
- **Modules**: X/Y modules completed
- **Progress**: Percentage complete
- **Exam**: Exam score or — if not taken
- **Date**: Last update date
- **Current**: Current module being worked on

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Permission denied" | Make sure "Who has access" is set to "Anyone" in deployment |
| Data not appearing | Check the spreadsheet is linked to the script |
| CORS errors | The script uses no-cors mode - check the sheet directly |
| No internet | Progress saves to localStorage and will sync when online |

## Privacy Notes

- Only you (the script owner) can access the spreadsheet
- Learners cannot see each other's data
- Data is sent over HTTPS to Google's servers