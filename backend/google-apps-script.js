/**
 * AI Awareness Course - Google Apps Script Backend
 * 
 * Instructions to deploy:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Create a Google Sheet named "AI Course Learners"
 * 5. Deploy as Web App (Executions: Me, Access: Anyone)
 * 6. Copy the web app URL and paste into app.js BACKEND_URL
 */

const SHEET_NAME = 'Learners';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.name) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Name is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Track', 'Status', 'Modules', 'Progress', 'Exam', 'Date', 'Current']);
    }
    
    // Check if learner already exists
    const existing = findLearner(sheet, data.name);
    
    const row = [
      new Date(),
      data.name,
      data.track || 'foundations',
      data.status || 'in_progress',
      data.modules || '0/12',
      data.progress || '0%',
      data.exam || '—',
      data.date || new Date().toISOString().slice(0, 10),
      data.current || '—'
    ];
    
    if (existing) {
      // Update existing row
      sheet.getRange(existing, 1, 1, row.length).setValues([row]);
    } else {
      // Add new row
      sheet.appendRow(row);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Progress saved' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Allow GET requests for testing
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'AI Course Backend Online' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function findLearner(sheet, name) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === name) {
      return i + 1; // Row number (1-indexed)
    }
  }
  return null;
}