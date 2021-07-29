import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from './services/data.service';
import { Data } from './classes/data';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    width: any;
    height: any;

    title = 'Виртуальная клиника';
    subscription: any;
    showDiv:any = true;
    opened:boolean = true;
    btnname:string = "Авторизация";
    msgName:string = "";
    id:any = "0";
    data:Data[]=[];
    name:any="";
    key:any="";
    dann:any;

    constructor(
      private router: Router,
      private dataS: DataService
      ) {
        
       }

    msgClick(){
      let navigationExtras: NavigationExtras = {
        queryParams: {
            d1: this.data[0],
            d2: this.data[1]
        }
      }
      this.router.navigate(['msg'], navigationExtras);
    }

    onResize(event:any) {
      event.target.innerWidth;
      this.width = (window.screen.width) + "px";
      this.height = (window.screen.height) + "px";
          console.log(this.height);
          console.log(this.width);
    }

    Log(){
      if (this.id =="1") {
        this.id="0";
        this.name = "";
        this.btnname = "Авторизация";
        this.msgName = "";
        this.dataS.clearData();
        this.subscription.unsubscribe();
        this.router.navigate(['free']);
      } else {
        this.router.navigate(['enter']);
      }
    }


    ngOnInit(){
      this.width = (window.screen.width) + "px";
      this.height = (window.screen.height) + "px";
      this.subscription = this.dataS.getData().subscribe(message => {
        this.dann = message;
        //console.log(message);
        for (var key in this.dann) {
          this.data.push(this.dann[key]);
          this.name = (this.data[2]);
          this.key = (this.data[1]);
          this.id = (this.data[0]);
        }
        if (this.id == "1") {
          this.btnname = "Выход";
          this.msgName = "Сообщения";
        }       
      }); 
    }

    ngOnDestroy(): void {
      this.dataS.clearData();
      this.subscription.unsubscribe();
      this.id="0";
      this.name = "";
      this.btnname = "Авторизация";
      this.msgName = "";
      
      
    }

  }

