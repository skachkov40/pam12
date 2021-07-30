import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from "@angular/platform-browser";
import { DataService } from '../services/data.service';
import { Data } from '../classes/data';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  mass = [1,2,3,4];
  interv:any;

  subscription: any;
  showDiv:any = true;
  opened:boolean = false;
  btnname:string = "Авторизация";
  msgName:string = "";
  id:any = "0";
  log:any = "0";
  data:Data[]=[];
  name:any="";
  key:any="";
  dann:any;
   

  constructor(
    private meta: Meta,
    private dataS: DataService) { }

  ngOnInit() {
    //this.interv = setInterval (()=> {alert("Таймер!");}, 5000);
    console.log (this.id); 
    this.meta.updateTag({name: "title", content: "Лента газеты"});
    this.meta.updateTag({name: "description", content: "Рабочий портал компании. Посмотрите последние выпуски нашей газеты"});
    this.meta.updateTag({name: "image", content: "./assets/img/pam_gaz.jpg"});
    this.meta.updateTag({name: "site", content: "https://biozona.ru"});

    
        
        this.id = (sessionStorage.getItem('id'));
        this.log = (sessionStorage.getItem('log'));
        
  }

  ngOnDestroy(): void {
      //this.dataS.clearData();
      //this.subscription.unsubscribe();
  }

}
