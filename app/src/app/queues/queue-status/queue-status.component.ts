import { Component, Input, OnInit, Output } from '@angular/core';
import { QueueStatus } from 'src/app/objects/queueInterface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { DatabaseQueueService, parseStatus } from '../../services/database-queue.service';

@Component({
  selector: 'app-queue-status',
  templateUrl: './queue-status.component.html',
  styleUrls: ['./queue-status.component.css']
})
export class QueueStatusComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private queueService: DatabaseQueueService) { }
  @Input() queue: Observable<QueueStatus>;
  @Output() refreshEvent = new EventEmitter();
  isFinished: Observable<boolean>;
  queueId;
  logs: Observable<string[]>
  URL = 'https://botcompetitionarena.herokuapp.com/queues/status/';
  status: Observable<Object>;
  
  remaining;
  progress: Observable<string>;

  ngOnInit(): void {
    this.logs = of([])
    this.queueId = this.route.snapshot.url[1].path
    if (this.queue != null) {
      this.queue.subscribe(q => {
        this.status = of(q)
        this.isFinished = of(q.status == 'finished')
        this.progress = of(q.progress)
        console.log(q)
      })
    }
    
  }


  getValue() {
    return {status: "running", percentage: Math.floor(Math.random()*100), remaining: Math.floor(Math.random()*500000)};
  }

  refresh() {
    this.queueService.getQueueStatus(this.queueId).subscribe((st) => {
      let parsed = parseStatus(st)
      if (parsed != null) {
        this.isFinished = of(parseStatus(st).status == 'finished')
        this.progress = of(parseStatus(st).progress)
      }
    })
    // this.remaining = this.getQueueStatus().pipe(map(({percentage, remaining}) => this.getFormattedTime(remaining)))
    this.logs.subscribe(l => {
      this.queueService.getQueueStatus(this.queueId).subscribe(s => {
        if (s == '') {
          l.push('loading...')
        } else {
          if (s[0] != '[') {
          l.push(s)
          }
        }
      })
      })
    this.refreshEvent.emit()
  }

  getFormattedTime(sec: number) {
    const seconds = sec % 60
    const mins = Math.floor(sec/60)
    const minutes = mins % 60
    const hours = Math.floor(mins/60)
    return hours + 'h:' + minutes + "m:" + seconds + "s"
  }


  clear() {
    this.logs = of([])
  }

}
