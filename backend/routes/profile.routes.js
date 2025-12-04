const express = require('express');
const {
    getAllProfiles,
    getProfile,
    upsertProfile,
    addWorkExperience,
    addEducation,
    addSkills,
} = require('../controllers/profile.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// Protected routes - require authentication
router.use(authenticate);

// Get all profiles (for listing/search)
router.get('/', getAllProfiles);

// Get profile by userId
router.get('/:userId', getProfile);

// Create or update profile
router.post('/:userId', upsertProfile);

// Add work experience
router.post('/:userId/experience', addWorkExperience);

// Add education
router.post('/:userId/education', addEducation);

// Add skills
router.post('/:userId/skills', addSkills);

module.exports = router;
