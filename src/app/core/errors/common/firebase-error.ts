import { FirebaseError } from 'firebase';
export class FirebaseResponseError implements FirebaseError  {
  code: string;
  message: string;
  name: string;
  stack?: string;
}
