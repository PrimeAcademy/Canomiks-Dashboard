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
    const queryText = `SELECT * FROM "orders" WHERE orders."companyID" = $1;`;
    const dbRes = await pool.query(queryText, [req.user.companyID]);
    res.send(dbRes.rows);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
router.put('/:id',  (req, res) => {
  const userId = req.user.id;
  const shipping = req.body;

  const sqlQuery = `UPDATE "orders" 
  SET "shippedDate" = $3, "carrierName" = $4, "trackingNumber" = $5
  WHERE "id" = $1 
  RETURNING "id";`;
  const sqlParams = [
    shipping.id,
    userId,
    shipping.shippedDate,
    shipping.carrierName,
    shipping.trackingNumber,
    
  ];

  pool
    .query(sqlQuery, sqlParams)
    .then((dbRes) => {
      
      const shippingID = dbRes.rows[0].id;
      console.log('shippingID is', shippingID)
    }).catch((err)=>{
      console.log('err on put', err)
    })
  })
/**
 * POST route template
 */
router.post('/newOrder', rejectUnauthenticated, async (req, res) => {
  // POST route code here
  try {
    const order = req.body;
    const orderArray = [
      order.companyID, order.ingredientName, order.ingredientAmount, 
      order.ingredientUnit, order.format, order.purity, order.dateManufactured, 
      order.lotNumber, order.extractionMethod, order.city, order.state, order.country, 
      order.harvestDate, order.cropStrain, order.sustainabilityInfo, order.shippedDate, 
      order.carrierName, order.trackingNumber
    ];
    const sqlText = `
    INSERT INTO "orders"
    ("companyID", "ingredientName", "ingredientAmount", 
      "ingredientUnit", "format", "purity", "dateManufactured", 
      "lotNumber", "extractionMethod", "city", "state", "country", 
      "harvestDate", "cropStrain", "sustainabilityInfo", "shippedDate", "carrierName", "trackingNumber")
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);
    `;
    await pool.query(sqlText, orderArray);
    res.sendStatus(200);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

router.post('/shipping', rejectUnauthenticated, async (req, res) => {
  try{
    const shipping = req.body;
    // console.log(shipping, "req.body")
    
    const shippingArray = [shipping.shippedDate, shipping.carrierName, shipping.trackingNumber];
    console.log(shippingArray, "array")
    const sqlText =  `
    INSERT INTO "orders"
      ("shippedDate", "carrierName", "trackingNumber")
    VALUES
      ($1, $2, $3);`;
    
    await pool.query(sqlText, shippingArray);
    res.sendStatus(200);
  }catch(err){
    console.error(err.message);
    res.sendStatus(500);
  }
})

module.exports = router;
