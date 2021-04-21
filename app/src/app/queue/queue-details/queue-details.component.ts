import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Queue } from 'src/app/objects/queueInterface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatabaseQueueService } from 'src/app/services/database-queue.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css']
})
export class QueueDetailsComponent implements OnInit {
  queue: Observable<Queue>;

  constructor(private route: ActivatedRoute, private http: HttpClient, private queueService: DatabaseQueueService) { }

  ngOnInit(): void {
    this.queue = this.route.paramMap.pipe(switchMap((params) => this.queueService.getQueue(params.get('id'))),
    catchError(err => of(this.queueService.getEmptyQueue())))
  }

}
