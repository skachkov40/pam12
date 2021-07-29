import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from "@angular/platform-browser"

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  mass = [1,2,3,4];
  interv:any;

  constructor(private meta: Meta) { }

  ngOnInit() {
    //this.interv = setInterval (()=> {alert("Таймер!");}, 5000);   
        this.meta.updateTag({name: "title", content: "Лента газеты"})
        this.meta.updateTag({name: "description", content: "Рабочий портал компании. Посмотрите последние выпуски нашей газеты"})
        this.meta.updateTag({name: "image", content: "./assets/img/pam_gaz.jpg"})
        this.meta.updateTag({name: "site", content: "https://biozona.ru"})
  }

  ngOnDestroy() {
    //clearInterval(this.interv);

  }

}
