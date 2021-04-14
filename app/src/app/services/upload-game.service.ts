import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadGameService {

  SERVER_URL: string = "https://botcompetitionarena.herokuapp.com/upload-game";
  constructor(private httpClient: HttpClient) { }

  public upload(formData) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,

      observe: 'events'

    });

  }

}
