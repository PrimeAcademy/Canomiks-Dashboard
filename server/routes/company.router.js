const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/* GET ROUTES */
router.get('/', rejectUnauthenticated, async (req, res) => {
  try {
    const queryText = `
    SELECT * FROM "companies";
    `;
    const dbRes = await pool.query(queryText);

    res.send(dbRes.rows);
  } catch (err) {
    console.log('Error in GET /api/company/', err);
    res.sendStatus(500);
  }
});

module.exports = router;
