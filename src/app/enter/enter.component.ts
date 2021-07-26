import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import { Autent } from '../classes/autent';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  hide:boolean = true; 
  username: string = "";
  password: string = "";
  otvet: string = "";
  id:string ="";
  autent:Autent[] = [];

    
  constructor(
    private aut:AutService,
    private router:Router,
    private data:DataService
    ) { }

  clickOk(username:string, password:string){

    const formData : FormData = new FormData();
      formData.append('n', username);
      formData.append('p', password);
      this.aut.pass(formData).subscribe((data?:any) => {
        this.autent=data["Autent"];
        if (this.autent[0]?.name1 == "1") {
          this.data.sendData(this.autent[0]?.name1,this.autent[0]?.name6, this.autent[0]?.name2);
          this.router.navigate(['main']);
        } else {
        alert('Отсутствует активация');
        }
    });
  }

  clickNo () {
    this.router.navigate(['free']);
  }

  ngOnInit(){

  }
  
}
