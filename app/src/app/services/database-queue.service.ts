import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseQueueService {
  getEmptyQueue(): any {
    return of({ID: '-1', parentGameID: 1, name: 'empty', 'deadline': ''})
  }
  getQueue(arg0: string): any {
    return of("");
  }

  constructor() { }
}
