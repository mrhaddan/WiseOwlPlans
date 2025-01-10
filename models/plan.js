const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    SKU: {
        type: String,
        required: [true, 'name cannot be blank']
    },
    Name: {
        type: String,
        required: [true, 'plan must have a name']
    },
    Regularprice: {
        type: Number,
        required: [true, 'price is required']
    },
    category: String,
    ArchitecturalStyle: {
        type: String,
        required: [true, 'must have architectural style']
    },
    Images: [String],
    SquareFeet: {
        type: Number,
        min: 0,
        max: 10000,
        required: [true, 'must have square foot']
    },
    Bedrooms: {
        type: Number,
        min: 0
    },
    Bathrooms: {
        type: Number,
        min: 0
    },
    Width: {
        type: Number,
        min: 0,
        required: [true, 'must input width']
    },
    Depth: {
        type: Number,
        min: 0,
        required: [true, 'must input depth']
    },
    Levels: {
        type: Number,
        min: 1,
        required: [true, 'must input levels']
    },
    GarageSize: {
        type: Number,
        min: 0
    },
    MasterBedroomLocation: {
        type: String,
        required: [true, 'where is the master bedroom?']
    }
})

module.exports = mongoose.model('Plan', PlanSchema);