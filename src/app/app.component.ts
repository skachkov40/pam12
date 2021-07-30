import { Component, OnInit, OnDestroy} from '@angular/core';
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

    title = 'Биозона';
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
      private router: Router,
      private dataS: DataService
      ) {
        
       }

    msgClick(){
      this.router.navigate(['msg']);
    }

    onResize(event:any) {
      event.target.innerWidth;
      this.width = (window.screen.width) + "px";
      this.height = (window.screen.height) + "px";
          console.log(this.height);
          console.log(this.width);
    }

    Log(){
      this.opened = false;
      if (this.id =="1") {
        this.id="0";
        this.name = "";
        this.btnname = "Авторизация";
        this.msgName = "";
        sessionStorage.clear();
        this.dataS.clearData();
        this.subscription.unsubscribe();
        this.router.navigate(['lenta']);
      } else {
        this.router.navigate(['enter']);
      }
    }

    btnMenu(){
      if (this.opened == true) {this.opened = false;
    } else {this.opened = true;}
    }

    btnMenuClose(){
      this.opened = false;
    }

    ngOnInit(){
      this.name = (sessionStorage.getItem('name'));
      this.id = (sessionStorage.getItem('id'));
      this.log = (sessionStorage.getItem('log'));
      if (this.id == "1") {
        this.btnname = "Выход";
        this.msgName = "Сообщения";
      }     
      //this.width = (window.screen.width) + "px";
      //this.height = (window.screen.height) + "px";
      this.subscription = this.dataS.getData().subscribe(message => {
        this.dann = message;
        console.log(message);
        for (var key in this.dann) {
          this.data.push(this.dann[key]);
          this.name = (this.data[2]);
          this.log = (this.data[1]);
          this.id = (this.data[0]);}
          if (this.id == "1") this.btnname = "Выход";        
      }); 
        
    }

    ngOnDestroy(): void {
      sessionStorage.clear();
      //this.dataS.clearData();
      //this.subscription.unsubscribe();
      //this.id="0";
      //this.name = "";
      //this.btnname = "Авторизация";
      //this.msgName = "";
      
      
    }

  }

