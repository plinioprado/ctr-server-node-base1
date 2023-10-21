const express = require('express');
const controller = require('../controller/session')

const logger = require('../controller/logger');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    logger.log(`router login with ${req.body.email}, ${req.body.pass}`);
    const result = await controller.login(
        req.body.email,
        req.body.pass,
        req.body.tenant
      );

    return res.status(200).json(result);
  } catch (err) {
    res.status(403).send({ message: 'login failed' });
  }
});

module.exports = router;
