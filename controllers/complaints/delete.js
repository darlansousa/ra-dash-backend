const db = require('../../config/database');

module.exports = (req, res) => {
    const id = req.params.id
    db('complaints').where({ id }).del()
        .then(() => {
            res.json({ delete: 'true' })
        })
        .catch(err => res.status(400).json({ dbError: 'db error' }))
}