import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class DatabaseQueueService {
  logURL = 'https://botcompetitionarena.herokuapp.com/queue-log/'
  constructor(private http: HttpClient) {


  }

  getEmptyQueue(): any {
    throw new Error('Method not implemented.');
  }
  getQueue(arg0: string): any {
    throw new Error('Method not implemented.');
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
