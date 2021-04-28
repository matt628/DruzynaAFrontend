import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListComponent } from './gamelist/list/list.component';
import { ListItemComponent } from './gamelist/list-item/list-item.component';
import { PageNotFoundComponent } from './utils/page-not-found/page-not-found.component';
import { MainPageComponent } from './utils/main-page/main-page.component';
import { GameDetailsComponent } from './gamelist/game-details/game-details.component'
import { BotDetailsComponent } from './botlist/bot-details/bot-details.component';
import { BotsComponent } from './botlist/bots/bots.component';
import { BotsItemComponent} from './botlist/bots-item/bots-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BotuploadComponent } from './botlist/botupload/botupload.component';
import { NewGameComponent } from './games/new-game/new-game.component';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadComponent } from './upload/file-upload/file-upload.component';
import { ProgressComponent } from './upload/progress/progress.component';
import { StartGameComponent } from './games/start-game/start-game.component';
import { QueuelistComponent } from './queues/queuelist/queuelist.component';
import { QueueitemComponent } from './queues/queueitem/queueitem.component';
import { GameDetailsEditComponent } from './games/game-details-edit/game-details-edit.component';
import { QueueDetailsComponent } from './queues/queue-details/queue-details.component';
import { QueueStatusComponent } from './queues/queue-status/queue-status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginPageComponent } from './login/login-page/login-page.component'; 


const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {path: 'main', component: MainPageComponent},
  {path: 'game/:id', component: GameDetailsComponent},
  {path: 'game-edit/:id', component: GameDetailsEditComponent},
  {path: 'queue/:id', component: QueueDetailsComponent},
  {path: 'games-list', component: ListComponent},
  {path: 'bot/:id', component: BotDetailsComponent},
  {path: 'bots-list', component: BotsComponent}, //To fix after adding context to bot list
  {path: 'add-game', component: NewGameComponent},
  {path: 'add-bot', component: BotuploadComponent},
  {path: 'start-game/:id', component: StartGameComponent},
  {path: 'queue/:id', component: QueueDetailsComponent},
  {path: 'queuestatus', component: QueueStatusComponent},
  {path: 'login', component: LoginPageComponent},
  {path: '**', component: PageNotFoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListComponent,
    ListItemComponent,
    PageNotFoundComponent,
    MainPageComponent,
    GameDetailsComponent,
    BotDetailsComponent,
    BotsComponent,
    BotsItemComponent,
    FileUploadComponent,
    ProgressComponent,
    NewGameComponent,
    BotuploadComponent,
    StartGameComponent,
    QueuelistComponent,
    QueueitemComponent,
    GameDetailsEditComponent,
    QueueDetailsComponent,
    QueueStatusComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    RouterTestingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [   
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
