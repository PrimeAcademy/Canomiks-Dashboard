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
    SELECT companies.*, users.* FROM "companies" JOIN "users" ON "users"."companyID" = "companies"."id";
    `;
    const dbRes = await pool.query(queryText);

    res.send(dbRes.rows);
  } catch (err) {
    console.log('Error in GET /api/company/', err);
    res.sendStatus(500);
  }
});

/* PUT ROUTES */
router.put('/', rejectUnauthenticated, async (req, res) => {
  console.log('req', req.body);
  try {
    const query = `
      UPDATE companies SET active=$1 WHERE id=$2;
      `;
    await pool.query(query, [req.body.active, req.body.company.companyID]);
    res.sendStatus(200);
  } catch (err) {
    console.log('Error in PUT /api/company', err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
