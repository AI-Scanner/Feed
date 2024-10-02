const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Set up storage for frame images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frames/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Create frames folder if it doesn't exist
if (!fs.existsSync('frames')) {
    fs.mkdirSync('frames');
}

// Endpoint to receive individual frames from the webcam
app.post('/upload-frame', upload.single('frame'), (req, res) => {
    if (!req.file) {
        console.error('No frame received.');
        return res.status(400).send('No frame received.');
    }

    console.log('Frame received:', req.file);

    // You can process the frame here or just store it
    res.json({ message: 'Frame received successfully', file: req.file });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
