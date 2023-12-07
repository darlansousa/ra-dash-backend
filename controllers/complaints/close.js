const db = require('../../config/database');
const path  = '../../controllers/complaints/';

const get = require(`${path}/get`)

module.exports = (req, res) => {
    const id = req.params.id
    const { id_occurrence, close_date, system_sub_reason, complainer_note, negotiate_again } = req.body
    const close_date_db = close_date.split('T')[0]

    db('complaints').update({ id_occurrence, close_date: close_date_db, system_sub_reason, complainer_note, negotiate_again, complaints_status: 'closed' })
        .where({ id })
        .then(() => {
            get(req, res)
        })
        .catch(err => res.status(400).json({ dbError: 'db error' + err }))
}