import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { config, pipe } from 'rxjs';
import { UploadGameService } from '../../services/upload-game.service';
import { ActivatedRoute, Router } from '@angular/router';


export function uploadProgress<T>(cb: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css'],

})
export class NewGameComponent implements OnInit {
  progress = 0;
  gameInput:String;
  botsPath:String;
  configPath:String;
  gameRelativePath:String;
  resultsPaht:String;
  uploadGame: FormGroup;
  success = false;
  file: File | null;

  constructor(public fb: FormBuilder, private http: HttpClient, private uploadService: UploadGameService, private router: Router) {
    this.uploadGame = this.createEmptyGame();

  }
  ngOnInit(): void {
  }

  createEmptyGame() {
    return new FormGroup({
      name: new FormControl(null, Validators.required),
      version: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      CONTROLLER_RELATIVE_PATH: new FormControl(null, Validators.required),
      CONFIG_RELATIVE_PATH: new FormControl(null, Validators.required),
      GAME_RELATIVE_PATH: new FormControl(null, Validators.required),
      RESULTS_RELATIVE_PATH: new FormControl(null, Validators.required),
      payload: new FormControl(null, [Validators.required, requiredFileType('zip')]),
      RUN_COMMAND: new FormControl(null, Validators.required)
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file)

    this.uploadGame.patchValue({
      payload: file
    });
    this.uploadGame.get('payload').updateValueAndValidity()
    console.log(this.uploadGame.get('payload'))
  }

  submit() {
    console.log("UPLOADING GAME")
    console.log(this.uploadGame)
    this.uploadService.upload(toFormData(this.uploadGame))
    // .subscribe((event: HttpEvent<any>) => {
    //   switch (event.type) {
    //     case HttpEventType.Sent:
    //       console.log('Request has been made!');
    //       break;
    //     case HttpEventType.ResponseHeader:
    //       console.log('Response header has been received!');
    //       break;
    //     case HttpEventType.UploadProgress:
    //       this.progress = Math.round(event.loaded / event.total * 100);
    //       console.log(`Uploaded! ${this.progress}%`);
    //       break;
    //     case HttpEventType.Response:
    //       console.log('Game successfully created!', event.body);
    //       alert("Game successfully added!")
    //       this.router.navigate(['/games-list'])

    //       setTimeout(() => {
    //         this.progress = 0;
    //       }, 1500);

    //   }
    // })
    this.uploadGame = this.createEmptyGame();
    
  }

  hasError( field: string, error: string ) {
    const control = this.uploadGame.get(field);
    return control.dirty && control.hasError(error);
  }

  autocomplete() {
    if (this.gameInput === null) {
      return;
    }
    console.log(this.gameInput)
    this.botsPath = `${this.gameInput}/bots` 
    this.configPath = `${this.gameInput}/config.py`
    this.gameRelativePath = `${this.gameInput}/`
    this.resultsPaht = `${this.gameInput}/results`
  }
}


export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>( formValue: FormGroup ) {
  const formData = new FormData();
  console.log(formValue.value)

  for ( const key of Object.keys(formValue.value) ) {
    console.log(key)
    const value = formValue.value[key];
    formData.append(key, value);
  }

  console.log("Form Data" + formData)
  return formData;
}

export function requiredFileType(type: string): import("@angular/forms").ValidatorFn {
  return function (control: FormControl) {
    const file = control.value;
    // if (file) {
    //   const extension = file.name.split('.')[1].toLowerCase();
    //   if (type.toLowerCase() !== extension.toLowerCase()) {
    //     return {
    //       requiredFileType: true
    //     };
    //   }

    //   return null;
    // }
    return null;
  };


  

}

