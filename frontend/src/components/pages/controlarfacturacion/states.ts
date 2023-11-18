export interface State {
    handlePago(): State;
    handleSuspender(): State;
    handleCancelar(): State;
  }
  
  export class PendienteState implements State {
    handlePago() {
      // Cambiar el estado a Pendiente
      return this;
    }
  
    handleSuspender() {
      // Cambiar el estado a Suspendido
      return new SuspendidoState();
    }
  
    handleCancelar() {
      // Cambiar el estado a Cancelado
      return new CanceladoState();
    }
  }
  
  export class SuspendidoState implements State {
    handlePago() {
      // Cambiar el estado a Pendiente
      return new PendienteState();
    }
  
    handleSuspender() {
      // Mantener el estado en Suspendido
      return this;
    }
  
    handleCancelar() {
      // Cambiar el estado a Cancelado
      return new CanceladoState();
    }
  }
  
  export class CanceladoState implements State {
    handlePago() {
      // Cambiar el estado a Pendiente
      return new PendienteState();
    }
  
    handleSuspender() {
      // No se puede suspender un estado Cancelado, así que mantenemos el estado actual
      return this;
    }
  
    handleCancelar() {
      // Mantener el estado en Cancelado
      return this;
    }
  }