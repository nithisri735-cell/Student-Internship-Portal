
const express = require('express');
const router = express.Router();

const Application = require('../models/Application');


// ==================== AVAILABLE INTERNSHIPS ====================

const internships = [
    {
        id: 1,
        title: 'Web Development Intern',
        company: 'Tech Solutions',
        duration: '2 Months',
        description: 'Learn HTML, CSS, JavaScript and React.'
    },
    {
        id: 2,
        title: 'Cybersecurity Intern',
        company: 'Secure Systems',
        duration: '3 Months',
        description: 'Learn security testing and threat analysis.'
    },
    {
        id: 3,
        title: 'Data Science Intern',
        company: 'DataWorks',
        duration: '2 Months',
        description: 'Work with Python and data analysis.'
    }
];


// ==================== GET ALL INTERNSHIPS ====================

router.get('/internships', (req, res) => {
    res.json(internships);
});


// ==================== GET INTERNSHIP DETAILS ====================

router.get('/internships/:id', (req, res) => {
    const internship = internships.find(
        item => item.id === Number(req.params.id)
    );

    if (!internship) {
        return res.status(404).json({
            message: 'Internship not found'
        });
    }

    res.json(internship);
});


// ==================== SUBMIT APPLICATION ====================

router.post('/applications', async (req, res) => {
    try {
        const { name, email, rollNumber, internship } = req.body;

        if (!name || !email || !rollNumber || !internship) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                message: 'Enter a valid email address'
            });
        }

        const application = new Application({
            name,
            email,
            rollNumber,
            internship
        });

        const savedApplication = await application.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application: savedApplication
        });

    } catch (error) {
        console.error('Application error:', error);

        res.status(500).json({
            message: 'Failed to submit application'
        });
    }
});


// ==================== GET ALL APPLICATIONS ====================

router.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find();

        res.json(applications);

    } catch (error) {
        console.error('Fetch error:', error);

        res.status(500).json({
            message: 'Failed to retrieve applications'
        });
    }
});


module.exports = router;
