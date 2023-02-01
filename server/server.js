const express = require('express');
const app = express();
const spawn = require('child_process').spawn;

app.get('/runscript', (req, res) => {
  const script = spawn('python', ['-u', '/Users/khuzaima.saeed/my-app/server/script1.py']);

  script.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  script.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(`Script completed with code: ${code}`);
  });
});

app.listen(8000, () => {
  console.log('App listening on port 8000!');
});
