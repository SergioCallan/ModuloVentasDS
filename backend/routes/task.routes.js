const { Router } = require('express');
const { getAllPhone, getPhone, createPhone, deletePhone, updatePhone } = require('../controllers/phone.controllers');
const { getAllInternet, getInternet, createInternet, deleteInternet, updateInternet } = require('../controllers/internet.controllers');
const {searchproduct, searchbrand, searchmodel, searchprice, searchid}= require('../controllers/searchphone.controllers')
const {addDetails, getSellDetails, deleteSell, registerSell, deleteDetail, getSelldni, getSellid, calculateSell}= require('../controllers/sell.controllers')
const {searchplan, searchmegas, searchplanid, searchplanprice}=require('../controllers/searchplan.controllers')
const {associate, getLineas, pagoLinea, atrasoLinea, cancelarLinea, searchLinea, cambioLinea, suspenderLinea, reactivarLinea}= require('../controllers/factura.controllers')
const {searchbilldni, searchbillnumber, searchbillid, createbill, searchpaybilldni, searchpaybillnumero, paybill, updateBill, suspendBill}= require('../controllers/bills.controllers')
const {searchWarranty}= require('../controllers/warranty.controllers')
const {getSellDetailsById, getLastSell}= require('../controllers/searchById.controllers')
const { getDetalleVentaById, getIdVentaByIdDetalle, getDniClienteByIdVenta } = require('../controllers/sellDetails.controllers');
const {createGReportDaily, createGReportWeekly, createGReportMonthly, createEReportDaily, createEReportWeekly, createEReportMonthly, createPReportDaily, createPReportWeekly, createPReportMonthly}= require('../controllers/report.controllers')

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

//Rutas para busquedas y filtros

router.get('/searchproduct/:nombre', searchproduct)

router.get('/searchbrand/:marca', searchbrand)

router.get('/searchmodel/:modelo', searchmodel)

router.get('/searchprice', searchprice)

router.get('/searchid/:id', searchid)

router.get('/searchplan/:tipo', searchplan)

router.get('/searchmegas/:megas', searchmegas)

router.get('/searchplanprice', searchplanprice)

router.get('/searchplanid/:id', searchplanid)

//Rutas para ventas

router.post('/adddetail', addDetails)

router.get('/getselldetails/:idventa', getSellDetails)

router.delete('/deletesell/:idventa', deleteSell)

router.post('/registersell', registerSell)

router.delete('/deletedetail/:id_detalle', deleteDetail)

router.get('/getselldni/:dni_cliente', getSelldni)

router.get('/getsellid/:id_venta', getSellid)

router.get('/calculatesell/:id_venta', calculateSell)


//Rutas para las facturas(actuales)

router.post('/associate', associate)

router.get('/getlineas/:dni_cliente', getLineas)

router.get('/searchlinea/:numero', searchLinea)

router.put('/cambiolinea', cambioLinea)

router.put('/pagolinea/:numero', pagoLinea)

router.put('/atrasolinea/:numero', atrasoLinea)

router.put('/suspenderlinea/:numero', suspenderLinea)

router.put('/reactivarlinea/:numero', reactivarLinea)

router.put('/cancelarlinea/:numero', cancelarLinea)

//Rutas para las facturas(registros)

router.get('/searchbilldni/:dni_cliente', searchbilldni)

router.get('/searchbillid/:id_factura', searchbillid)

router.get('/searchbillnumber/:numero_linea', searchbillnumber)

router.get('/searchpaidbilldni/:dni_cliente', searchpaybilldni)

router.get('/searchpaidbillnumero/:numero_linea', searchpaybillnumero)

router.put('/paybill/:id_factura', paybill)

router.put('/suspendbill/:id_factura', suspendBill)

router.post('/createbill', createbill)

router.post('/updatebill/:numero_linea', updateBill)

//Rutas para las garantias

router.get('/searchwarranty/:id_garantia', searchWarranty)

module.exports = router;

//Intentar aplicar mostrar equipos comprados

//Rutas para los reportes

router.get('/creategreportdaily', createGReportDaily)

router.get('/creategreportweekly', createGReportWeekly)

router.get('/creategreportmonthly', createGReportMonthly)

router.get('/createereportdaily', createEReportDaily)

router.get('/createereportweekly', createEReportWeekly)

router.get('/createereportmonthly', createEReportMonthly)

router.get('/createpreportdaily', createPReportDaily)

router.get('/createpreportweekly', createPReportWeekly)

router.get('/createpreportmonthly', createPReportMonthly)
//Sebas

router.get('/sell/last', getLastSell);

router.get('/selldetails/:id_detalle', getSellDetailsById);

router.get('/selldetailsbyid/:id_detalle', getDetalleVentaById);

router.get('/idventabyid/:id_detalle', getIdVentaByIdDetalle);

router.get('/clientebyid/:id_venta', getDniClienteByIdVenta);