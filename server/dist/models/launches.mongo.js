import { Schema, model } from 'mongoose';
const launchesScema = new Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    target: {
        type: String,
        required: true
    },
    customer: {
        type: [String],
        default: ['ZTM', 'NASA']
    },
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    }
});
const LaunchModel = model('Launch', launchesScema);
export default LaunchModel;
