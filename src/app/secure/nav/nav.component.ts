import {Component, Input, OnInit} from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import {Auth} from "../../classes/auth";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input('user') user: User | undefined;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.user().subscribe((res: User) => {
    //   // console.log(res);
    //   this.user = res;
    // }); // call already done in secure.component.ts

    Auth.userEmitter.subscribe(user => this.user = user);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      console.log('success');
    });
  }
}
