import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutService {
  
constructor (private http:HttpClient) { }

pass (formData: FormData) {
    return this.http.post('http://10.1.0.128/aut.php', formData);
      
}

}
