import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-bot-details',
  templateUrl: './bot-details.component.html',
  styleUrls: ['./bot-details.component.css']
})
export class BotDetailsComponent implements OnInit {
  id: Observable<String>;

  constructor(private route: ActivatedRoute) {
    this.id = this.route.paramMap.pipe(
      switchMap((params) => params.get('id')) //todo: gets last id char
    )
        // switchMap() use to change observable type // todo after connection with backend

   }

  ngOnInit(): void {
  }

}
