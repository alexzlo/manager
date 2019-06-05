import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillModel} from '../models/bill.model';
import {map} from 'rxjs/operators';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBill(): Observable<any> {
    return this.http.get('http://localhost:3000/bill');
  }

  getCurrency(base: string = 'USD'): Observable<any> {
    return this.http.get(`https://api.exchangeratesapi.io/latest?base=${base}`);
  }
}
