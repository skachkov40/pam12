import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MsggetService {

  constructor(private http:HttpClient) {}


getMessages (formData: FormData){
  return this.http.post('http://10.1.0.128/getmsg.php', formData)

  
  
    
  
  
}

}