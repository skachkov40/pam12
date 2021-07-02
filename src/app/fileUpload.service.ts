import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //headers = new HttpHeaders().set('Content-Type', 'application/json');

constructor (private http:HttpClient) { }

postFile (formData: FormData) {
    return this.http?.post('http://10.1.0.128/receive.php', formData, {
      //headers: new HttpHeaders()
      //.set('Content-Type','multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2));'),
      //reportProgress: true,
      //observe: 'events'
      //responseType: 'text'
    });
      
}
}
