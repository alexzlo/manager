import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {CategoryModel} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.post('categories', category);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.get('categories');
  }
}
