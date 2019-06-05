import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {combineLatest, Subscription} from 'rxjs';


@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private billService: BillService) {
  }

  subscription: Subscription;




  ngOnInit() {
     this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
     ).subscribe((result => console.log(result)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
