import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseQueueService {
  logURL = 'https://botcompetitionarena.herokuapp.com/queue-log/'
  constructor(private http: HttpClient) {


  }

  getEmptyQueue(): any {
    return of({ID: '-1', parentGameID: 1, name: 'empty', 'deadline': ''})
  }
  getQueue(arg0: string): any {
    return of("");
  }

  getQueueLogs(id: string){
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
   
    return this.http.get<any[]>(this.logURL+id, httpOptions);  }

}
