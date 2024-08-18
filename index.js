const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors=require("cors")



app.use(cors({origin:process.env.CORS_ORIGIN,credentials:true}));
// Middleware to parse JSON bodies
app.use(express.json());

// Route to create and write to a file
app.post('/search', (req, res) => {
  const filename = 'locationFile';
  const { data: content } = req.body;

  if (!filename || !content) {
    return res.status(400).json({ error: 'Filename and content are required' });
  }

  const filePath = path.join(__dirname, filename);

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error writing to file' });
    }

    res.status(200).json({ message: 'File created successfully' });
  });
});
// Route to create and write to a file
app.get('/download', (req, res) => {
  const filename = 'locationFile';

  const filePath = path.join(__dirname, filename);


  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    // Send file as a download
    res.download(filePath, filename, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error downloading file' });
      }
    });
  });



});
const port=process.env.port||3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
