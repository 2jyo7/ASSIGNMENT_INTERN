const express = require('express');
const { verifyToken, requireRole } = require('../utils/auth');
const Bid = require('../models/bid');
const User = require('../models/user');

const router = express.Router();

// Create Bid
router.post('/', verifyToken, async (req, res) => {
  const { amount, itemId } = req.body;
  const userId = req.userId;

  try {
    const bid = await Bid.create({ amount, itemId, userId });
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Bids
router.get('/', verifyToken, async (req, res) => {
  try {
    const bids = await Bid.findAll({ include: User });
    res.status(200).json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Bid by ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await Bid.findByPk(id, { include: User });
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }
    res.status(200).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Bid
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  const { id } = req.params;

  try {
    const bid = await Bid.findByPk(id);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }
    await bid.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
