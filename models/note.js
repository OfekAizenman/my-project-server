const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    archive: { type: Boolean },
});

NoteSchema.methods.toWeb = function () {
  let json = this.toJSON();
  json.id = this._id; //this is for the front end
  return json;
};

let Note = module.exports = mongoose.model('Note', NoteSchema);