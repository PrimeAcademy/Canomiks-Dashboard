const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  // GET route code here
  const queryText = `
  SELECT * FROM "orders" 
  WHERE orders."companyID" = $1;
  `;
  console.log('🤙 ', req.user);

  pool
    .query(queryText, [req.user.companyID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error on get ', err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/newOrder', rejectUnauthenticated, (req, res) => {
  // POST route code here
  const order = req.body;
  const orderArray = [
    order.companyID, order.ingredientName, order.ingredientAmount, order.ingredientUnit, order.format, order.purity, order.dateManufactured, order.lotNumber, order.extractionMethod, order.city, order.state, order.country, order.harvestDate, order.cropStrain, order.sustainabilityInfo, order.shippedDate, order.carrierName, order.trackingNumber
  ];
  const sqlText = `
  INSERT INTO "orders"
  ("companyID", "ingredientName", "ingredientAmount", "ingredientUnit", "format", "purity", "dateManufactured", "lotNumber", "extractionMethod", "city", "state", "country", "harvestDate", "cropStrain", "sustainabilityInfo", "shippedDate", "carrierName", "trackingNumber")
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);
  `;

  pool.query(sqlText, orderArray).then(dbRes => {
    console.log('we have a valid entry');
    res.sendStatus(200);
  }).catch(err => {
    console.log('💥 something went wrong in the post', err);
    res.sendStatus(500);
  })
});

module.exports = router;
