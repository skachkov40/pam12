import { Component, OnInit, Input} from '@angular/core';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import { Autent } from '../classes/autent';
import { DataService } from '../services/data.service';
import { Title } from "@angular/platform-browser"
import { Meta } from "@angular/platform-browser"


@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  @Input() id!:string;
 // @Input() log!:string;  

  hide:boolean = true; 
  username: string = "";
  password: string = "";
  otvet: string = "";
  autent:Autent[] = [];
    
  constructor(
    private aut:AutService,
    private router:Router,
    private data:DataService,
    private meta: Meta,
    private title: Title
    ) { }

  clickOk(username:string, password:string){

    const formData : FormData = new FormData();
      formData.append('n', username);
      formData.append('p', password);
      this.aut.pass(formData).subscribe((data?:any) => {
        this.autent=data["Autent"];
        if (this.autent[0]?.name1 == "1") {
          this.data.sendData(this.autent[0]?.name1,this.autent[0]?.name6, this.autent[0]?.name2);
          this.id = this.autent[0]?.name6;
          sessionStorage.setItem ('id', this.autent[0]?.name1);
          sessionStorage.setItem ('log', this.autent[0]?.name6);
          sessionStorage.setItem ('name', this.autent[0]?.name2);
          this.router.navigate(['lenta']);
        } else {
          this.username = "";
          this.password = "";
          window.confirm('Отсутствует активация');
        }
    });
  }

  
    ngOnInit(){
      //console.log(this.id);
      this.title.setTitle("Авторизация");
      this.meta.updateTag({name: "title", content: "Авторизация"});
      this.meta.updateTag({name: "description", content: "Рабочий портал компании. Авторизация"});
      this.meta.updateTag({name: "image", content: "./assets/img/pam_gaz.jpg"});
      this.meta.updateTag({name: "site", content: "https://biozona.ru"});
    }
  
}
