const express = require('express');
const router = express.Router();

const UserController = require('./../controllers/UserController');
const NoteController = require('./../controllers/NoteController');
const CodeController = require('./../controllers/CodeController');

const passport = require('passport');
const path = require('path');

require('./../middleware/passport')(passport);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    status: "success",
    message: "Parcel Pending API",
    data: {
      "version_number": "v1.0.0"
    }
  })
});

// User routes
router.post('/users', UserController.create); // C
router.get('/users', passport.authenticate('jwt', { session: false }), UserController.get); // R
router.put('/users', passport.authenticate('jwt', { session: false }), UserController.update); // U
router.delete('/users', passport.authenticate('jwt', { session: false }), UserController.remove); // D
router.post('/users/signin', UserController.login);


// Notes routes
router.post('/notes', passport.authenticate('jwt', { session: false }), NoteController.create); // C
router.get('/notes', passport.authenticate('jwt', { session: false }), NoteController.getAll); // R
router.get('/notes/:note_id', passport.authenticate('jwt', { session: false }), NoteController.get); // R
//router.put('/notes/:note_id', passport.authenticate('jwt', { session: false }), NoteController.update); // U
router.delete('/notes/:note_id', passport.authenticate('jwt', { session: false }), NoteController.remove); // D


// Code routes
router.get('/codes/colors', passport.authenticate('jwt', { session: false }), CodeController.getAllColors);


module.exports = router;