const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up storage for video files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Create uploads folder if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Endpoint to receive video from local machine
app.post('/upload-video', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No video file uploaded.');
  }

  console.log('Video file received:', req.file);

  // You can process the video here or just store it
  res.json({ message: 'Video uploaded successfully', file: req.file });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
