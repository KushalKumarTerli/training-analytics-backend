const { db } = require("../config/db");
// This utility function resolves a trainee's employee_id based on their uid.
const resolveEmployeeId = (uid) => {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT employee_id FROM trainees WHERE uid = ?",
      [uid],
      (err, row) => {
        if (err) reject(err);
        else resolve(row ? row.employee_id : null);
      }
    );
  });
};

module.exports = { resolveEmployeeId };
