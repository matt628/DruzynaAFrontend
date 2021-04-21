import { Component, Input, OnInit } from '@angular/core';
import { Queue } from 'src/app/objects/queueInterface';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseGamesService } from 'src/app/services/database-games.service';

@Component({
  selector: 'app-queuelist',
  templateUrl: './queuelist.component.html',
  styleUrls: ['./queuelist.component.css']
})
export class QueuelistComponent implements OnInit {

  constructor(private database: DatabaseGamesService, private auth: AuthService) { }
  queueList: Queue[];
  @Input() gameId;
  ngOnInit(): void {
    this.queueList = this.getQueueByGameId();
  }

  getQueueByGameId() {
    return this.database.getQueueByGameId(this.gameId);
  }

  
  isUserAdmin() {
    return this.auth.isAdmin()
  }

}
