const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
    product_name: {
        type: String
    },
    batch: {
        type: String
    },
    expDate: {
        type: String
    },
    price: {
        type: String
    },
    quantity: {
        type: String
    },
    type: {
        type: String
    }, 
    SGST: {
        type: String
    },
    GST: {
        type: String
    },
    hsn: {
        type: String
    }
}, {
    collection: 'Products'
})

module.exports = mongoose.model('Product', Product)