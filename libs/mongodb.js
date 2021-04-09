const { MongoClient } = require('mongodb');
const { URL, OPTIONS } = require('../configs/mongodb.js');

module.exports = async (poolSize) => {
    try {
        const options = { ...OPTIONS, poolSize: poolSize || 2 };
        const client = await MongoClient.connect(URL, options);
        const db_ = client.db('database')
        module.exports.db_ = db_
        module.exports.db_user = db_.collection('user');

        return client
    } catch (err) {
        throw err
    }
};