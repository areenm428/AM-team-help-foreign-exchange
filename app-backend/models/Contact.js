const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  whatsappNumber: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  role: {
    type: String,
    enum: ['Designer', 'Researcher', 'Writer', 'Lead', 'Other'],
    default: 'Other'
  },
  team: {
    type: String,
    enum: ['Comics', 'Case Studies', 'Research', 'Presentation', 'General'],
    default: 'General'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);
