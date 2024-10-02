const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Allow CORS for local development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

// Setup storage for the frames
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'frames/');  // Store frames in 'frames' folder
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Create 'frames' folder if it doesn't exist
if (!fs.existsSync('frames')) {
  fs.mkdirSync('frames');
}

// Endpoint to receive frames
app.post('/upload-frame', upload.single('frame'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No frame uploaded.');
  }
  console.log('Frame received:', req.file);
  res.json({ message: 'Frame uploaded successfully', file: req.file });
});

// Endpoint to view uploaded frames
app.get('/view-frames', (req, res) => {
  fs.readdir('frames', (err, files) => {
    if (err) {
      return res.status(500).send('Unable to read frames directory.');
    }
    res.json(files);
  });
});

// Serve static files from the 'frames' folder
app.use('/frames', express.static(path.join(__dirname, 'frames')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
