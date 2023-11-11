
export class Cambio{
    observador:Observador = new ObservadorNavegar()
    constructor(){

    }

    cambiarTipoProducto(nuevoTipo:string):void{
        this.cambioPagina(nuevoTipo) 
    }

    cambioPagina(tipo:string):void{
        const direccion = (tipo === 'Celular') ? 'phone' : 'internet'
        this.observador.NavegarA(direccion)
    }
}

interface Observador{

    NavegarA(direccion:string):void
}

class ObservadorNavegar implements Observador{
    
    NavegarA(direccion:string): void {
        window.location.replace(`/${direccion}`);
    }
}