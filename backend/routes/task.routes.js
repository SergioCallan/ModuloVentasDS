const { Router } = require('express');
const { getAllPhone, getPhone, createPhone, deletePhone, updatePhone } = require('../controllers/phone.controllers');
const { getAllInternet, getInternet, createInternet, deleteInternet, updateInternet } = require('../controllers/internet.controllers');
const {searchproduct, searchbrand, searchmodel, searchid}= require('../controllers/searchphone.controllers')
const {searchdni}= require('../controllers/client.controllers')
const {addDetails, getSellDetails, deleteSell, registerSell}= require('../controllers/sell.controllers')

const router = Router();

//Rutas para celular

router.get('/phone', getAllPhone) 

router.get('/phone/:id', getPhone)

router.post('/phone', createPhone)

router.delete('/phone/:id', deletePhone)

router.put('/phone/:id', updatePhone)   

//Rutas para internet

router.get('/internet', getAllInternet) 

router.get('/internet/:id', getInternet)

router.post('/internet', createInternet)

router.delete('/internet/:id', deleteInternet)

router.put('/internet/:id', updateInternet)

//Rutas para clientes

router.get('/searchdni/:dni', searchdni)

//Rutas para busquedas y filtros

router.get('/searchproduct/:nombre', searchproduct)

router.get('/searchbrand/:marca', searchbrand)

router.get('/searchmodel/:modelo', searchmodel)

router.get('/searchid/:id', searchid)

//Rutas para ventas

router.post('/adddetail', addDetails)

router.get('/getselldetails/:idventa', getSellDetails)

router.delete('/deletesell/:idventa', deleteSell)

router.post('/registersell', registerSell)
module.exports = router;