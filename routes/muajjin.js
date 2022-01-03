const express = require('express');
const muajjinController = require('../controllers/muajjin');

const muajjinRouter = express.Router();

muajjinRouter.get('/list-muajjin', muajjinController.listMuajjin);
muajjinRouter.post('/add-muajjin', muajjinController.addMuajjin);
muajjinRouter.get('/detail-muajjin/:muajjinId', muajjinController.getMuajjin);
muajjinRouter.put('/update-muajjin/:muajjinId', muajjinController.editMuajjijn);
muajjinRouter.delete('/delete-muajjin/:muajjinId', muajjinController.deleteMuajjin);

module.exports = muajjinRouter