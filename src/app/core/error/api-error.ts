import { HttpErrorResponse } from '@angular/common/http';
import { ServerErrorHandler } from './server-handler';
export class ApiHandlerError extends ServerErrorHandler<HttpErrorResponse> {
  constructor(error: HttpErrorResponse) {
    super(error);
  }

  get code() {
    return this.error.status;
  }

  get decodeMessage() {
    switch (this.code) {
      case 401:
        return `Accesso non autorizzato`;
      case 404:
        return `URI ${this.error.url} non trovata. Contattare amministratore del sito`;
      case 500:
        return 'Errore server';
        case 0:
        return 'Server momentaneamente non raggiungibile';
      default:
        return this.message;
    }
  }
}
