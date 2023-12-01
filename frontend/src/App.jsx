import {BrowserRouter, Route, Routes} from "react-router-dom"
import Principal from './components/pages/agregaractualizar/Principal'
import Phone from './components/pages/agregaractualizar/Phone'
import Internet from './components/pages/agregaractualizar/Internet'
import ListPhone from './components/pages/agregaractualizar/ListPhone'
import ListInternet from './components/pages/agregaractualizar/ListInternet'
import MenuVentas from "./components/pages/generarventa/MenuVentas"
import BuscarCliente from "./components/pages/generarventa/BuscarCliente"
import BuscarProducto from "./components/pages/generarventa/BuscarProducto"
import BuscarPlan from "./components/pages/controlarfacturacion/BuscarPlan"
import ListaVentas from "./components/pages/generarventa/ListaVentas"
import AsociarPlan from "./components/pages/controlarfacturacion/AsociarPlan"
import ObservarFacturas from "./components/pages/controlarfacturacion/observarFacturas"
import Listado from "./components/pages/agregaractualizar/listado"
import SearchById from './components/pages/imprimirventa/buscarventa';
import SellDetails from './components/pages/imprimirventa/verdetalles';
import Operaciones from './components/pages/controlarfacturacion/Operaciones'
import {InterfazBase} from './components/pages/Interfaz principal/InterfazBase'
import VisualizarReporte from "./components/pages/reporteventas/visualizarReporte"
import { AvailableContextProvider } from "./context/AvailableContext"

function App(){
  return(
    <BrowserRouter>
    <AvailableContextProvider>
          <Routes>
              <Route path ='/' element={<Principal/>} />
              <Route path='/phone' element={<Phone/>}/>
              <Route path='/internet' element={<Internet/>}/>
              <Route path='/listPhone' element={<ListPhone/>}/>
              <Route path='/phone/:id/edit' element={<Phone/>}/>
              <Route path='/listInternet' element={<ListInternet/>}/>
              <Route path='/internet/:id/edit' element={<Internet/>}/>
              <Route path="/buscarcliente" element={<BuscarCliente/>}/>
              <Route path="/menuventas" element={<MenuVentas/>}/>
              <Route path="/buscarproducto" element={<BuscarProducto/>}/>
              <Route path="/buscarplan" element={<BuscarPlan/>}/>
              <Route path="/listaventas" element={<ListaVentas/>}/>
              <Route path="/asociarplan" element={<AsociarPlan/>}/>
              <Route path="/observarfacturas" element={<ObservarFacturas/>}/>
              <Route path="/listado" element={<Listado/>}/>
              <Route path="/sell/:idVenta" element={<SearchById />} />
              <Route path="/selldetails/:id_detalle" element={<SellDetails />} />
              <Route path="/operaciones" element={<Operaciones/>}/>
              <Route path="/reporte" element={<VisualizarReporte/>}/>
              <Route path="/principal" element={<InterfazBase/>}/>
          
          </Routes></AvailableContextProvider>
    </BrowserRouter>
  )
}

export default App;