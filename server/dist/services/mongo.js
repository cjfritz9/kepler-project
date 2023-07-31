import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
const mongoConnect = async () => {
    await mongoose.connect(MONGO_URI);
};
export const mongoDisconnect = async () => {
    await mongoose.disconnect();
};
export default mongoConnect;
