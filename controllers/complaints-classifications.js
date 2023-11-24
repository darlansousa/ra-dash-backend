const getComplaintsClassifications = (req, res, db) => {
  db.select('*').from('complaints_classifications')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}

module.exports = {
  getComplaintsClassifications
}