/**
 * The webhook receiver for the early-access form — Google Apps Script, bound to
 * a Sheet, deployed as a web app. `EARLY_ACCESS_WEBHOOK_URL` points here.
 *
 * It does two things `functions/api/early-access.ts` deliberately does not: it
 * keeps the list somewhere durable, and it tells a person a signup happened.
 * The Pages Function forwards and forgets, because a signup list living in the
 * same repo as the marketing copy is one nobody remembers to look at.
 *
 * Setup, and the parts that are easy to get wrong, are in README.md →
 * "Wiring up the early-access form". The short version:
 *
 *   1. New Google Sheet → Extensions → Apps Script → paste this file over Code.gs
 *   2. Deploy → New deployment → type "Web app"
 *   3. Execute as: Me.  Who has access: Anyone.   ← both matter; see README
 *   4. Copy the /exec URL into EARLY_ACCESS_WEBHOOK_URL
 *
 * The /exec URL is the only credential here, and it is enough of one: it is
 * read server-side in a Pages Function and never reaches a browser.
 */

/** Where rows land. Created on first POST if it is not there yet. */
var SHEET_NAME = "signups";

/** Who hears about a signup. Empty string turns the notification off; the row
 *  is still written, so switching this off loses the ping and never the list. */
var NOTIFY = "";

var HEADERS = ["at", "email", "country", "context"];

function doPost(e) {
  try {
    var record = JSON.parse(e.postData.contents);
    var sheet = sheetForSignups_();

    sheet.appendRow([
      record.at || new Date().toISOString(),
      record.email || "",
      record.country || "",
      record.context || "",
    ]);

    if (NOTIFY) notify_(record);

    return ok_({ ok: true });
  } catch (err) {
    // Rethrow rather than return a body. A web app cannot set its own status
    // code, so returning JSON here would look like success to the Pages
    // Function and the form would tell someone they were on a list they are not
    // on. An uncaught throw is the only way to fail loudly from this side, and
    // it puts the stack in the Executions view — which is where to look when a
    // row is missing.
    console.error("early-access receiver failed: " + err);
    throw err;
  }
}

/** A GET is a person pasting the URL into a browser to see whether it is alive.
 *  Answer that question and nothing else — no rows, no list. */
function doGet() {
  return ok_({ ok: true, note: "early-access receiver. POST to record." });
}

function sheetForSignups_() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notify_(record) {
  MailApp.sendEmail({
    to: NOTIFY,
    replyTo: record.email,
    subject: "portia early access — " + record.email,
    body: [
      "email:   " + record.email,
      "country: " + (record.country || "—"),
      "at:      " + record.at,
      "",
      record.context || "(no context given)",
    ].join("\n"),
  });
}

function ok_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

