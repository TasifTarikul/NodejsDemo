const express = require('express');
const { body } = require('express-validator')
const masjidController = require('../controllers/masjid')
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/list-masjid', isAuth, masjidController.getAllMasjid);
router.post('/add-masjid', [
    body('name')
    .trim()
    .isLength({min:5}),
], isAuth, masjidController.createMasjid);
router.get('/detail-masjid/:masjidId', isAuth, masjidController.getMasjid);
router.put('/update-masjid/:masjidId', [
    body('name')
    .trim()
    .isLength({min:5}),
], isAuth, masjidController.updateMasjid);
router.delete('/delete-masjid/:masjidId', isAuth, masjidController.deleteMasjid);

module.exports = router
