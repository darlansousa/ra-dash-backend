const insertExports = (req, res, db) => {
    const datetime = new Date().toJSON().slice(0, 19).replace('T', ' ')

    const items = req.body
    let itemsToAdd = items.map(item => {
        return {
            ra_id: item['ra_id'],
            export_date: datetime,
        };
    });
    db('complaints_export_process').insert(itemsToAdd)
        .then(() => {
            res.status(201).end();
        })
        .catch(err => res.status(400).json({ dbError: 'db error' + err }))
}

module.exports = {
    insertExports
}