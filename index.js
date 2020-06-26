const express = require('express');
const util = require('util');

const app = express();
const port = 3000;

app.use(express.json());

let students = [
  {
    id: 1,
    name: "Brandon"
  },
  {
    id: 2,
    name: "Jeff"
  }
];

let grades = [
  {
    id: 1,
    math: "A+",
    science: "A-",
    "language-arts": "A"
  },
  {
    id: 2,
    math: "A-",
    science: "A",
    "language-arts": "A-"
  }
];


app.get('/students/', (req, res) => {
  res.send(students)
});

app.get('/students/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const actualIndex = studentId - 1; // account for 0-indexing
  res.send(students[actualIndex]);
});

app.get('/grades/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const actualIndex = studentId - 1; // account for 0-indexing
  res.send(grades[actualIndex]);
});

// to test:
// curl -X POST --data '{"studentId":"1","grades":[{"chemistry":"A"}]}' --header "Content-Type: application/json" localhost:3000/grades/
app.post('/grades/', (req, res) => {
  valid_flag = false;
  if (('studentId' in req.body) && ('grades' in req.body)) {
    valid_flag = true;
  }
  if (valid_flag == true) {
    res.status(202).send("Accepted");
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
    res.status(202).send("Accepted");
  } else {
    res.status(406).send("Not Acceptable");
  }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
