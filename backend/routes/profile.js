const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// GET /api/profile
router.put('/', async (req, res) => {
  try {
    // Check if req.user is defined; if not, return an error response
    console.log(req.headers,req.body)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('User ID:', req.user.id); // Log the user ID
    const profile = await Profile.findOne({ userId: req.user.id });
    console.log(profile);
    console.log("hii");
    
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/profile
router.post('/', async (req, res) => {
  const { userId, name, age, location, sport, bio } = req.body;
  console.log(req.body);
  
  try {
    const profile = new Profile({ userId, name, age, location, sport, bio });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile/:id
router.put('/:id', async (req, res) => {
  const { name, age, location, sport, bio } = req.body;
  
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, { name, age, location, sport, bio }, { new: true });
    
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
