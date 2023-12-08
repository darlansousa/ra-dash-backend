const axios = require('axios');
const api_ai_classify = process.env.RA_API_CLASSIFY_URL || 'http://127.0.0.1:8050'

module.exports = (method, complaint, callback) => {
  axios.post(`${api_ai_classify}/classify/${method}`, {
    'id': complaint.ra_id,
    'title': complaint.title,
    'description': complaint.description
  })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      console.log('Error: ', err.message);
    });

}

