import mongoose from 'mongoose';
const MONGO_URI = 'mongodb+srv://nasa-api:Vk2Ctzt2Xkd8bHh6@nasa-cluster.rqgtwab.mongodb.net/nasa-db?retryWrites=true&w=majority';
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
});
const mongoConnect = async () => {
    await mongoose.connect(MONGO_URI);
};
export const mongoDiconnect = async () => {
    await mongoose.disconnect();
};
export default mongoConnect;
