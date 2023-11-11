const getComplaints = (req, res, db) => {
    db.select('*').from('complaints')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error:' + err}))
  }
  
  const postComplaints = (req, res, db) => {
    const { ra_cod, ra_id, title, date_description, chanel, reason, description, complainer_id } = req.body
    const added = new Date()
    db('complaints').insert({ra_cod, ra_id, title, date_description, chanel, reason, description, complainer_id})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putComplaints = (req, res, db) => {
    const { id, ra_cod, ra_id, title, date_description, chanel, reason, description, complainer_id } = req.body
    db('complaints').where({id}).update({ ra_cod, ra_id, title, date_description, chanel, reason, description, complainer_id })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteComplaints = (req, res, db) => {
    const { id } = req.body
    db('complaints').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getComplaints,
    postComplaints,
    putComplaints,
    deleteComplaints
  }