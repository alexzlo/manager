import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BillModel} from '../models/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBill(): Observable<any> {
    return this.http.get('hhtp:localhost:300/bill');
  }

  getCurrency() {
    return this.http.get('https://api.exchangeratesapi.io/latest?base=PLN');
    // https://www.currencyconverterapi.com/docs
    // workjobspam
  }
}
