import {BrowserRouter, Route, Routes} from "react-router-dom"
import BuscarCliente from "./components/pages/BuscarCliente"
import MenuVentas from "./components/pages/MenuVentas"
import GenerarVenta from "./components/pages/GenerarVenta"
import FiltrosVenta from "./components/pages/FiltrosVenta"

function App(){
  return(
    <BrowserRouter>
          <Routes>
              <Route path="/buscarcliente" element={<BuscarCliente/>}/>
              <Route path="/menuventas" element={<MenuVentas/>}/>
              <Route path="/ventas" element={<GenerarVenta/>}/>
              <Route path="/ventasfilter" element={<FiltrosVenta/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;