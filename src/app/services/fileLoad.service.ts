import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileLoadService {

  path:any = "http://10.1.0.128/readfile.php"
//path = "/aut.php"

constructor (private http:HttpClient) { }

ReadFile (formData: FormData) {
    return this.http.post(this.path, formData, { responseType: 'blob' }
      
    );
      
}
}
