const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
    name: {
        type: String
    },
    type: {
        type: String
    }
}, {
    collection: 'Products'
})

module.exports = mongoose.model('Product', Product)