const { Router } = require('express');
const { getAllPhone, getPhone, createPhone, deletePhone, updatePhone } = require('../controllers/phone.controllers');
const { getAllInternet, getInternet, createInternet, deleteInternet, updateInternet } = require('../controllers/internet.controllers');
const {searchproduct, searchbrand, searchmodel, searchid}= require('../controllers/searchphone.controllers')
const {searchdni}= require('../controllers/client.controllers')
const {addDetails, getSellDetails, deleteSell, registerSell, deleteDetail}= require('../controllers/sell.controllers')
const {searchplan, searchmegas, searchplanid}=require('../controllers/searchplan.controllers')
const {associate, getLineas, pagoLinea, atrasoLinea, cancelarLinea}= require('../controllers/factura.controllers')

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

router.get('/searchplan/:tipo', searchplan)

router.get('searchmegas/:megas', searchmegas)

router.get('/searchplanid/:id', searchplanid)

//Rutas para ventas

router.post('/adddetail', addDetails)

router.get('/getselldetails/:idventa', getSellDetails)

router.delete('/deletesell/:idventa', deleteSell)

router.post('/registersell', registerSell)

router.delete('/deletedetail/:id_detalle', deleteDetail)

//Rutas para las facturas

router.post('/associate', associate)

router.get('/getlineas/:dni_cliente', getLineas)

router.put('/pagolinea/:numero', pagoLinea)

router.put('/atrasolinea/:numero', atrasoLinea)

router.put('/cancelarlinea/:numero', cancelarLinea)

module.exports = router;