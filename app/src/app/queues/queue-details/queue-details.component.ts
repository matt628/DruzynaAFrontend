import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Queue } from 'src/app/objects/queueInterface';
import { DatabaseQueueService } from '../../services/database-queue.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css']
})
export class QueueDetailsComponent implements OnInit {
  queueID: string;
  queue: Observable<Queue>;
  name: Observable<string>;
  deadline: Observable<string>;
  URL = 'https://botompetitionarena.herokuapp.com/'
  

  constructor(private route: ActivatedRoute, private queueService: DatabaseQueueService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.queueID = this.route.snapshot.url[1].path
    this.queue = this.queueService.getQueue(this.queueID)
    this.queue.subscribe(q => {
      this.name = of(q.name)
      this.deadline = of(q.deadline)
    })
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  canStart() {
    return true; //TODO depending on status
  }

  startQueue() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
     const Url = this.URL +'/run-queue/' + this.queueID;
     this.http.get(Url, httpOptions);
  }
}
