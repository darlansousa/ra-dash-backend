const db = require('../../config/database');

var fs = require('fs');
var path = process.cwd();
const query = fs.readFileSync(path + "/report/query.sql");


module.exports = (req, res) => {
    db.raw(query.toString())
        .then(items => {
            if (items.length) {
                res.json(items[0])
            } else {
                res.json([])
            }
        })
        .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}