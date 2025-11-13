const router = require('express').Router();
const { contactValidation } = require("../utils/validation");
const { handleValidationErrors } = require("../middleware/validate");

const controller = require('../controllers/controller')


router.get('/hello', controller.hello_world);

router.get('/', controller.getContacts);

router.get('/:id', controller.getSingleContacts);

router.post('/', contactValidation, handleValidationErrors, controller.createUsers);

router.put('/:id', controller.updateContacts);

router.delete('/:id', controller.deleteContacts);

module.exports = router;
