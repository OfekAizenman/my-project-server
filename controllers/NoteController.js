const Note = require('./../models').Note;

const create = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const note_info = req.body;
  if (!note_info.title && !note_info.description) {
    return ReE(res, 'Please enter a title or description.');
  } else {
    let err, note;

    [err, note] = await to(Note.create(note_info));

    if (err) return ReE(res, err, 422);
    return ReS(res, {
      message: 'Successfully created new note.',
      note: note.toWeb(),
    }, 201);
  }
}
module.exports.create = create;

const getAll = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  let err, notes;
  [err, notes] = await to(Note.find());

  if (err) return ReE(res, err);

  let notes_json = []
  for (let i in notes){
      let note = notes[i];
      notes_json.push(note.toWeb());
  }

  return ReS(res, {
    notes: notes_json,
  });
}
module.exports.getAll = getAll;

const get = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  const note_id = req.params.note_id;

  if (!note_id) {
    return ReE(res, 'Please enter a valid note id.');
  } else {
    let err, note;

    [err, note] = await to(Note.findById(note_id));

    if (err) return ReE(res, err);
    return ReS(res, {
      note: note.toWeb(),
    });
  }
}
module.exports.get = get;

const remove = async function (req, res) {
  const note_id = req.params.note_id;

  if (!note_id) {
    return ReE(res, 'Please enter a valid note id.');
  } else {
    let err, note;

    [err, note] = await to(Note.remove({_id: note_id}));

    if (err) return ReE(res, 'error occurred trying to delete note');
    return ReS(res, {
      message: 'Deleted User'
    }, 204);
  }
}
module.exports.remove = remove;