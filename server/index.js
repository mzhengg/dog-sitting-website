require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => res.send('Dog sitting server running'));

app.post('/api/bookings', upload.array('dogImages'), async (req, res) => {
  try {
    const { name, email, phone, selectedDates, dateDetails, additionalNotes } = req.body;
    const images = (req.files || []).map(f => path.join('uploads', f.filename));

    const booking = new Booking({
      name,
      email,
      phone,
      selectedDates: selectedDates ? JSON.parse(selectedDates) : [],
      dateDetails: dateDetails ? JSON.parse(dateDetails) : {},
      additionalNotes: additionalNotes || '',
      dogImages: images
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dogsitting', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err.message);
  process.exit(1);
});
