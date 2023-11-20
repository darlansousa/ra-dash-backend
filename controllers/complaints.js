const getComplaints = (req, res, db) => {
  const {status, sys_reason, ai_classification} = req.query
  db.select('*').from('complaints')
    .innerJoin('complainers', 'complainers.id', 'complaints.complainer_id')
    .where((qb) => {
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
      if (items.length) {
        res.json(items)
      } else {
        res.json([])
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}

const getComplaintsInfo = (req, res, db) => {

  var all = db.from('complaints')
  .count('*')
  .as('all');

  var pending = db.from('complaints')
  .count('*').where({'complaints_status': 'pending'})
  .as('pending');

  var closed = db.from('complaints')
  .count('*').where({'complaints_status': 'closed'})
  .as('closed');

  var ai_review = db.from('complaints')
  .count('*').whereNot({'ai_classification': null})
  .as('ai_review');

  var pending_process = db.from('complaints_process')
  .count('*').where({'status': 'pending'})
  .as('pending_process');
   
  db.select(all, closed, pending, ai_review, pending_process).from('complaints').limit(1)
    .then(items => {
        res.json(items[0])
    })
    .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}

const getComplaintsById = (req, res, db) => {
  const id = req.params.id
  db.select('*').from('complaints')
    .innerJoin('complainers', 'complainers.id', 'complaints.complainer_id')
    .where({ "complaints.id": id })
    .then(items => {
      if (items.length) {
        res.json(items[0])
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error:' + err }))
}

const putAllData = (req, res, db) => {
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
  const close_date_db = close_date.split('T')[0]
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
    close_date: close_date_db,
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
        is_client })
        .then(() => getComplaintsById(req, res, db))
        .catch(err => res.status(400).json({ dbError: 'db error update user' + err}))
    })
    .catch(err => res.status(400).json({ dbError: 'db error update complaint' + err }))
}

const closeComplaints = (req, res, db) => {
  const id = req.params.id
  const { id_occurrence, close_date, system_sub_reason, complainer_note, negotiate_again } = req.body

  const close_date_db = close_date.split('T')[0]

  db('complaints').update({ id_occurrence, close_date: close_date_db, system_sub_reason, complainer_note, negotiate_again, complaints_status: 'closed' })
    .where({ id })
    .then(() => {
      getComplaintsById(req, res, db)
    })
    .catch(err => res.status(400).json({ dbError: 'db error' + err }))
}

const deleteComplaints = (req, res, db) => {
  const id = req.params.id
  db('complaints').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error' }))
}

module.exports = {
  getComplaints,
  getComplaintsInfo,
  getComplaintsById,
  deleteComplaints,
  closeComplaints,
  putAllData
}