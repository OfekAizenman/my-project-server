const notes = require('../controllers/notes');

module.exports = (app) => {
    // note routes    
    app.get('/notes', notes.getNotes);
    app.get('/notes/:id', notes.getNote);
    app.post('/notes', notes.addNote);
    app.delete('/notes/:id', notes.deleteNote);
}