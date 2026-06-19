// The Web App code to receive direct website submissions
// This combines BOTH RSVP and Blessings into ONE single sheet!

const SHEET_NAME = 'RSVP & Blessings';

// Define the combined headers
const HEADERS = [
  'Timestamp', 
  'Submission Type', 
  'Name', 
  'Attendance', 
  'Number of Guests', 
  'Dietary Requirements', 
  'Blessing / Wish Message'
];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheetType = e.parameter.sheet; 
    const timestamp = new Date();
    
    // Get the combined sheet
    const sheet = getOrCreateSheet(ss, SHEET_NAME, HEADERS);
    
    if (sheetType === 'RSVP') {
      const name = e.parameter.name || '';
      const guests = e.parameter.guests || '';
      const dietary = e.parameter.dietary || '';
      const attendance = e.parameter.attendance || 'Yes';
      
      // Append the RSVP row (leaves the Blessing column blank)
      sheet.appendRow([timestamp, 'RSVP Form', name, attendance, guests, dietary, '']);
      
    } else if (sheetType === 'WISH') {
      const name = e.parameter.name || '';
      const message = e.parameter.message || '';
      
      // Append the Blessing row (leaves attendance/guests/dietary blank)
      sheet.appendRow([timestamp, 'Blessing Form', name, '', '', '', message]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f3f3');
    sheet.autoResizeColumns(1, headers.length);
  }
  return sheet;
}

function doGet(e) {
  return ContentService.createTextOutput("InviteMint Web App is active and receiving BOTH RSVPs and Blessings!");
}
