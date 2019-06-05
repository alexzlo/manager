import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.models';
import {map} from 'rxjs/operators';
import {BillService} from '../../system/shared/services/bill.service';

@Injectable()
export class UsersService extends BillService{

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.get(`users?email=${email}`).pipe(
        map((user: Response) => {
          return user[0] ? user[0] : undefined;
        })
    );
  }

  createNewUser(user: User): Observable<any> {
    return this.post('users', user);
  }
}
