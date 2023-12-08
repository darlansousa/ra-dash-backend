const db = require('../../config/database');

module.exports = (size, callback) => {
    db.select('ra_id', 'title', 'description')
    .from('complaints')
    .whereNull('ai_classification')
    .limit(size)
        .then(items => {
            if (items.length) {
                return callback(items)
            }
            return callback([])
        })
        .catch(err => console.log(err))
}