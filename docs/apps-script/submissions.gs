/**
 * CreativeOS website — submissions endpoint.
 *
 * Bound to the submissions Google Sheet. Receives a POST from the site's
 * /api/submissions route, appends a row, and emails a notification.
 *
 * SETUP
 *   1. Open the Sheet → Extensions → Apps Script.
 *   2. Replace the default Code.gs contents with this file.
 *   3. Set SECRET below to a long random string.
 *   4. Deploy → New deployment → click the gear beside "Select type" → Web app
 *        Execute as:      Me
 *        Who has access:  Anyone      <- required; a Vercel function cannot
 *                                        present a Google identity. The SECRET
 *                                        is what actually guards this URL.
 *   5. Authorise when prompted. Google will warn "this app isn't verified" —
 *      that is expected for your own script. Advanced → Go to … (unsafe) → Allow.
 *   6. Copy the /exec URL into SHEETS_WEBHOOK_URL, and the same SECRET into
 *      SHEETS_WEBHOOK_SECRET, in .env.local and in the Vercel project settings.
 *
 * WHEN YOU EDIT THIS SCRIPT
 *   Deploy → Manage deployments → edit the existing deployment → New version.
 *   Creating a *new* deployment issues a NEW URL, and the old one keeps serving
 *   the old code. That is the usual reason submissions silently stop arriving.
 */

const SECRET = 'REPLACE_WITH_THE_SAME_VALUE_AS_SHEETS_WEBHOOK_SECRET';
const NOTIFY_TO = 'studios@yuvabe.com';
const SHEET_NAME = 'Submissions';
const HEADERS = [
  'Timestamp',
  'Plan',
  'Full name',
  'Work email',
  'Agency',
  'Website',
  'Message',
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.secret !== SECRET) {
      return reply({ ok: false, error: 'unauthorised' });
    }

    sheet().appendRow([
      new Date(),
      body.plan,
      body.fullName,
      body.email,
      body.agency,
      body.website,
      body.message,
    ]);

    notify(body);

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: String(err) });
  }
}

/** The target sheet, created with a frozen header row on first use. */
function sheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let target = book.getSheetByName(SHEET_NAME);

  if (!target) {
    target = book.insertSheet(SHEET_NAME);
    target.appendRow(HEADERS);
    target.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    target.setFrozenRows(1);
  }

  return target;
}

/**
 * replyTo is the submitter, so hitting Reply in the inbox reaches them
 * directly instead of the account that owns this script.
 */
function notify(body) {
  MailApp.sendEmail({
    to: NOTIFY_TO,
    replyTo: body.email,
    subject: 'CreativeOS — ' + body.plan + ' enquiry from ' + body.agency,
    body: [
      'Plan of interest: ' + body.plan,
      '',
      'Name:    ' + body.fullName,
      'Email:   ' + body.email,
      'Agency:  ' + body.agency,
      'Website: ' + body.website,
      '',
      'Message:',
      body.message,
    ].join('\n'),
  });
}

function reply(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
