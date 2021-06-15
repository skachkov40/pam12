import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Виртуальная клиника';
    showDiv:any = false;

    ngOnInit(){

    }

    clickMsg(){

      if (this.showDiv == false){
        this.showDiv = true;
      } else {
        this.showDiv = false;
      }
      
    }
}

