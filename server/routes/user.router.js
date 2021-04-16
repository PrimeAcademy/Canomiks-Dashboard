const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, async (req, res) => {
  // Send back user object from the session (previously queried from the database)
  await pool.query(`SELECT users.id, users.name, users.email, users."companyID", users."authLevel", companies."companyName", companies."active" FROM "users" JOIN companies ON users."companyID"=companies.id WHERE users.id = $1;`, [req.user.id]);
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  try {
    // capture all the data from req.body
    const {
      companyName,
      companyAddress,
      city,
      state,
      zip,
      phoneNumber,
      teamLeadName,
      email
    } = req.body;
    const password = encryptLib.encryptPassword(req.body.password);

    // send the first query, inserts the company
    const queryText = `INSERT INTO "companies" ("companyName", "address", "city", "state", "zip", "phoneNumber")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;
    const dbRes = await pool.query(queryText, [
      companyName,
      companyAddress,
      city,
      state,
      zip,
      phoneNumber,
    ]);

    // the second insert, for the individual user
    const companyID = dbRes.rows[0].id;
    const queryTextTwo = `INSERT INTO "users" ("email", "password", "name", "companyID") VALUES ($1, $2, $3, $4)`;
    const dbResTwo = await pool.query(queryTextTwo, [email, password, teamLeadName, companyID]);
    res.sendStatus(201);
  }
  catch (err) {
    console.log('💥 something went wrong in the register route');
    console.log(err);
    res.sendStatus(500);
  }

});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  console.log('log in user.router');
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
