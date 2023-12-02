export class Cambio{
    observador:Observador = new ObservadorNavegar()
    // tipoProducto:string  //estado , phone o plan
    constructor(){

    }

    cambiarTipoProducto(nuevoTipo:string):void{
        // this.tipoProducto = tipoProducto //telefono o internet
        this.notificarCambio(nuevoTipo) 
    }

    notificarCambio(tipo:string):void{
        const direccion = (tipo === 'Celular') ? 'phone' : 'internet'
        this.observador.NavegarA(direccion)
    }
}

interface Observador{
    // cambio:Cambio

    NavegarA(direccion:string):void
}

class ObservadorNavegar implements Observador{
    // cambio: Cambio;
    
    NavegarA(direccion:string): void {
        window.location.replace(`/${direccion}`);
    }
}