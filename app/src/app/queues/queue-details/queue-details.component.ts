import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.component.html',
  styleUrls: ['./queue-details.component.css']
})
export class QueueDetailsComponent implements OnInit {
  queueID: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.queueID = this.route.snapshot.url[1].path
  }
}
