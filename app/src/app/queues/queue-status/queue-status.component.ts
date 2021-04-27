import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/objects/queueInterface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-queue-status',
  templateUrl: './queue-status.component.html',
  styleUrls: ['./queue-status.component.css']
})
export class QueueStatusComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Input() queue: Queue;
  URL = 'https://botompetitionarena.herokuapp.com/queue-status';
  status: Observable<Object>;
  
  remaining;
  progress;

  ngOnInit(): void {
    this.progress = this.getQueueStatus().pipe(map(({percentage, remaining}) => percentage));
    this.remaining = this.getQueueStatus().pipe(map(({percentage, remaining}) => this.getFormattedTime(remaining)))
  }


  getQueueStatus() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    // const Url = this.URL + this.queue.ID + '/status';
    // return this.http.get<{percentage: string}>(Url, httpOptions);
    return of(this.getValue());
  }

  getValue() {
    return {status: "running", percentage: Math.floor(Math.random()*100), remaining: Math.floor(Math.random()*500000)};
  }

  private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

  getFormattedTime(sec: number) {
    const seconds = sec % 60
    const mins = Math.floor(sec/60)
    const minutes = mins % 60
    const hours = Math.floor(mins/60)
    return hours + 'h:' + minutes + "m:" + seconds + "s"
  }

}
