const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        required: true
    },
    time : {
        type: String,
        required: true
    },
    movie : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    FrontticketPrice : {
        type: Number,
        required: true
    },

    BackticketPrice : {
        type: Number,
        required: true
    },

    totalFrontSeats : {
        type: Number,
        required: true
    },

    totalBackSeats : {
        type: Number,
        required: true
    },

    bookedSeats : {
        type: Array,
        default: []
    },

    bookedSeatsB : {
        type: Array,
        default: []
    },

    theatre : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'theatres',
        required: true
    },
} , { timestamps: true });

const Show = mongoose.model('shows', showSchema);

module.exports = Show;