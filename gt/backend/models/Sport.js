const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name: { type: String, required: true },
    center: { type: mongoose.Schema.Types.ObjectId, ref: 'Center' },
});

module.exports = mongoose.model('Sport', sportSchema);
