import { Injectable } from '@angular/core';
import { Router, Event, NavigationError } from '@angular/router';

@Injectable()
export class ErrorService {
  constructor(private router: Router) {
    console.log('error serice initialize');
    this.router.events.subscribe((event: Event) => {
      console.log('navigazione:', event);
      if (event instanceof NavigationError) {
        console.log('errore navigazione:', event.error);
      }
    });
  }
}
