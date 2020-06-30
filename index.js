const express = require('express');
const util = require('util');

const app = express();
const port = process.env.DEFAULT_APP_PORT;
const db = require('./db');

app.use(express.json());

// to test:
// curl "localhost:3000/students/?search=Brandon"
app.get('/students/', (req, res) => {
  let queryString = 'SELECT * FROM students';
  if (req.query.search) {
    let desiredName = req.query.search;
    queryString = queryString + ` WHERE name = '${desiredName}';`;
  };
  db.query(queryString, (err, results) => {
    if(err) {
      //console.log(err.stack);
    } else {
      res.send(results.rows);
    }
  });
});

app.get('/students/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  let queryString = `SELECT * FROM students WHERE id = ${studentId}`;

  db.query(queryString, (err, results) => {
    if(err) {
      //console.log(err.stack);
    } else {
      res.send(results.rows);
    }
  });
});

app.get('/grades/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  let queryString = `SELECT * FROM grades WHERE student_id = ${studentId}`;

  db.query(queryString, (err, results) => {
    if(err) {
      //console.log(err.stack);
    } else {
      res.send(results.rows);
    }
  });
});

// to test:
// curl -X POST --data '{"studentId":"1","grades":[{"chemistry":"A"}]}' --header "Content-Type: application/json" localhost:3000/grades/
app.post('/grades/', (req, res) => {
  valid_flag = false;
  if (('studentId' in req.body) && ('grades' in req.body) && (req.body['grades'].length >= 1)) {
    valid_flag = true;
  }

  if (valid_flag == true) {
    let studentId = req.body['studentId'];
    let attributesArray = [];
    for (gradeIndex in req.body['grades']) {
      if ('math' in req.body['grades'][gradeIndex]) {
        attributesArray.push("math = '" + req.body['grades'][gradeIndex]['math'] + "'");
      }
      if ('science' in req.body['grades'][gradeIndex]) {
        attributesArray.push("science = '" + req.body['grades'][gradeIndex]['science'] + "'");
      }
      if ('language-arts' in req.body['grades'][gradeIndex]) {
        attributesArray.push("language_arts = '" + req.body['grades'][gradeIndex]['language_arts'] + "'");
      }
      if ('chemistry' in req.body['grades'][gradeIndex]) {
        attributesArray.push("chemistry = '" + req.body['grades'][gradeIndex]['chemistry'] + "'");
      }
    }
    let attributesString = attributesArray.join(',');
    let queryString = `UPDATE grades SET ${attributesString} WHERE student_id = ${studentId};`;

    db.query(queryString, (err, results) => {
      if(err) {
        //console.log(err.stack);
      } else {
        res.status(202).send("Accepted");
      }
    });
  } else {
    res.status(406).send("Not Acceptable");
  }
});

// to test:
// curl -X POST --data '{"username":"user","email":"email"}' --header "Content-Type: application/json" localhost:3000/register/
app.post('/register/', (req, res) => {
  valid_flag = false;
  if (('username' in req.body) && ('email' in req.body)) {
    valid_flag = true;
  }
  if (valid_flag == true) {
    const username = req.body['username'];
    const email = req.body['email'];
    let queryString = `INSERT INTO students(username, email) VALUES ('${username}', '${email}');`;

    db.query(queryString, (err, results) => {
      if(err) {
        //console.log(err.stack);
      } else {
        res.status(202).send("Accepted");
      }
    });
  } else {
    res.status(406).send("Not Acceptable");
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
