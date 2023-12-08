const db = require('../../config/database');

module.exports = (req, res) => {
    const { status, sys_reason, ai_classification } = req.query
    let _id = req.params.id;
    db.select('*').from('complaints')
        .innerJoin('complainers', 'complainers.id', 'complaints.complainer_id')
        .where((qb) => {
            if (_id) {
                qb.andWhere('complaints.id', '=', _id);
            }
            if (status) {
                qb.andWhere('complaints_status', '=', status);
            }

            if (sys_reason) {
                qb.andWhere('system_sub_reason', '=', sys_reason);
            }

            if (ai_classification) {
                qb.andWhere('ai_classification', '=', ai_classification);
            }
        })
        .then(items => {
            if(_id) {
                res.json(items[0])
                return
            }

            if (items.length) {
                res.json(items)
            } else {
                res.json([])
            }
        })
        .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}