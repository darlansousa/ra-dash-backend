const db = require('../../config/database');

module.exports = (ra_id, classification, callback) => {
    db('complaints').where({ ra_id })
        .update({ 'ai_classification': classification })
        .then(() => {
            callback(true)
        })
        .catch(err => console.log(err))
}