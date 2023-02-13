const express = require("express");
const app = express();
const port = 8000;
var cors = require('cors')
app.use(cors())
const fs = require('fs');
const path = require("path");

const { spawn } = require('child_process');
app.get("/readFile", (req, res) => {
  fs.readFile("C:/Users/khuzaima.saeed/Downloads/Forest-Fire/public/sample.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send({data});
    }
  });
});

app.get('/runscript', (req, res) => {
  const script = spawn('python', ['script1.py']);

  script.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.sendStatus(200);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
