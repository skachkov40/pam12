import { Component, OnInit, Input} from '@angular/core';
import { MsggetService } from '../services/msgget.service';
import { MsgRead } from '../classes/msgRead';
import { AutService } from '../services/aut.service';
import { Router } from '@angular/router';
import { Autent } from '../classes/autent';
import { DataService } from '../services/data.service';
import { Title } from "@angular/platform-browser";
import { Meta } from "@angular/platform-browser";



@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  //@Input() id!:string;
 

  hide:boolean = true; 
  username: string = "";
  password: string = "";
  otvet: string = "";
  autent:Autent[] = [];
  srv2: MsgRead[] = [];
  
  id:string = "0";
  log:string = "";
  name:string = "";
  ev1:any = "";
  ev2:any = "";

  interv:any;
  l1_0:string = "00040000";
  l1_1:string = "00040001"
  l3:string = "00010";
  l2:string = "00010";
  nowData:string = "20211231 23:59:59.999";
    
  constructor(
    private aut:AutService,
    private router:Router,
    private data:DataService,
    private meta: Meta,
    private getmsg:MsggetService,
    private title: Title
    ) { }

  clickOk(username:string, password:string){

    const formData : FormData = new FormData();
      formData.append('n', username);
      formData.append('p', password);
      this.aut.pass(formData).subscribe((data?:any) => {
        this.autent=data["Autent"];
        if (this.autent[0]?.name1 == "1") {
            var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
            var newparam = this.l3+"0001-";
            const formData : FormData = new FormData();
            formData.append('ss', this.autent[0]?.name6);
            formData.append('par', newparam);
            formData.append('kp', "7700791");
            this.getmsg.getMessages(formData).subscribe((data:any) =>{
              this.srv2=data["Service"];
              if (this.srv2[0].name1 == "1") {this.ev2 = "!"} else {this.ev2 = ""};
              console.log("interval : "+this.srv2[0].name1);
              
          sessionStorage.setItem ('id', this.autent[0]?.name1);
          sessionStorage.setItem ('log', this.autent[0]?.name6);
          sessionStorage.setItem ('name', this.autent[0]?.name2);
          sessionStorage.setItem ('ev1', this.ev1);
          sessionStorage.setItem ('ev2', this.ev2);
          this.data.sendData(this.autent[0]?.name1,this.autent[0]?.name6, this.autent[0]?.name2, this.ev1, this.ev2);
          this.id = this.autent[0]?.name1;
          this.log = this.autent[0]?.name6;
          this.name = this.autent[0]?.name2;
        });
          this.interv = setInterval (()=> {
            var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
            var newparam = this.l3+"0001-";
            const formData : FormData = new FormData();
            formData.append('ss', this.autent[0]?.name6);
            formData.append('par', newparam);
            formData.append('kp', "7700791");
            this.getmsg.getMessages(formData).subscribe((data:any) =>{
              this.srv2=data["Service"];
              if (this.srv2[0].name1 == "1") {this.ev2 = "!"} else {this.ev2 = ""};
              console.log("Цикл : "+this.srv2[0].name1+ " ev2 = "+this.ev2);
              sessionStorage.setItem ('ev2', this.ev2);
              this.data.sendData(this.autent[0]?.name1,this.autent[0]?.name6, this.autent[0]?.name2, this.ev1, this.ev2);
            });
          }, 10000);
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
