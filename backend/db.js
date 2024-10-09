const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = async () => {
    await mongoose.connect(MONGO_URI)
    console.log('Connected To Database!')
};

module.exports = connectToMongo;