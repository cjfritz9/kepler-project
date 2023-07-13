import { Schema, model } from 'mongoose';
const planetsScema = new Schema({
    kepler_name: {
        type: String,
        required: true
    }
});
const PlanetsModel = model('Planets', planetsScema);
export default PlanetsModel;
