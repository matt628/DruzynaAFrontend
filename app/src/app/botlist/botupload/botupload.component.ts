import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { buffer } from 'rxjs/operators';
import { Bot } from 'src/app/objects/botInterface';
import { DatabaseBotsService } from 'src/app/services/database-bots.service';
import { BotHelpComponent } from '../../static/bot-help/bot-help.component';

@Component({
  selector: 'app-botupload',
  templateUrl: './botupload.component.html',
  styleUrls: ['./botupload.component.css']
})
export class BotuploadComponent implements OnInit {
  
  bot:Bot;
  clearInput = null;

  constructor(private dbService: DatabaseBotsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.bot = this.getEmptyBotObject();
  }

  

  getEmptyBotObject(): Bot {
    var bot: Bot = {
      queueId: this.route.snapshot.url[1].path,
      name: '',
      version: '',
      zip: null,
    };
    return bot;
  }

  addBot() {
    // TODO: check against bad input
    this.dbService.addBotToDatabase(this.bot);
    this.bot = this.getEmptyBotObject();
    this.clearInput.value = ''
  
  }

  onFileSelected(event) {
    this.bot.zip = event.target.files[0];
    this.clearInput = event.target
    
  }

  getRandomId():string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);  }

    showHelp() {
      const dialogRef = this.dialog.open(BotHelpComponent);
    }
}

