import { FirebaseError } from 'firebase';
import { ServerErrorHandler } from './server-handler';
export class FirebaseHandlerError extends ServerErrorHandler<FirebaseError> {
  constructor(error: FirebaseError) {
    super(error);
  }

  get code() {
    return this.error.code;
  }


  get decodeMessage() {
    switch (this.code) {
      case 'auth/wrong-password':
        return 'Password non valida';
      case 'auth/user-not-found':
        return 'Utente non trovato';
      case 'auth/user-disabled':
        return 'Utente disabilitato';
      default:
        return this.message;
    }
  }
}
