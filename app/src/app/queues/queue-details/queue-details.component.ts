import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Queue } from 'src/app/objects/queueInterface';
import { DatabaseQueueService, parseStatus } from '../../services/database-queue.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueueStatusComponent } from '../queue-status/queue-status.component';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css'],
})
export class QueueDetailsComponent implements OnInit {
  queueID: string;
  queue: Observable<Queue>;
  name: Observable<string>;
  deadlineString: Observable<string>
  canEnroll: Observable<boolean>;
  canStart: Observable<boolean>;
  isFinished: Observable<boolean>;
  showStatus: Observable<boolean>;
  queueStatus: Observable<any>;
  status: Observable<string>
  URL = 'https://botcompetitionarena.herokuapp.com/'
  placement: any;
  results: Observable<any[]>;

  @ViewChild(QueueStatusComponent)
  queueStatusComponent: QueueStatusComponent;
  

  constructor(private route: ActivatedRoute, private queueDb: DatabaseQueueService, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.queueID = this.route.snapshot.url[1].path
    this.loadQueueParams()

    // this.getLogsByQueueId(this.queueID)

  }

  loadQueueParams() {
    this.queue = this.queueDb.getQueue(this.queueID)
    
    this.queue.subscribe(q => {
      let date = new Date();
      this.canEnroll = of(stringifyDeadline(q.deadline) >= date)
      // this.canStart = of(q.lastStatus == null)
      this.canStart = of(true)
      this.showStatus = of(q.lastStatus != null)
      this.deadlineString = of(deadLineToReadable(q.deadline))
      this.status = of(getStringStatus(q))
    })
    this.queueDb.getQueueStatus(this.queueID).subscribe(s => {
      let parsed = parseStatus(s);
      if (parsed != null) {
        this.queueStatus = of(parseStatus(s));
        this.isFinished = of(parseStatus(s).status == 'finished')
        this.tryPrintResults()
      } else {
        this.queueStatus = null
        this.isFinished = null
      }
    })
    this.getLogsByQueueId(this.queueID)
    this.getBotPlacementByQueueId(this.queueID)


    
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  startQueue() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };
     const Url = this.URL +'run-queue/' + this.queueID;
     this.http.get(Url, httpOptions).subscribe(r => r);
     let to = setTimeout(() => {
      this.refresh()
      this.queueStatusComponent.refresh()
    }, 1000);
  }

  getLogsByQueueId(queueID) {
    // return this.queueDb.getQueueLogs(queueID).subscribe((response) => {
    //   console.log(response);
    //   this.logs = response;
    // })
  }

  getBotPlacementByQueueId(queueId) {
    // console.log("Sending a request to get bot placement")
    // return this.queueDb.getBotsPlacementByQueueId(queueId).subscribe((response) => {
    //   console.log("Queue placement:" + response)
    //   this.placement = response;
    // })
  }
  getQueueStatus() {
    return this.queueStatus
  }

  refresh() {
    this.loadQueueParams()
  }

  tryPrintResults() {
    this.queueStatus.subscribe(s => {
      if (s.status == 'finished') {
        this.results = of(s.results)
      } else {
        this.results = of([])
      }
    })
  }
  
  botLogLink(){
    return "https://botcompetitionarena.herokuapp.com/queue-log/" + this.queueID
  }

}
function stringifyDeadline(deadline: number[]): any {
  let date = new Date()
  date.setFullYear(deadline[0])
  date.setMonth(deadline[1])
  date.setDate(deadline[2])
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}

function deadLineToReadable(deadline: number[]): any {
  let dateReadable = ''
  dateReadable += deadline[2] + " " + getMonth(deadline[1]) + " " + deadline[0]

  return dateReadable
} 

function getMonth(monthNumber) {
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNumberCountedFrom0 = monthNumber - 1
  return months[monthNumberCountedFrom0]    
}

function getStringStatus(q: Queue): any {
  let stat = ''
  if (q.lastStatus == null) {
    if (stringifyDeadline(q.deadline) >= new Date()) {
      stat = "Opened for enrollment"
    } else {
      stat = "Closed for enrollment. Awaits running"
    }
  } else if (q.lastStatus[0] != '[') {
    stat = "Running"
  } else {
    stat = "Finished"
  }
  return stat

 
}



