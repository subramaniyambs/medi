const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var presentations_schema = {
    product_name: {
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
    Qty: {
        type: String
    }
    // etc
}

// Define collection and schema
let Purchased = new Schema({
    SGST: {
        type: String
    },
    CGST: {
        type: String
    },
    TotalAmt: {
        type: Number
    },
    Data: [presentations_schema],

}, {
    collection: 'Purchased'
})

module.exports = mongoose.model('Purchased', Purchased)