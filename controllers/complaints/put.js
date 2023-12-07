const db = require('../../config/database');

module.exports = (req, res) => {
    let close_date_db = null
    const id = req.params.id
    const {
        ra_cod,
        ra_id,
        title,
        date_description,
        chanel,
        reason,
        description,
        id_occurrence,
        close_date,
        system_sub_reason,
        complainer_note,
        complaints_status,
        ai_classification,
        negotiate_again
    } = req.body
    if (close_date) {
        close_date_db = close_date.split('T')[0]
    }

    const {
        complainer_id,
        name,
        cpf,
        uc,
        city,
        email,
        phone,
        is_client } = req.body
    db('complaints').where({ id }).update({
        ra_cod,
        ra_id,
        title,
        date_description,
        chanel,
        reason,
        description,
        id_occurrence,
        close_date: close_date_db ? close_date_db : null,
        system_sub_reason,
        complainer_note,
        complaints_status,
        ai_classification,
        negotiate_again
    })
        .then(() => {
            db('complainers').where({ id: complainer_id }).update({
                name,
                cpf,
                uc,
                city,
                email,
                phone,
                is_client
            })
                .then(() => getComplaintsById(req, res, db))
                .catch(err => res.status(400).json({ dbError: 'db error update user' + err }))
        })
        .catch(err => res.status(400).json({ dbError: 'db error update complaint' + err }))
}