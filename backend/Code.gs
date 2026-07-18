const SPREADSHEET_ID = '1IgoQmJrNu39oxysjEFbtTcxaDdqi2bXq9bGmGMGpkak';
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
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    
    // Ensure headers exist if the sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Track', 'Status', 'Modules', 'Progress', 'Exam', 'Date', 'Current']);
    }
    
    // Check if learner already exists
    const existingRow = findLearner(sheet, data.name);
    
    const row = [
      new Date(), // Keeps the update timestamp dynamic
      data.name,
      data.track || 'foundations',
      data.status || 'in_progress',
      data.modules || '0/12',
      data.progress || '0%',
      data.exam || '—',
      data.date || new Date().toISOString().slice(0, 10),
      data.current || '—'
    ];
    
    if (existingRow) {
      // Update existing row (Row mapping: 1-indexed)
      sheet.getRange(existingRow, 1, 1, row.length).setValues([row]);
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
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'AI Course Backend Online' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function findLearner(sheet, name) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return null; // Only headers or empty
  
  // Optimization: Only pull the Name column (Column B) instead of the whole sheet
  const names = sheet.getRange(1, 2, lastRow, 1).getValues();
  
  for (let i = 1; i < names.length; i++) {
    if (names[i][0] === name) {
      return i + 1; // Returns exact 1-indexed row number
    }
  }
  return null;
}