const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  component: {
    type: String,
    enum: ['Comics', 'Case Studies', 'Research', 'Presentation'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Team', teamSchema);
