const db = require('../../config/database');

module.exports = (req, res) => {

    var all = db.from('complaints')
        .count('*')
        .as('all');

    var pending = db.from('complaints')
        .count('*').where({ 'complaints_status': 'pending' })
        .as('pending');

    var closed = db.from('complaints')
        .count('*').where({ 'complaints_status': 'closed' })
        .as('closed');

    var ai_review = db.from('complaints')
        .count('*').whereNot({ 'ai_classification': null })
        .as('ai_review');

    var pending_process = db.from('complaints_process')
        .count('*').where({ 'status': 'pending' })
        .as('pending_process');

    db.select(all, closed, pending, ai_review, pending_process).from('complaints').limit(1)
        .then(items => {
            res.json(items[0])
        })
        .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}