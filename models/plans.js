const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    SKU: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    name: {
        type: String,
        required: [true, 'plan must have a name']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    category: String,
    archStyle: {
        type: String,
        required: [true, 'must have architectural style']
    },
    Images: [String],
    sf: {
        type: Number,
        min: 0,
        max: 10000,
        required: [true, 'must have square foot']
    },
    bed: {
        type: Number,
        min: 0
    },
    bath: {
        type: Number,
        min: 0
    },
    width: {
        type: Number,
        min: 0,
        required: [true, 'must input width']
    },
    depth: {
        type: Number,
        min: 0,
        required: [true, 'must input depth']
    },
    levels: {
        type: Number,
        min: 1,
        required: [true, 'must input levels']
    },
    garage: {
        type: Number,
        min: 0
    }
})

module.exports = mongoose.model('Plan', PlanSchema);