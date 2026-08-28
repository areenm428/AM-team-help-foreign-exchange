const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new contact
router.post('/', async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    whatsappNumber: req.body.whatsappNumber,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    team: req.body.team,
    status: req.body.status,
    notes: req.body.notes
  });

  try {
    const newContact = await contact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE contact
router.put('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    if (req.body.name) contact.name = req.body.name;
    if (req.body.email) contact.email = req.body.email;
    if (req.body.whatsappNumber) contact.whatsappNumber = req.body.whatsappNumber;
    if (req.body.phoneNumber) contact.phoneNumber = req.body.phoneNumber;
    if (req.body.role) contact.role = req.body.role;
    if (req.body.team) contact.team = req.body.team;
    if (req.body.status) contact.status = req.body.status;
    if (req.body.notes) contact.notes = req.body.notes;

    contact.updatedAt = Date.now();
    const updatedContact = await contact.save();
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    await Contact.deleteOne({ _id: req.params.id });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET contacts by team
router.get('/team/:team', async (req, res) => {
  try {
    const contacts = await Contact.find({ team: req.params.team });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
