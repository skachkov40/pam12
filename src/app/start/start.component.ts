import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  mass = [1,2,3,4];
  interv:any;

  constructor() { }

  ngOnInit() {
    //this.interv = setInterval (()=> {alert("Таймер!");}, 5000);   
    
  }

  ngOnDestroy() {
    //clearInterval(this.interv);

  }

}
