import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'clex-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {
  @Input()disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

}
