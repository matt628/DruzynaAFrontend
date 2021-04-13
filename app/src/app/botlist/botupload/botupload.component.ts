import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Bot } from 'src/app/objects/botInterface';
import { DatabaseBotsService } from 'src/app/services/database-bots.service';

@Component({
  selector: 'app-botupload',
  templateUrl: './botupload.component.html',
  styleUrls: ['./botupload.component.css']
})
export class BotuploadComponent implements OnInit {
  bot:Bot;
  file: File;

  constructor(private dbService: DatabaseBotsService) { }

  ngOnInit(): void {
    this.bot = this.getEmptyBotObject();
  }

  

  getEmptyBotObject(): Bot {
    var bot: Bot = {
      id: this.getRandomId(),
      name: '',
      version: '',
      team: '',
      games: [],

    };
    return bot;
  }

  addBot() {
    // TODO: check against bad input
    this.dbService.addBotToDatabase(this.bot, this.file);
    this.bot = this.getEmptyBotObject();
    this.file = null
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    
  }

  getRandomId():string {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);  }
}

