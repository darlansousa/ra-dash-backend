const db = require('../../config/database');

var fs = require('fs');
var path = process.cwd();
const big_numbers = fs.readFileSync(path + "/controllers/dashboards/querys/big_numbers.sql");
const count_by_month = fs.readFileSync(path + "/controllers/dashboards/querys/count_by_month.sql");
const notes_by_month = fs.readFileSync(path + "/controllers/dashboards/querys/notes_by_month.sql");
const service_time_by_month = fs.readFileSync(path + "/controllers/dashboards/querys/service_time_by_month.sql");
const count_by_state = fs.readFileSync(path + "/controllers/dashboards/querys/count_by_state.sql");
const count_by_reason = fs.readFileSync(path + "/controllers/dashboards/querys/count_by_reason.sql");
const percentage_nps = fs.readFileSync(path + "/controllers/dashboards/querys/percentage_nps.sql");


module.exports = (req, res) => {
    const type = req.headers['chart_type'];
    var query = '';

    switch (type) {
        case "big_numbers":
            query = big_numbers
            break;
        case "count_by_month":
            query = count_by_month
            break;
        case "notes_by_month":
            query = notes_by_month
            break;
        case "service_time_by_month":
            query = service_time_by_month
            break;
        case "count_by_state":
            query = count_by_state
            break;
        case "count_by_reason":
            query = count_by_reason
            break;
        case "percentage_nps":
            query = percentage_nps
            break;
        default:
            query = big_numbers
    }

    db.raw(query.toString())
        .then(items => {
            if (items.length) {
                res.json(items[0])
            }
        })
        .catch(err => res.status(400).json({ dbError: 'db error:' + err }))


}