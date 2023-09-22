// install route

const express = require('express');
const controller = require('../controller/install');
const logger = require('../controller/logger');

const router = express.Router();

router.get('/resetdb', async (req, res) => {
  try {
    logger.log('router install will reset db');

    const result = await controller.resetDb();

    logger.log('router did route resetdb and got', JSON.stringify(result));
    return res.status(200).send(true);
  } catch (err) {
    return res.status(500).send(false);
  }
});

router.get('/*', (req, res) => res.status(404).send('invalid'));

module.exports = router;
