import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: BillModel;
  @Input() currency: any;

  zloty: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const { rates } = this.currency;
    this.zloty = rates.PLN * this.bill.value;
    this.euro = rates.EUR * this.bill.value;
  }

}
