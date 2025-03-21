import mongoose from 'mongoose';
mongoose.set('strictQuery', true);

const mongo_uri = process.env.MONGO_URI;

const db_connector = async () => {
    await mongoose.connect(mongo_uri);
    console.log('Connected to MongoDB');
}

export default db_connector;