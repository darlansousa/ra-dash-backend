const getComplainers = (req, res, db) => {
    db.select('*').from('complainers')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error:' + err}))
  }
  
  const postComplainers = (req, res, db) => {
    const { name, cpf, uc, city, email, phone, is_client } = req.body
    const added = new Date()
    db('complainers').insert({ name, cpf, uc, city, email, phone, is_client })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putComplainers = (req, res, db) => {
    const { id, name, cpf, uc, city, email, phone, is_client } = req.body
    db('complainers').where({id}).update({ name, cpf, uc, city, email, phone, is_client } )
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteComplainers = (req, res, db) => {
    const { id } = req.body
    db('complainers').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getComplainers,
    postComplainers,
    putComplainers,
    deleteComplainers
  }