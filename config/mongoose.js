const mongoose = require('mongoose');
const env = require('./env')
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
    console.log('it is connected to database');
}
