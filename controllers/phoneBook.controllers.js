const db = require('../libs/db');
const mapper = require('../mappers/phoneBook.mapper');

module.exports.get = async (ctx) => {
  const result = await db.query('select * from contacts where id=$1', [ctx.params.id])
    .then((res) => res.rows[0]);
  if (!result) {
    ctx.throw(404, 'Not found');
  }
  ctx.status = 200;
  ctx.body = mapper(result);
};

module.exports.getAll = async (ctx) => {
  const result = await db.query('select * from contacts ')
    .then((res) => res.rows);
  ctx.status = 200;
  ctx.body = result.map((value) => mapper(value));
};

module.exports.add = async (ctx) => {
  const result = await db.query('INSERT INTO contacts (name, tel) VALUES ($1, $2) RETURNING *', [ctx.request.body.name, ctx.request.body.tel])
    .then((res) => res.rows[0]);
  ctx.status = 201;
  ctx.body = mapper(result);
};

module.exports.upd = async (ctx) => {
  const result = await db.query(
    'UPDATE contacts SET name=$1, tel=$2 WHERE id=$3 RETURNING *',
    [
      ctx.request.body.name,
      ctx.request.body.tel,
      ctx.params.id],
  )
    .then((res) => res.rows[0]);
  if (!result) {
    ctx.throw(404, 'Not found');
  }
  ctx.status = 200;
  ctx.body = mapper(result);
};

module.exports.del = async (ctx) => {
  const result = await db.query(
    'DELETE FROM contacts WHERE id=$1 RETURNING *',
    [ctx.params.id],
  )
    .then((res) => res.rows[0]);
  if (!result) {
    ctx.throw(404, 'Not found');
  }
  ctx.status = 200;
  ctx.body = mapper(result);
};
