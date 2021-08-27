import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../interfaces/user";
import {Auth} from "../classes/auth";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  user: User | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.user().subscribe((res) => {
      // console.log('user is active') // cookie jwt is set
      this.user = res;
      Auth.userEmitter.emit(this.user); // store user in state
    }, () => {
      this.router.navigate(['/login']);
    })
  }

}
