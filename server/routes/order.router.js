require('dotenv').config();

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
    SELECT 
      "orders".*,
      "status"."statusName",
      "status"."testState",
      "status"."sequence"
    FROM "orders" 
    JOIN "status"
    ON "status".id = "orders"."testingStatus"
    WHERE orders."companyID" = $1
    ORDER BY ("status".id = 1) DESC;`;

    const dbRes = await pool.query(queryText, [req.user.companyID]);
    res.send(dbRes.rows);
  } catch (err) {
    console.error('Error in GET /', err.message);
    res.sendStatus(500);
  }
});

router.get('/all', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `
    SELECT 
      "orders".*,
      "status"."statusName",
      "status"."testState",
      "status"."sequence",
      "companies"."companyName", 
      "companies"."alertStatusChange",
      "companies"."alertResultsReady",
      "companies". "alertDelay"
    FROM "orders"
    JOIN "status"
      ON "status".id = "orders"."testingStatus"
    JOIN "companies"
      ON "companies".id = "orders"."companyID"
    WHERE "shippedDate" IS NOT NULL
    ORDER BY "receivedDate" DESC, "companyID";`;
    const dbRes = await pool.query(query);

    res.send(dbRes.rows);
  } catch (err) {
    console.error('Error in GET /all', err.message);
    res.sendStatus(500);
  }
});

router.get('/delayed/:status', rejectUnauthenticated, async (req, res) => {
  try {
    const query = `
    SELECT 
      "orders".*,
      "status"."statusName",
      "status"."testState",
      "status"."sequence",
      "companies"."companyName", 
      "companies"."alertStatusChange",
      "companies"."alertResultsReady",
      "companies". "alertDelay"
    FROM "orders"
    JOIN "status"
      ON "status".id = "orders"."testingStatus"
    JOIN "companies"
      ON "companies".id = "orders"."companyID"
    WHERE "shippedDate" IS NOT NULL AND "orders".delayed=$1;`;
    const dbRes = await pool.query(query, [req.params.status]);
    res.send(dbRes.rows);
  } catch (err) {
    console.error('Error in GET /delayed', err.message);
    res.sendStates(500);
  }
});

/* POST ROUTE */
// Initializes a new sample
router.post('/start', rejectUnauthenticated, async (req, res) => {
  try {
    const { companyID, lotNumber } = req.body;
    const sqlText = `
    INSERT INTO "orders"
    ("companyID", "lotNumber") 
    VALUES 
    ($1, $2) 
    RETURNING id;
    `;
    const dbRes = await pool.query(sqlText, [companyID, lotNumber]);
    if (dbRes.rows.length === 0) {
      res.sendStatus(404);
      return;
    } else {
      res.send(dbRes.rows[0]);
    }
  } catch (err) {
    console.error('Error in POST /start', err.message);
    res.sendStatus(500);
  }
});

/* PUT ROUTES */
// Adds sample information after initial sample insert
router.put('/update', rejectUnauthenticated, async (req, res) => {
  try {
    const orderArray = [req.body.value, req.body.companyID, req.body.orderId];
    const tableName = req.body.name;
    const sqlText = `
    UPDATE "orders"
    SET "${tableName}" = $1
    WHERE "companyID" = $2 AND "id" = $3
    RETURNING *;
    `;
    const dbRes = await pool.query(sqlText, orderArray);

    if (dbRes.rows.length === 0) {
      res.sendStatus(404);
      return;
    } else {
      res.send(dbRes.rows[0]);
    }
  } catch (err) {
    console.error('Error in PUT /update', err.message);
    res.sendStatus(500);
  }
});

// Saves shipping information when sample is finalized
router.put('/shipping', rejectUnauthenticated, async (req, res) => {
  try {
    const order = req.body;
    const orderArray = [
      order.shippedDate,
      order.carrierName,
      order.trackingNumber,
      order.companyID,
      order.orderId,
    ];

    const sqlText = `
      UPDATE "orders"
      SET "shippedDate" = $1, "carrierName" = $2, "trackingNumber" = $3
      WHERE "companyID" = $4 AND "id" = $5
      RETURNING *;
    `;
    const dbRes = await pool.query(sqlText, orderArray);

    if (dbRes.rows.length === 0) {
      res.sendStatus(404);
      return;
    } else {
      res.send(dbRes.rows[0]);
    }
  } catch (err) {
    console.error('Error in PUT /shipping', err.message);
    res.sendStatus(500);
  }
});

// Updates lab changes made
router.put('/lab/update', rejectUnauthenticated, async (req, res) => {
  try {
    const orderArray = [
      req.body.id,
      req.body.delayed,
      req.body.testState,
      req.body.sequence,
      req.body.receivedDate,
      req.body.pdfUrl,
    ];
    const sqlText = `
    UPDATE "orders"
    SET "delayed" = $2,
      "testingStatus" = 
        (SELECT id FROM "status"
          WHERE "testState" = $3
            AND "sequence" = $4),
      "receivedDate" = $5,
      "pdfUrl" = $6
    WHERE "id" = $1
    RETURNING *;
    `;

    const dbRes = await pool.query(sqlText, orderArray);
    res.send(dbRes.rows[0]);
  } catch (err) {
    console.error('Error in PUT /lab/update', err.message);
    res.sendStatus(500);
  }
});

// when ship date has passed
router.put('/date', rejectUnauthenticated, async (req, res) => {
  try {
    const order = req.body;
    const orderArray = [order.testingStatus, order.companyID, order.id];
    const sqlText = `
          UPDATE "orders"
          SET "testingStatus" = $1
          WHERE "companyID" = $2 AND "id" = $3
          RETURNING *;
        `;
    const dbRes = await pool.query(sqlText, orderArray);
    if (dbRes.rows.length === 0) {
      res.sendStatus(404);
      return;
    } else {
      res.send(dbRes.rows[0]);
    }
  } catch (err) {
    console.error('Error in PUT /date', err.message);
    res.sendStatus(500);
  }
});

/* DELETE ROUTES */
router.delete(
  '/delete/:company/:order',
  rejectUnauthenticated,
  async (req, res) => {
    try {
      const sqlText = `
      DELETE FROM "orders" 
      WHERE "companyID" = $1 AND "id" = $2;
    `;

      const dbRes = await pool.query(sqlText, [
        req.params.company,
        req.params.order,
      ]);

      res.sendStatus(200);
    } catch (err) {
      console.error('Error in DELETE /delete', err.message);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
