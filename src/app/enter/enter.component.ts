import { Component, OnInit } from '@angular/core';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import { Autent } from '../classes/autent';


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

    
  constructor(private aut:AutService, private router: Router) { }

  clickOk(username:string, password:string){

    const formData : FormData = new FormData();
      formData.append('n', username);
      formData.append('p', password);
      this.aut.pass(formData).subscribe((data?:any) => {
        this.autent=data["Autent"];
        //this.id = ?.[0]...
        if (this.autent[0]?.name1 == "1") {
          console.log(this.autent[0]?.name4);
          this.id = this.autent[0]?.name4;
          this.router.navigate(['msg', this.id]);
        } else {
        console.log('Отсутствует активация');
        }
    });
  }

  clickNo () {
    this.router.navigate(['/free', { id: this.id }]);
  }

  ngOnInit(){

  }
  
}
