import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'Виртуальная клиника';
    showDiv:any = true;
    opened:boolean = true;


    ngOnInit(){

    }

  }

