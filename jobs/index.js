const classify_complaints = require('../services/auto-classify')

module.exports = () => {
    console.log("Running job")
    classify_complaints()
}

