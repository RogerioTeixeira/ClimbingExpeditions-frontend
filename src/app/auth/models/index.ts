export interface FormAuth {
  provider: string;
  authInfo: any;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  urlImage?: string;
}
