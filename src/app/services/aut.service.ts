import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutService {
  
  path:any = "http://10.1.0.128/aut.php"
//path = "/aut.php"

  
constructor (private http:HttpClient) { }


pass (formData: FormData) {
    return this.http.post(this.path, formData);
      
}

}
