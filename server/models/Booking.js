++ const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  selectedDates: { type: [String], default: [] },
  dateDetails: { type: mongoose.Schema.Types.Mixed, default: {} },
  additionalNotes: { type: String, default: '' },
  dogImages: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
