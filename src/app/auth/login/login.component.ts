import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.models';
import {MassageModel} from '../../shared/models/massage.model';
import {AuthService} from '../../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  massage: MassageModel;

  sub1: Subscription;
  sub2: Subscription;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.massage = new MassageModel('danger', '');

    this.sub1 = this.route.queryParams.subscribe((params: Params) => {
      if (params.nowCanLogin) {
        this.showMessage({
          text: 'Now you can login to system',
          type: 'success'
        });
      }
    });
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private showMessage(message) {
    this.massage = message;
    window.setTimeout(() => {
      this.massage.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.sub2 = this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.massage.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage({
              text: 'Wrong password',
              type: 'danger'
            });
          }
        } else {
          this.showMessage({
            text: 'Achtung!!! Kann nicht',
            type: 'danger'
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }

}
