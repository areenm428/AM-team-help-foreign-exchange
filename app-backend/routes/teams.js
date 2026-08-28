const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Contact = require('../models/Contact');

// GET all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('leader')
      .populate('members')
      .sort({ createdAt: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single team
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader')
      .populate('members');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new team
router.post('/', async (req, res) => {
  const team = new Team({
    name: req.body.name,
    description: req.body.description,
    leader: req.body.leader,
    members: req.body.members,
    component: req.body.component
  });

  try {
    const newTeam = await team.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE team
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    if (req.body.name) team.name = req.body.name;
    if (req.body.description) team.description = req.body.description;
    if (req.body.leader) team.leader = req.body.leader;
    if (req.body.members) team.members = req.body.members;
    if (req.body.component) team.component = req.body.component;

    const updatedTeam = await team.save();
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });

    await Team.deleteOne({ _id: req.params.id });
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
