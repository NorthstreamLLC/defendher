// Paste this into the Google Sheet: Extensions > Apps Script, replacing any existing code.
// First time: Deploy > New deployment > Web app: Execute as "Me", Who has access "Anyone".
// Updating later: Deploy > Manage deployments > pencil icon > Version: New version > Deploy
// (the Web app URL stays the same).
// Copy the Web app URL into Vercel as GOOGLE_SCRIPT_URL, and put the same SECRET below
// into Vercel as SUBSCRIBE_SECRET.

const SECRET = 'PUT-YOUR-OWN-LONG-RANDOM-STRING-HERE';
const OWNER_EMAIL = 'Defendhersports@gmail.com'; // contact messages are emailed here
const SUBSCRIBERS_SHEET = 'Subscribers';
const MESSAGES_SHEET = 'Messages';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return respond({ ok: false, error: 'forbidden' });

    const email = String(data.email || '').trim().toLowerCase();
    if (!email) return respond({ ok: false, error: 'missing_email' });

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'message') {
      const sheet = getSheet(ss, MESSAGES_SHEET, ['Date', 'Name', 'Email', 'Message', 'Page']);
      sheet.appendRow([new Date(), data.name || '', email, data.message || '', data.page || '']);
      try {
        MailApp.sendEmail({
          to: OWNER_EMAIL,
          replyTo: email,
          subject: 'New website message from ' + (data.name || email),
          body: 'From: ' + (data.name || '') + ' <' + email + '>\n\n' + (data.message || ''),
        });
      } catch (mailErr) {
        // The message is already saved in the sheet, so don't fail the request.
      }
      return respond({ ok: true });
    }

    const sheet = getSheet(ss, SUBSCRIBERS_SHEET, ['Date', 'Email', 'Source', 'Page']);
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

function getSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function respond(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
