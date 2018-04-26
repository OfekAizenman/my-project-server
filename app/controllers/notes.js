const mongoose = require('mongoose');
const Note = mongoose.model('Note');

exports.getNotes = function (req, res, next) {
    Note.find(function (err, notes) {
        if (err) return next(err);
        res.json(notes);
    })
}

exports.getNote = function (req, res, next) {
    Note.findById(req.params.id, function (err, adventure) {
        if (err) return next(err);
        res.json(adventure);
    });
}

exports.addNote = function (req, res, next) {
    const note = new Note({
        title: req.body.title,
        description: req.body.description
    });

    note.save(function (err, note) {
        if (err) return next(err);
        res.json(note);
    });
}

exports.deleteNote = function (req, res, next) {
    Note.remove({
        _id: req.params.id
    }, function (err) {
        if (err) return next(err);
        res.json('deleted');
    });
}



























// module.exports = {
//     getNotes: function (req, res) {
//         res.send('All notes')
//     }
// }

//const ObjectID = require('mongodb').ObjectID;

// (req, res) => {
//     //   db.collection('notes').find({}).toArray((err, result) => {
//     //     if (err) {
//     //       res.send({
//     //         'error': 'An error has occurred'
//     //       });
//     //     } else {
//     //       res.send(result);
//     //     }
//     //   });
//     // }

//     exports.createNote = function (db) {};
//     exports.getNote = function (db) {};
//     exports.updateNote = function (db) {};
//     exports.deleteNote = function (db) {};


//     const { error, value: query } = joi.validate(this.query, querySchema)
//     if (error) {
//       this.throw(400)
//     }

//     let tweets = yield redis.zrevrangebyscore(redis.SET.tweets, Date.now(), 0, 'LIMIT', query.offset, query.limit)
//     tweets = tweets.map((string) => {
//       let tweet
//       try {
//         tweet = JSON.parse(string)
//       } catch (ex) {
//         /* ignore */
//       }

//       return tweet
//     })

//     this.body = tweets
//   }

//   module.exports = getTweets



// module.exports = (app) => {
//     let noteManager = require('../managers/noteManager');

//     // our Routes
//     app.route('/notes')
//       .get(noteManager.getNotes)
//       .post(noteManager.createNote);

//     app.route('/notes/:noteId')
//       .get(noteManager.getNote)
//       .put(noteManager.updateNote)
//       .delete(noteManager.deleteNote);
//   }


// export function getNote(req, res) => {
//     db.collection('notes').find({}).toArray((err, result) => {
//         if (err) {
//             res.send({
//                 'error': 'An error has occurred'
//             });
//         } else {
//             res.send(result);
//         }
//     });
// }