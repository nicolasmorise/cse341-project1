const router = require('express').Router();

const controller = require('../controllers/controller')


router.get('/hello', controller.hello_world);

router.get('/', controller.getContacts);

router.get('/:id', controller.getSingleContacts);

module.exports = router;
