import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.models';
import {map} from 'rxjs/operators';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${email}`).pipe(
      map((user: Response) => {
        return user[0] ? user[0] : undefined;
      })
    );
  }
}
