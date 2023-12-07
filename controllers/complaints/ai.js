const db = require('../../config/database');

module.exports = (req, res) => {
    db.raw(`
    SELECT 
     ai_classification classification,
     count(*) AS count
     FROM complaints 
    WHERE ai_classification IS NOT NULL 
    GROUP BY ai_classification
    `)
        .then(items => {
            res.json(items[0])
        })
        .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}