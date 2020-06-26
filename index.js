const express = require('express')
const app = express()
const port = 3000

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
  res.send(students[actualIndex])
});

app.get('/grades/:studentId', (req, res) => {
  const studentId = req.params.studentId;
  const actualIndex = studentId - 1; // account for 0-indexing
  res.send(grades[actualIndex])
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
