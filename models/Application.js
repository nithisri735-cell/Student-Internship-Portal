
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    rollNumber: {
        type: String,
        required: true,
        trim: true
    },

    internship: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model(
    'Application',
    ApplicationSchema
);
