import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MsggetService {

  path:any = "http://10.1.0.128/get.php"
//path = "/aut.php"

  constructor(private http:HttpClient) {}


getMessages (formData: FormData){
  return this.http.post(this.path, formData)

  
  
    
  
  
}

}