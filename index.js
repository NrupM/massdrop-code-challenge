const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const cors = require('cors');
const Job = require('./models/job');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/scrape');
mongoose.connection
  .once('open', function() {
    console.log('Connection has been made, now make fireworks...');
  })
  .on('error', function(error) {
    console.log('Connection error:', error);
  });

app.get('/butt', (req, res) => {
  // get url request parameter
  const urlParam = req.query.urlParam || '';

  if (urlParam === '') {
    res.status(500).send('required query parameter `URL` missing');
  }

  console.log('url parameter passed', urlParam);
  request(urlParam, (err, response, html) => {
    if (!response || response.statusCode > 299) {
      res.status(500).json({
        message: `failed to scrape url ${urlParam}`,
        error: err || {},
        response: response || ''
      });
    } else {
      console.log(err, response, html);
      const newJob = {
        url: urlParam,
        html: html
      };

      Job.create(newJob)
        .then(createdJob => {
          res.status(200).json(createdJob);
        })
        .catch(err => {
          res.status(500).json({
            message: `failed to create job ${newJob}`,
            error: err || {}
          });
        });
    }
  });
});

app.get('/getJobById', (req, res) => {
  // get job Id request parameter
  const jobId = req.query.jobId || '';

  if (jobId === '') {
    res.status(500).send('required query parameter `jobId` missing');
  }

  Job.find({ _id: jobId })
    .then(foundJob => {
      res.status(200).json(foundJob);
    })
    .catch(err => {
      res.status(500).json({
        message: `failed to find job with Id ${jobId}`,
        error: err || {}
      });
    });
});

//SERVER
app.listen(process.env.port || 3000, () =>
  console.log('http server running on localhost:3000')
);
