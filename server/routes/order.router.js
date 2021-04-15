const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, async (req, res) => {
  // GET route code here
  try {
    const queryText = `
    SELECT * FROM "orders" 
    WHERE orders."companyID" = $1 
    ORDER BY ("testingStatus" = 'Pre-shipment') DESC;`;
    const dbRes = await pool.query(queryText, [req.user.companyID]);
    res.send(dbRes.rows);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
//GET ROUTE FOR MANAGE CUSTOMERS
router.get('/companies', async (req, res) => {
  
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

router.put('/newOrder/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const shipping = req.body;
    const sqlParams = [
      shipping.id,
      userId,
      shipping.shippedDate,
      shipping.carrierName,
      shipping.trackingNumber,
    ];
    const sqlQuery = `UPDATE "orders" 
    SET "shippedDate" = $3, "carrierName" = $4, "trackingNumber" = $5
    WHERE "id" = $1 
    RETURNING "id";`;
    const dbRes = await pool.query(sqlQuery, sqlParams)
    res.send(dbRes.rows[0])
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
})
/**
 * POST route template
 */

// the initial sample order, for when they start the process.
router.post('/initialOrder', rejectUnauthenticated, async (req, res) => {
  try {
    const order = req.body.companyID;
    const sqlText = `
    INSERT INTO "orders"
    ("companyID")
    VALUES
    ($1);
    `;
    await pool.query(sqlText, [order]);
    res.sendStatus(200);
  }
  catch (err) {
    console.log('error in the initial order post', err);
    res.sendStatus(500);
  }
});

// for add sample page to save the sample information; after initial insert
router.put('/newOrder', rejectUnauthenticated, async (req, res) => {
  // is the order id sent over in the req.body or as a param? 
  //  right now its set up as a req.body
  try {
    const order = req.body;
    const orderArray = [
      order.companyID,  //1
      order.ingredientName, //2
      order.ingredientAmount, //3
      order.ingredientUnit, //4
      order.format, //5
      order.purity, //6
      order.dateManufactured, //7
      order.lotNumber, //8
      order.extractionMethod, //9
      order.city, //10
      order.state, //11
      order.country, //12
      order.harvestDate, //13
      order.cropStrain, //14
      order.sustainabilityInfo, //15
      order.orderId //16
    ];
    const sqlText = `
      UPDATE "orders"
      SET "ingredientName" = $2, "ingredientAmount" = $3, "ingredientUnit" = $4,
      "format" = $5, "purity" = $6, "dateManufactured" = $7, "lotNumber" = $8,
      "extractionMethod" = $9, "city" = $10, "state" = $11, "country" = $12,
      "harvestDate" = $13, "cropStrain" = $14, "sustainabilityInfo" = $15
      WHERE "companyID" = $1 AND "id" = $16;
    `;
    await pool.query(sqlText, orderArray);
    res.sendStatus(200);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// for shipping page to save the shipping information; after initial insert
router.put('/shipping', rejectUnauthenticated, async (req, res) => {
  // POST route code here
  try {
    const order = req.body;
    const orderArray = [
      order.shippedDate,
      order.carrierName,
      order.trackingNumber,
      order.companyID,
      order.orderId
    ];
    const sqlText = `
      UPDATE "orders"
      SET "shippedDate" = $1, "carrierName" = $2, "trackingNumber" = $3
      WHERE "companyID" = $4 AND "id" = $5;
    `;
    await pool.query(sqlText, orderArray);
    res.sendStatus(200);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;