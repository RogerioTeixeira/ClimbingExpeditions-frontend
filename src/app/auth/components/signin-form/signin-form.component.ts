import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { FormAuth } from '../../models';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'clex-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  formG: FormGroup;
  private _disabled: boolean;
  @Output() signedIn: EventEmitter<FormAuth> = new EventEmitter<FormAuth>();
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
    if (this.formG) {
      if (value) {
        this.formG.disable();
      } else {
        this.formG.enable();
      }
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formG = this.fb.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      remember: [null]
    });
  }

  submitted() {
    if (this.formG.valid) {
      this.signedIn.emit({ provider: 'email', authInfo: this.formG.value });
    }
  }
}
