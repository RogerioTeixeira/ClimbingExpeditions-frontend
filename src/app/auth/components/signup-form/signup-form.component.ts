import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { FormAuth } from '../../models';

@Component({
  selector: 'clex-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  formG: FormGroup;
  @Output() signedUp: EventEmitter<FormAuth> = new EventEmitter<FormAuth>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formG = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required])
      ],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  submitted() {
    if (this.formG.valid) {
      this.signedUp.emit({ provider: 'email', authInfo: this.formG.value });
    }
  }

}
