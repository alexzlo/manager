import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.models';
import {MassageModel} from '../../shared/models/massage.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  massage: MassageModel;

  constructor(
    private usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.massage = new MassageModel('danger', '');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    // console.log(this.usersService.getUserByEmail('wfm@mail.ru').subscribe(some => console.log(some)));
  }

  private showMessage(text: string, type: string = 'danger') {
    this.massage = new MassageModel(type, text);
    window.setTimeout(() => {
      this.massage.text = '';
    }, 5000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.showMessage('Guessed', 'success');
          } else {
            this.showMessage('Wrong password');
          }
        } else {
          this.showMessage('Achtung!!! Kann nicht');
        }
      });
    // this.form.reset();
  }

}
