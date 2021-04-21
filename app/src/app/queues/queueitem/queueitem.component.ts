import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/objects/queueInterface';

@Component({
  selector: 'app-queueitem',
  templateUrl: './queueitem.component.html',
  styleUrls: ['./queueitem.component.css']
})
export class QueueitemComponent implements OnInit {
  @Input() queue: Queue;

  constructor() { }

  ngOnInit(): void {
  }

}
