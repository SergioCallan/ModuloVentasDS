import {useState} from "react"
import axios from 'axios'
import "../../styles/EstilosGenerarVenta/BuscarCliente.css"
import {useNavigate} from 'react-router-dom'
import { CabeceraModulo } from "../../extras/CabeceraModulo";


export default function BuscarCliente(){
    const navigate= useNavigate()
    //Clientes
    const [DNI, setDNI]= useState("")
    const [Nombre, setNombre]= useState("")
    const [Apellido, setApellido]= useState("")
    const [Correo, setCorreo]= useState("")
    const [sexo, setSexo]= useState("")
    //Para boton
    const [inputDisabled, setInputDisabled]= useState(false)

    //Procesos con DNI
    const changingDNI= (event)=>{
        setDNI(event.target.value)
    }
    const buscarDNI= async(e)=>{
        e.preventDefault();
        try{
            const dni= DNI
            const url0= `https://clientemodulocrm.onrender.com/clientes/buscarPorDNI/${dni}`
            const response0= await axios.get(url0)
            if(response0.data===null){
                alert("No se encontro el cliente")
                setDNI("")
                setNombre("")
                setApellido("")
                setCorreo("")
                setSexo("")
            }
            else{
                setNombre(response0.data.nombre)
                setApellido(response0.data.apellido)
                setCorreo(response0.data.correo)
                setSexo(response0.data.sexo)
                localStorage.setItem("dnicliente", DNI)
            }
        }catch(error){
            console.error("Error al enviar la solicitud: ", error)
        }
    }

    const Confirmar=()=>{
        setInputDisabled(true)
    }

    const Cancelar=()=>{
        setInputDisabled(false)
        setDNI("")
        setNombre("")
        setApellido("")
        setCorreo("")
        localStorage.removeItem("dnicliente")
    }

    const Avanzar=()=>{
        navigate("/menuventas")
    }

    //Sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };
    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    return(
        <body>
            <main>
              <CabeceraModulo></CabeceraModulo>
                <div className="Clientes">
                
                    <div className="Clientes_Busqueda">
                        <h2>Seleccionar Cliente</h2>
                        <div className="Clientes_DNI">
                            <input type="text" className="input caja-dni" name="DNI" placeholder="DNI" onChange={changingDNI} disabled={inputDisabled} required value={DNI}></input>
                            
                            <button id="Verify" className="Celeste btn-buscar-cliente" onClick={buscarDNI}>Buscar Cliente</button> 
                        </div>
                        
                    </div>
                    
                    <div className="Clientes_Data">
                        <h2>Datos del cliente</h2>
                        <div className="Clientes_Info">
                            <input type="text" className="inputDisabled caja-nombre" name="Nombres" placeholder="Nombre(s)" disabled required value={Nombre}></input>
                            <input type="text" className="inputDisabled caja-sexo" name="Sexo" placeholder="Sexo" disabled required value={sexo}></input>
                            
                            <input type="text" className="inputDisabled caja-apellidos" name="Apellidos" placeholder="Apellido(s)" disabled required value={Apellido}></input>
                            <input type="email" className="inputDisabled caja-email" name="Correo" placeholder="Correo" disabled required value={Correo}></input>
                            
                            <button id="Cancel" className="Rojo btn-cancelar" onClick={Cancelar}>Cancelar busqueda</button>
                            <button id="Confirm" className="Verde btn-confirmar" onClick={Confirmar}>Confirmar Cliente</button>
                        </div>
                    </div>
                    <button id= "AvanzarSeleccion" className="Verde btn-seleccionar" onClick={Avanzar}>Seleccionar productos</button>
                </div>
            </main>
        </body>
    )
}
