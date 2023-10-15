import {BrowserRouter, Route, Routes} from "react-router-dom"
import BuscarCliente from "./components/pages/generarventa/BuscarCliente"
import MenuVentas from "./components/pages/generarventa/MenuVentas"
import ListaVentas from "./components/pages/generarventa/ListaVentas"

function App(){
  return(
    <BrowserRouter>
          <Routes>
              <Route path="/buscarcliente" element={<BuscarCliente/>}/>
              <Route path="/menuventas" element={<MenuVentas/>}/>
              <Route path="/listaventas" element={<ListaVentas/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;