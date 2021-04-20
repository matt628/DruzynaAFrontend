import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-queueitem',
  templateUrl: './queueitem.component.html',
  styleUrls: ['./queueitem.component.css']
})
export class QueueitemComponent implements OnInit {
  @Input() queue;

  constructor() { }

  ngOnInit(): void {
  }

}
