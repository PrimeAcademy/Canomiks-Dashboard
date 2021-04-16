const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');

router.post('/', (request, response) => {
    const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) {
        return response.status(500).send(error);
      };
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = await FileType.fromBuffer(buffer);
        const fileName = `bucketFolder/${Date.now().toString()}`;
        const data = await uploadFile(buffer, fileName, type);
        console.log('data is', data)
        return response.status(200).send(data);
        
      } catch (err) {
          console.log(error, 'error on post')
        return response.status(500).send(err);
      }
    });
  });

  router.get('/', function(req, res) {

    axios({
      method: 'get',
      //url: `https://api.spotify.com/v1/tracks/0sf12qNH5qcw8qpgymFOqD?si=0021e8fe8fe44ba1`,
     // url: `https://api.spotify.com/v1/browse/categories/party/playlists?offset=0&limit=1`,
      url: 'https://prime-canomiks.s3.amazonaws.com'
     
    }).then((response) => {
      res.send(response.data)
      console.log('here is the response',response.data
      )
    }).catch(err => {
      console.log('error on get', err)
      
    })
  });
module.exports = router