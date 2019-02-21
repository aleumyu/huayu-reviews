var express = require('express');
var router = express.Router();
var db = require("./helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testAPI', function(req, res, next) {
  res.send('index');
});

router.get('/api/v1/schools', (req, res, next) => {
  db('SELECT * FROM schools ORDER BY id ASC;')
    .then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      console.log('results: ' + JSON.stringify(results.data));
      res.send(results.data);
    })
});

router.get('/api/v1/schools/:id', (req, res, next) => {
  db('SELECT * FROM schools WHERE schools.id =' + `${req.params.id}`)
    .then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      console.log('results: ' + JSON.stringify(results.data));
      res.send(results.data);
    })
});

router.get('/api/v1/schools/:id/reviews', (req, res, next) => {
  db('SELECT * FROM reviews WHERE school_id =' +`${req.params.id}`)
    .then(results => {
      if (results.error) {
        res.status(500).send(results.error);
      }
      console.log('results: ' + JSON.stringify(results.data));
      res.send(results.data);
    })
});

router.post('/api/v1/schools/reviews', (req, res, next) => {
  db(`INSERT INTO reviews (user_id, school_id, title, start_date, 
    end_date, likes, dislikes, city_impression, general_review) VALUES (${req.body.user_id}, ${req.body.school_id}, '${req.body.title}', '${req.body.start_date}', '${req.body.end_date}', '${req.body.likes}', '${req.body.dislikes}', '${req.body.city_impression}', '${req.body.general_review}')`)
  .then(results => {
    if (results.error) {
      res.status(500).send(results.error);
    }
    console.log("results are", results.data);
    res.send("Successfully created");
  }); 
});  

module.exports = router;
