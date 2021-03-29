import { Component, OnInit } from '@angular/core';
import { DatabaseBotsService } from '../../services/database-bots.service';
import { Bot } from '../../objects/botInterface';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit {

  constructor(private dbService: DatabaseBotsService) { }
  botList: Bot[];
  ngOnInit(): void {
    this.getBots(""); //some context: user/game/whatever
  } 

  getBots(context) {
    this.botList = this.dbService.getBotList(context);
  }

}
