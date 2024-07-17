const express = require('express');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');
const router = express.Router();


router.route('/users').get(authMiddleware,adminMiddleware,adminController.getAllUsers);
router.route('/users/:id').get(authMiddleware,adminMiddleware,adminController.getUserByID);
 router.route('/users/update/:id').patch(authMiddleware,adminMiddleware,adminController.updateUserByID);
router.route('/contacts').get(authMiddleware,adminMiddleware,adminController.getAllContacts);
router.route('/users/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteuserById);
router.route('/contacts/delete/:id').delete(authMiddleware,adminMiddleware,adminController.deleteContactById);

module.exports = router;