const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  id: { type: String },
  palette: { type: String },
  color: { type: String },
});

ColorSchema.methods.toWeb = function () {
  return this.toJSON();
};

let Color = module.exports = mongoose.model('Color', ColorSchema);