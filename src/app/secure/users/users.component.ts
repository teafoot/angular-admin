import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  // page = 1;
  lastPage: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.userService.all(page).subscribe(res => {
      this.users = res.data;
      this.lastPage = res.meta.last_page;
    });
  }

  // load(): void {
  //   this.userService.all(this.page).subscribe(res => {
  //     this.users = res.data;
  //     this.lastPage = res.meta.last_page;
  //   });
  // }

  // next(): void {
  //   if (this.page === this.lastPage) {
  //     return;
  //   }
  //   this.page++;
  //   this.load();
  // }

  // prev(): void {
  //   if (this.page === 1) {
  //     return;
  //   }
  //   this.page--;
  //   this.load();
  // }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter(user => user.id !== id);
      });
    }
  }
}
