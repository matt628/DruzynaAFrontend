import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { pipe } from 'rxjs';


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
export class NewGameComponent implements OnInit{
  progress = 0;

  uploadGame = new FormGroup({
    name: new FormControl(null, Validators.required),
    version: new FormControl(null, Validators.required),
    payload: new FormControl(null, [Validators.required, requiredFileType('zip')])
  });
  success = false;

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
  }

  submit() {
    this.success = false;
    if ( !this.uploadGame.valid ) {
      markAllAsDirty(this.uploadGame);
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    this.http.post('https://botcompetitionarena.herokuapp.com/upload-game', toFormData(this.uploadGame.value), httpOptions).pipe(
      uploadProgress(progress => (this.progress = progress)),
      toResponseBody()
    ).subscribe(res => {
      this.progress = 0;
      this.success = true;
      this.uploadGame.reset();
    });
  }

  hasError( field: string, error: string ) {
    const control = this.uploadGame.get(field);
    return control.dirty && control.hasError(error);
  }
}

export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}

export function requiredFileType(type: string): import("@angular/forms").ValidatorFn {
  return function (control: FormControl) {
    const file = control.value;
    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();
      if (type.toLowerCase() !== extension.toLowerCase()) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }
    return null;
  };
}

