const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
  console.log('req.user.companyID:', req.user.companyID);
  console.log('in get');
  try {
    const queryText = `SELECT * FROM "orders" WHERE "companyID" = $1`;
    const dbRes = await pool.query(queryText, [req.user.companyID]);
    res.send(dbRes.rows);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
