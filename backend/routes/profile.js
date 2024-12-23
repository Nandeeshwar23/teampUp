const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// GET /api/profile
router.put('/', async (req, res) => {
  try {
  const { userId } = req.body; // Extract userId from request body
    //console.log('Received PUT request with userId:', userId);
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const profile = await Profile.findOne({ userId});
    
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
  
  try {
    let profile = await Profile.findOne({ userId });
    
    if (profile) {
      return res.status(400).json({ message: 'Profile already exists' });
    }

    profile = new Profile({ userId, name, age, location, sport, bio });
    await profile.save();
    
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/profile/others
router.post('/others', async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from request body

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find profiles of other users
    const profiles = await Profile.find({ userId: { $ne: userId } }); // $ne excludes the userId

    if (!profiles.length) {
      return res.status(404).json({ message: 'No other profiles found' });
    }

    res.json(profiles); // Send back the profiles
  } catch (error) {
    console.error('Error fetching other profiles:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});





// PUT /api/profile/:id
// router.put('/:id', async (req, res) => {
//   const { name, age, location, sport, bio } = req.body;
  
//   try {
//     const profile = await Profile.findByIdAndUpdate(req.params.id, { name, age, location, sport, bio }, { new: true });
    
//     if (!profile) return res.status(404).json({ message: 'Profile not found' });
    
//     res.json(profile);
//   } catch (error) {
//     console.error('Error updating profile:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
//  });

module.exports = router;
