const router = require('express').Router();
const store = require("../db/store")

router.get('/notes', (req, res) =>
  store.getNotes().then((gottenNotes) => {
    return res.json(gottenNotes)
  }).catch((err) => {
    return res.status(500).json(err)
  })
);

router.post('/notes', (req, res) => {
    store.writeNotes(req.body).then((userNote) => {
        return res.json(userNote)
    }).catch((err) => {
        return res.status(500).json(err)
      })
})

module.exports = router;