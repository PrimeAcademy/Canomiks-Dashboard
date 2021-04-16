const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//GET ROUTE FOR MANAGE CUSTOMERS
router.get('/', rejectUnauthenticated, async (req, res) => {

  try {
    const queryText = `
    SELECT * FROM "companies" 
    `;
    const dbRes = await pool.query(queryText);
    console.log('res', dbRes)
    res.send(dbRes.rows);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;