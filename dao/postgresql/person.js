// Dao person

const logger = require('../../controller/logger');
const { runQuery } = require('./aux');

const getList = async () => {
  try {
    logger.log(`dao person will get list`);

    const queryText = `SELECT
        ctr.person.*,
        ctr.address.seq AS address_seq,
        ctr.address.format_id AS address_format_id,
        ctr.address.label,
        ctr.address.line2,
        ctr.address.line3,
        ctr.address.line4,
        ctr.address.country_cod AS address_country_cod
      FROM ctr.person
      INNER JOIN ctr.address
        ON ctr.address.person_id = ctr.person.id
        AND ctr.address.seq = 1
      ORDER BY ctr.person.id, ctr.address.seq;`;

    const result = await runQuery(queryText);
    logger.log(`dao person did get list`, JSON.stringify(result.rows));

    return result.rows;
  } catch(err) {
    logger.log(`dao person failed to get list person`, err);
    throw err;
  }
}

const getById = async (id) => {
  try {
    logger.log(`dao person will get item ${id}`);

    if (id === 0) return null;

    const text = `SELECT
        ctr.person.*,
        ctr.address.seq AS address_seq,
        ctr.address.format_id AS address_format_id,
        ctr.address.label,
        ctr.address.line2,
        ctr.address.line3,
        ctr.address.line4,
        ctr.address.country_cod AS address_country_cod
      FROM ctr.person
      INNER JOIN ctr.address
        ON ctr.address.person_id = ctr.person.id
        AND ctr.address.seq = 1
      WHERE ctr.person.id = $1
      ORDER BY ctr.person.id;`;
    const values = [id]
    const result = await runQuery(text, values);
    logger.log(`dao person did get item`, JSON.stringify(result));

    return result.rows[0];
  } catch(err) {
    logger.log(`dao person failed to get item`, err);
    throw err;
  }
};

const create = async (data) => {
  try {
    logger.log(`dao person will create`);

    const values = [data.entity, data.name_first, data.name_middle, data.name_last, data.name_entity, data.email, data.active, data.tenant_cod];
    const text = `
    INSERT INTO ctr.person (
      entity, name_first, name_middle, name_last, name_entity, email, active, tenant_cod)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id;`;
    const result = await runQuery(text, values);

    const id = result.rows[0].id;
    const address = data.addressList[0];

    const values2 = [id, address.seq, address.format_id, address.label, address.line2, address.line3, address.line4, address.country_cod];
    const text2 = `
    INSERT INTO ctr.address
      (person_id, seq, format_id, label, line2, line3, line4, country_cod)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING person_id;`;
    const result2 = await runQuery(text2, values2);
    if (result2.rows[0].person_id !== id) throw 'query problem';

    const data3 = await getById(id)
    logger.log(`dao person did create item`, JSON.stringify(data3));

    return data3;
  } catch (err) {
    logger.log(`dao failed to create person`, err);
    throw err;
  }
};

const upd = async (data) => {
  try {
    logger.log(`dao person will update: ${JSON.stringify(data)}`);

    const values = [data.id, data.entity, data.name_first, data.name_middle, data.name_last, data.name_entity, data.email, data.active];
    const text = `
      UPDATE ctr.person SET
        entity = $2, name_first = $3, name_middle = $4, name_last = $5, name_entity = $6, email = $7, active = $8
      WHERE id = $1
      RETURNING id;`;
    const result = await runQuery(text, values);

    const id = result.rows[0].id;
    const address = data.addressList[0];

    const values2 = [id, address.seq, address.format_id, address.label, address.line2, address.line3, address.line4, address.country_cod];
    const text2 = `
      UPDATE ctr.address SET
        format_id = $3, label = $4, line2 = $5,
        line3 = $6, line4 = $7, country_cod = $8
      WHERE person_id = $1 AND seq = $2
      RETURNING person_id;`;
    const result2 = await runQuery(text2, values2);
    if (result2.rows[0].person_id !== id) throw 'query problem';
    const data3 = await getById(id)
    logger.log(`dao person did update item`, JSON.stringify(data3));

    return data3;
  } catch (err) {
    logger.log(`dao person failed to update`, err);
    throw err;
  }
};

const del = async (id) => {
  try {
    logger.log(`dao will delete person ${id}`);

    const text = `DELETE FROM ctr.person WHERE id = $1;`
    const values = [id]
    const result = await runQuery(text, values);

    logger.log(`dao person did delete ${id}`, JSON.stringify(result));
    return result;
  } catch (err) {
    logger.log(`dao person failed to delete ${id}`, err);
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
