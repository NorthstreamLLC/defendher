// Paste this into the Google Sheet: Extensions > Apps Script, replacing any existing code.
// Then Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone".
// Copy the Web app URL into Vercel as GOOGLE_SCRIPT_URL, and put the same SECRET below
// into Vercel as SUBSCRIBE_SECRET.

const SECRET = 'PUT-A-LONG-RANDOM-STRING-HERE';
const SHEET_NAME = 'Subscribers';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return respond({ ok: false, error: 'forbidden' });

    const email = String(data.email || '').trim().toLowerCase();
    if (!email) return respond({ ok: false, error: 'missing_email' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Date', 'Email', 'Source', 'Page']);
      sheet.setFrozenRows(1);
    }

    const last = sheet.getLastRow();
    if (last > 1) {
      const existing = sheet.getRange(2, 2, last - 1, 1).getValues().flat();
      if (existing.indexOf(email) !== -1) return respond({ ok: true, duplicate: true });
    }

    sheet.appendRow([new Date(), email, data.source || '', data.page || '']);
    return respond({ ok: true });
  } catch (err) {
    return respond({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
