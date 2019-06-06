import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {EventModel} from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.post('events', event);
  }
}
