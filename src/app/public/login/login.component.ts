import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './../public.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup; // reactive form

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {}

  submit(): void {
    // console.log(this.form.getRawValue());
    // this.http
      // .post(`${environment.api}/login`, this.form.getRawValue(), {
        // withCredentials: true, // sets the cookie in the browser
      // })
      // .subscribe((res) => {
        // console.log(res);
        // this.router.navigate(['/']);
      // });

    this.authService
      .login(this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/']));
  }
}
