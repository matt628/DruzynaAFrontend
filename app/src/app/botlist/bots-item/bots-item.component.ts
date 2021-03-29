import { Component, Input, OnInit } from '@angular/core';
import { Bot } from 'src/app/objects/botInterface';

@Component({
  selector: 'app-bots-item',
  templateUrl: './bots-item.component.html',
  styleUrls: ['./bots-item.component.css']
})
export class BotsItemComponent implements OnInit {

  constructor() { }
  @Input() bot: Bot;
  ngOnInit(): void {
  }

}
