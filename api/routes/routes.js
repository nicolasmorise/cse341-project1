const router = require('express').Router();

const controller = require('../controllers/controller')


router.get('/hello', controller.hello_world);

router.get('/', controller.getContacts);

router.get('/:id', controller.getSingleContacts);

router.post('/', controller.createUsers);

router.put('/:id', controller.updateContacts);

router.delete('/:id', controller.deleteContacts);

module.exports = router;
