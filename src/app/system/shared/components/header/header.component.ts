import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from '../../../../shared/models/user.models';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

}
