import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoriesService} from '../../shared/services/categories.service';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  sub1: Subscription;

  @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

  constructor(private categoriesService: CategoriesService) {
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line:prefer-const
    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category = new CategoryModel(name, capacity);

    this.sub1 = this.categoriesService.addCategory(category).subscribe((category: CategoryModel) => {
      form.reset();
      form.form.patchValue({capacity: 1});
      this.onCategoryAdd.emit(category);
    });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
