import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/objects/queueInterface';
import { DatabaseGamesService } from 'src/app/services/database-games.service';

@Component({
  selector: 'app-queuelist',
  templateUrl: './queuelist.component.html',
  styleUrls: ['./queuelist.component.css']
})
export class QueuelistComponent implements OnInit {

  constructor(private database: DatabaseGamesService) { }
  queueList: [Queue];
  @Input() gameId;
  ngOnInit(): void {
    this.getQueueByGameId();
  }

  getQueueByGameId() {
    this.database.getQueueByGameId(this.gameId);
  }

}
