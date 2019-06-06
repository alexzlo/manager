import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;

  bill: BillModel;
  categories: CategoryModel[] = [];
  events: EventModel[] = [];

  constructor(
    private billService: BillService,
    private categoryServise: CategoriesService,
    private eventsService: EventsService
  ) {
  }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoryServise.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
      console.log(data);
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(category: CategoryModel): number {
    const catEvent = this.events.filter(e => e.category === category.id && e.type === 'outcome');
    return catEvent.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPersent(category: CategoryModel): number {
    const percent = (100 * this.getCategoryCost(category) / category.capacity);
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: CategoryModel): string {
    return this.getPersent(category) + '%';
  }

  getCategoryClass(category: CategoryModel): string {
    const percent = this.getPersent(category);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
