// Aux routes

const express = require('express');

const controller = require('../controller/aux');
const { errGetStatusCode, errorGetMessage } = require('../controller/error')
const logger = require('../controller/logger');

const router = express.Router();

router.get('/', async (req, res) =>  {
  const tableName = getTableName(req);

  try {
    logger.log(`router ${tableName} will get list`);

    const data = await controller.getList(tableName);
    logger.log(`router ${tableName} did get list`, JSON.stringify(data));

    return res.status(200).json(data);
  } catch (err) {
    logger.log(`router ${tableName} failed to get list`, JSON.stringify(err));
    return res.status(500).send({ error: 'Server failed to read list' })
  }
});

router.get('/option', async (req, res) =>  {
  const tableName = getTableName(req);

  try {
    const result = await controller.getOptionList(tableName);

    logger.log(`router ${tableName} did get options`, JSON.stringify(result));
    return res.status(200).json(result);

  } catch (err) {
    logger.log(`router ${tableName} failed to get list`, JSON.stringify(err));
    return res.status(500).send({ error: 'Server failed to read options' })
  }
});

router.get('/:id',  async (req, res) => {
  const tableName = getTableName(req);

  try {
    logger.log(`router ${tableName} will get item`);

    const data = await controller.getById(tableName, req.params.id);
    logger.log(`router ${tableName} did get item: ${JSON.stringify(data)}`);

    res.status(200).json(data);
  } catch (err) {
    logger.log(`router ${tableName} failed to get item: ${err}`);
    res.status(500).send({ error: `Server failed to read ${req.params.id}` });
  }
});

router.post('/', async (req, res) => {
  const tableName = getTableName(req);
  try {
    logger.log(`router ${tableName} will create (post) with: ${JSON.stringify(req.body)}`);

    const result = await controller.create(tableName, req.body);
    logger.log(`router ${tableName} did create: ${JSON.stringify(result)}`);

    res.status(200).send(result);
  } catch (err) {
    logger.log(`router ${tableName} failed to create (post): ${err}`);
    res.status(errGetStatusCode(err)).send(errorGetMessage(err, 'create'));
  }
});

router.put('/', async (req, res) => {
  const tableName = getTableName(req);
  try {
    logger.log(`router ${tableName} will update (put)`);

    const result = await controller.upd(tableName, req.body);

    logger.log(`router ${tableName} did update (put): ${JSON.stringify(result)}`);
    res.status(200).json(result);
  } catch (err) {
    logger.log(`router ${tableName} failed to update (put): ${err}`);
    res.status(errGetStatusCode(err)).send(errorGetMessage(err, 'update'));
  }
});

router.delete('/:cod', async (req, res) => {
  const tableName = getTableName(req);
  try {
    const cod = req.params.cod;
    logger.log(`router ${tableName} will delete`);

    const result = await controller.del(tableName, cod);

    res.status(200).send(result);
  } catch (err) {
    logger.log(`router ${tableName} failed to delete: ${err}`);
    res.status(errGetStatusCode(err)).send(errorGetMessage(err, 'delete'));
  }
});

const getTableName = (req) => {
  return req.baseUrl.replace('/api/','');
};

module.exports = router;
