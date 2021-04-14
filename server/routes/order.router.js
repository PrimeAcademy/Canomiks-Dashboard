const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('req.user.id:', req.user.id);
  console.log('in get');
  const queryText = `SELECT FROM "orders" WHERE id = $1`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('error on get ', err);
      res.sendStatus(500);
    });
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
