const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  archive: { type: Boolean },
  color_id: { type: String },
}, {
  toJSON: {virtuals: true},
});

NoteSchema.virtual('color', {
  ref: 'Color',
  localField: 'color_id',
  foreignField: 'id',
  justOne: true,
});

NoteSchema.pre('find', function() {
  this.populate('color');
});

NoteSchema.methods.toWeb = function () {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let Note = module.exports = mongoose.model('Note', NoteSchema);