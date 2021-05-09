import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Queue, QueueStatus } from '../objects/queueInterface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseQueueService {
  logURL = 'https://botcompetitionarena.herokuapp.com/queue-log/'
  infoURL = 'https://botcompetitionarena.herokuapp.com/queues/'
  statusURL = 'https://botcompetitionarena.herokuapp.com/queues/status/'
  constructor(private http: HttpClient) {


  }

  getEmptyQueue(): any {
    return of({ID: '-1', parentGameID: 1, name: 'empty', 'deadline': ''})
  }
  getQueue(id: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get<Queue>(this.infoURL + id);
  }

  getQueueStatus(id: string) {
    return this.http.get(this.statusURL + id, {responseType: 'text'});
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

export function parseStatus(status) {
  if (status == null) return null;
  if (status == '') return {status: 'loading'}
  if (status[0] == '[') {
    let unbracketed = status.substr(1, status.length - 2)
    let split = unbracketed.split(",")
    split = split.map(elem => elem.trim())
    .map(elem => elem.substring(2))
    .map(elem => elem.trim())
    .map(elem => elem.split(":"))
    Array.prototype.forEach.call(split, elem => {
      elem[1] = elem[1].replace(".","")
    });
    split = split.map(elem => {
      return {place: split.indexOf(elem) + 1, botId: elem[0], points: elem[1]}
    })
    return {status: 'finished', progress: "100", results: split}
  } else {
    let j = status
    j = j.split(":")[1].trim()
    console.log(j)

    let percentage = j[0].split("%")[0]
    return {status: 'running', progress: percentage}
  }
}
