// Dao invoice

const logger = require('../../controller/logger');
const { runQuery } = require('./aux');

const getList = async () => {
  try {
    logger.log(`dao invoice will get list`);

    const text = `SELECT
        ctr.invoice.id,
        to_char(ctr.invoice.dt_doc, 'YYYY-MM-DD') AS dt_doc,
        ctr.invoice.descr,
        ctr.invoice.val_doc_amount,
        ctr.invoice.val_doc_currency
      FROM ctr.invoice
      ORDER BY ctr.invoice.id;`;
    const result = await runQuery(text);
    logger.log(`dao invoice did get list`, JSON.stringify(result.rows));

    return result.rows;
  } catch(err) {
    logger.log('dao invoice failed to get list', err);
    throw err;
  }
}

const getById = async (id) => {
  try {
    logger.log(`dao person will get item ${id}`);

    if (id === 0) return null;

    const text = `SELECT
        ctr.invoice.id,
        to_char(ctr.invoice.dt_doc, 'YYYY-MM-DD') AS dt_doc,
        ctr.invoice.descr,
        ctr.invoice.val_doc_amount,
        ctr.invoice.val_doc_currency
      FROM ctr.invoice
      WHERE ctr.invoice.id = $1;`;
    const values = [id]
    const result = await runQuery(text, values);
    logger.log(`dao invoice did get item`, JSON.stringify(result));

    return result.rows[0];
  } catch(err) {
    logger.log(`dao invoice failed to get item`, err);
    throw err;
  }
};

const create = async (data) => {
  try {
    logger.log(`dao invoice will create`);

    const text = `
      INSERT INTO ctr.invoice
        (dt_doc, descr, val_doc_amount, val_doc_currency)
      VALUES ($1, $2, $3, $4)
      RETURNING ctr.invoice.id;`;
    const values = [data.dt.doc, data.descr, data.val.doc.amount, data.val.doc.currency];
    const result = await runQuery(text, values);
    logger.log(`dao invoice did create`, JSON.stringify(result));

    return result.rows[0];
  } catch (err) {
    logger.log(`dao invoice failed to create`, err);
    throw err;
  }
};

const upd = async (data) => {
  try {
    logger.log(`dao invoice will update: ${JSON.stringify(data)}`);

    const text = `
      UPDATE ctr.invoice
      SET
        dt_doc = $2, descr = $3, val_doc_amount = $4, val_doc_currency = $5
      WHERE ctr.invoice.id = $1
      RETURNING ctr.invoice.id;`;
    const values = [data.id, data.dt.doc, data.descr, data.val.doc.amount, data.val.doc.currency];
    const result = await runQuery(text, values);
    logger.log(`dao invoice did update`, JSON.stringify(result));

    return result.rows[0];
  } catch (err) {
    logger.log(`dao invoice failed to update`, err);
    throw err;
  }
};

const del = async (id) => {
  try {
    logger.log(`dao invoice will delete ${id}`);

    const text = `DELETE FROM ctr.invoice WHERE id = $1;`
    const values = [id]
    const result = await runQuery(text, values);

    logger.log(`dao invoice did delete ${id}`, JSON.stringify(result));
    return result;
  } catch (err) {
    logger.log(`dao invoice failed to delete ${id}`, err);
    throw err;
  }
};

module.exports = {
  getList,
  getById,
  create,
  upd,
  del
}
