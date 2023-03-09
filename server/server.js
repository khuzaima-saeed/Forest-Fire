const express = require("express");
const app = express();
const port = 8000;
var cors = require('cors')
app.use(cors())
const fs = require('fs');
const path = require("path");

app.use(express.json())

const { spawn } = require('child_process');
app.get("/readFile", (req, res) => {
  fs.readFile("../public/sample.txt", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send({data});
    }
  });
});

app.get("/readgeojson", (req, res) => {
  fs.readFile("../firefront/examples/aullene/3600-firespread.geojson", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send(data);
    }
  });
});

app.get("/readgeojson2", (req, res) => {
  fs.readFile("../firefront/examples/aullene/7200-firespread.geojson", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send(data);
    }
  });
});

app.get("/readgeojson3", (req, res) => {
  fs.readFile("../firefront/examples/aullene/10800-firespread.geojson", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send(data);
    }
  });
});

app.get("/readgeojson4", (req, res) => {
  fs.readFile("../firefront/examples/aullene/14400-firespread.geojson", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send(data);
    }
  });
});

app.get("/readgeojson5", (req, res) => {
  fs.readFile("../firefront/examples/aullene/18000-firespread.geojson", "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ error: "An error occurred while reading the file." });
    } else {
      res.send(data);
    }
  });
});



app.post('/runforefire', (req, res) => {
  const {lat, lng} = req.body
  const script = spawn('python3', ['../firefront/py3_tools/coord_to_ff.py',
  '--lat=' + lat,
  '--lon=' + lng]);

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.sendStatus(200);
  });
});

app.get('/runscript', (req, res) => {
  const script = spawn('python3', ['script1.py']);

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
