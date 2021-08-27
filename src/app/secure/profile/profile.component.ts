import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.infoForm = this.formBuilder.group({
      first_name: '',
      last_name: '',
      email: ''
    })
    // const user = Auth.user;
    // this.infoForm = this.formBuilder.group({
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   email: user.email
    // });

    this.passwordForm = this.formBuilder.group({
      password: '',
      password_confirm: ''
    });

    Auth.userEmitter.subscribe(
      user => {
        this.infoForm.patchValue(user); // set default value (fetched)
      }
    );
  }

  infoSubmit(): void {
    // console.log(this.infoForm.getRawValue());
    this.authService.updateInfo(this.infoForm.getRawValue()).subscribe(
      user => {
        // console.log(user);
        Auth.userEmitter.emit(user); // update the state of User Emitter
      }
    );
  }

  passwordSubmit(): void {
    // console.log(this.passwordForm.getRawValue());
    this.authService.updatePassword(this.passwordForm.getRawValue()).subscribe(
      res => console.log(res)
    );
  }
}
