import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/objects/queueInterface';

@Component({
  selector: 'app-queueitem',
  templateUrl: './queueitem.component.html',
  styleUrls: ['./queueitem.component.css']
})
export class QueueitemComponent implements OnInit {
  @Input() queue: Queue;
  canStart: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  getMonth(monthNumber) {
    const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNumberCountedFrom0 = monthNumber - 1
    return months[monthNumberCountedFrom0]    
  }


}
