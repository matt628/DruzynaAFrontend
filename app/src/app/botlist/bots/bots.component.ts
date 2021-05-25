import { Component, Input, OnInit } from '@angular/core';
import { DatabaseBotsService } from '../../services/database-bots.service';
import { Bot } from '../../objects/botInterface';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.css']
})
export class BotsComponent implements OnInit {

  constructor(private dbService: DatabaseBotsService) { }
  @Input() queueId;
  botList: Observable<Bot[]>;
  ngOnInit(): void {
    this.dbService.getBotList(this.queueId).subscribe(r => {
      this.botList  = of(r.bots.map(b => b.bot))
    })
  } 


}
