import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'clex-user-info-edit',
  templateUrl: './user-info-edit.component.html',
  styleUrls: ['./user-info-edit.component.scss']
})
export class UserInfoEditComponent implements OnInit {
  formG: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formG = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required])
      ],
      birthdate: [
        null,
        Validators.compose([Validators.required])
      ],
      remember: [null]
    });
  }

}
