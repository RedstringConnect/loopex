const User = require('../models/User.model');
const Profile = require('../models/Profile.model');

// Get user profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found',
            });
        }

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile',
            error: error.message,
        });
    }
};

// Create or update profile
const upsertProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const {
            name,
            location,
            socials,
            workExperience,
            education,
            skills,
            additionalSkills,
            languages,
            stats,
        } = req.body;

        if (!userId || !name) {
            return res.status(400).json({
                success: false,
                message: 'User ID and name are required',
            });
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        let profile = await Profile.findOne({ userId });

        if (profile) {
            // Update existing profile
            profile.name = name;
            profile.location = location || profile.location;
            profile.socials = socials || profile.socials;
            profile.workExperience = workExperience || profile.workExperience;
            profile.education = education || profile.education;
            profile.skills = skills || profile.skills;
            profile.additionalSkills = additionalSkills || profile.additionalSkills;
            profile.languages = languages || profile.languages;
            profile.stats = stats || profile.stats;
            await profile.save();
        } else {
            // Create new profile
            profile = new Profile({
                userId,
                name,
                location,
                socials,
                workExperience,
                education,
                skills,
                additionalSkills,
                languages,
                stats,
            });
            await profile.save();
        }

        res.status(200).json({
            success: true,
            message: 'Profile saved successfully',
            data: profile,
        });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save profile',
            error: error.message,
        });
    }
};

// Add work experience
const addWorkExperience = async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, company, startDate, endDate, description, location, isPromoted } = req.body;

        if (!userId || !title || !company || !startDate) {
            return res.status(400).json({
                success: false,
                message: 'User ID, title, company, and startDate are required',
            });
        }

        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Create profile first.',
            });
        }

        profile.workExperience.push({
            title,
            company,
            startDate,
            endDate,
            description,
            location,
            isPromoted: isPromoted || false,
        });

        await profile.save();

        res.status(201).json({
            success: true,
            message: 'Work experience added successfully',
            data: profile,
        });
    } catch (error) {
        console.error('Error adding work experience:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add work experience',
            error: error.message,
        });
    }
};

// Add education
const addEducation = async (req, res) => {
    try {
        const { userId } = req.params;
        const { institute, degree, fieldOfStudy, startDate, endDate, description } = req.body;

        if (!userId || !institute) {
            return res.status(400).json({
                success: false,
                message: 'User ID and institute are required',
            });
        }

        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Create profile first.',
            });
        }

        profile.education.push({
            institute,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description,
        });

        await profile.save();

        res.status(201).json({
            success: true,
            message: 'Education added successfully',
            data: profile,
        });
    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add education',
            error: error.message,
        });
    }
};

// Add skills
const addSkills = async (req, res) => {
    try {
        const { userId } = req.params;
        const { category, skills } = req.body;

        if (!userId || !category || !skills || !Array.isArray(skills)) {
            return res.status(400).json({
                success: false,
                message: 'User ID, category, and skills array are required',
            });
        }

        let profile = await Profile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found. Create profile first.',
            });
        }

        profile.skills.push({ category, skills });
        await profile.save();

        res.status(201).json({
            success: true,
            message: 'Skills added successfully',
            data: profile,
        });
    } catch (error) {
        console.error('Error adding skills:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add skills',
            error: error.message,
        });
    }
};

module.exports = {
    getProfile,
    upsertProfile,
    addWorkExperience,
    addEducation,
    addSkills,
};
