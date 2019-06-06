import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

import {CategoriesService} from '../../shared/services/categories.service';
import {CategoryModel} from '../../shared/models/category.model';
import {MassageModel} from '../../../shared/models/massage.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel[] = [];
  @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

  sub1: Subscription;

  currentCategoryId = 1;
  currentCategory: CategoryModel;
  message: MassageModel;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.onCategoryChange();
    this.message = new MassageModel('success', '');
  }

  onCategoryChange() {
    this.currentCategory = this.categories
      .find(c => c.id === +this.currentCategoryId);
  }

  onSubmit(form: NgForm) {
    let {capacity, name} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }

    const category = new CategoryModel(name, capacity, +this.currentCategoryId);

    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: CategoryModel) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category edited successful';
        window.setTimeout(() => this.message.text = '', 5000);
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
