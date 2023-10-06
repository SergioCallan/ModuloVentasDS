import {BrowserRouter, Route, Routes} from "react-router-dom"
import GenerarVenta from "./components/pages/GenerarVenta"
import FiltrosVenta from "./components/pages/FiltrosVenta"

function App(){
  return(
    <BrowserRouter>
          <Routes>
              <Route path="/ventas" element={<GenerarVenta/>}/>
              <Route path="/ventasfilter" element={<FiltrosVenta/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;