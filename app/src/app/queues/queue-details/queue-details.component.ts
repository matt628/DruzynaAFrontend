import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseQueueService } from 'src/app/services/database-queue.service';


@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css']
})
export class QueueDetailsComponent implements OnInit {
  queueID: string;
  logs: any;
  constructor(private route: ActivatedRoute, private queueDb : DatabaseQueueService) { }

  ngOnInit(): void {
    this.queueID = this.route.snapshot.url[1].path
    this.getLogsByQueueId(this.queueID)
  }

  getLogsByQueueId(queueID) {
    return this.queueDb.getQueueLogs(queueID).subscribe((response) => {
      console.log(response);
      this.logs = response;
    })
  }
}
