import { Component, OnInit } from '@angular/core';
import { MsggetService } from '../msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';
import { Write } from '../classes/write';
import { Theme } from '../classes/theme';


@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  showCard:boolean = true;
  showCard2:boolean = false;
  showIn:boolean = true;
  showOut:boolean = false;
  color:boolean = true;
  color2:boolean = false;
  color3:boolean = false;
  writemsg:boolean = false;
  writemsgId:string = "0"
  letr:string = "НОВОГО"
  proc:string = "EXEC MQL_M_MSG_LIST ?";
  param:string = "0004000000025400025400010002120210620 23:59:59.999";
  paramout:string = "0004000100025400025400010002120210620 23:59:59.999";
  proc2:string = "EXEC MQL_M_MSG_DATA ?";
  param2:string = "000400300002540002540003208";
  msg: MsgList[] = [];
  read: MsgRead[] = [];
  srv: MsgRead[] = [];
  msg2: MsgList[] = [];
  read2: MsgRead[] = [];
  srv2: MsgRead[] = [];
  adresat:Adresat[] = [];
  write:Write[] = [];
  theme:Theme[] = [];
  selectedRowIndex:any;
  selectedRowIndex2:any;
  my1:string = "54";
  my2:string = "54";
  q:number = 0;

  adritem:string="Укажите Адресат";
  amsg_kod:string="";
  id_str_videl:string="0"
  id_str_jirfont:string="0"
  dthema:boolean = true;
  dkomu:boolean = true;
    
  constructor(private getmsg:MsggetService) {}

  clickInBox(){
      this.showIn = true;
      this.showOut = false;
      this.writemsg = false;
    
    this.color = true;
    this.color2 = false;
    this.color3 = false;
    
  }

  clickOutBox(){
    
      this.showOut = true;
      this.showIn = false;
      this.writemsg = false;
      //this.showOut=!this.showOut;
      
      this.color = false;
      this.color2 = true;
      this.color3 = false;

    const formData : FormData = new FormData();
    formData.append('param', this.paramout);
    formData.append('proc', this.proc);
    if (this.q == 0) {
      this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.msg2=data["MsgList"];})
      this.q = 1;
  } 
    //console.log(newparam);
  }
  clickRow2(row2:any){
    this.selectedRowIndex2=row2.name1;
    if (this.showCard2 == false){
      this.showCard2 = true;
    }
    var l1 = (row2.name7.length.toString().padStart(4, "0"))+row2.name7;
    var l2 = (this.my1.length.toString().padStart(4, "0"))+this.my1; 
    var l3 = (this.my2.length.toString().padStart(4, "0"))+this.my2; 
    var l4 = (row2.name1.length.toString().padStart(4, "0"))+row2.name1; 
    var newparam = l1+l2+l3+l4; 
    const formData : FormData = new FormData();
    formData.append('param', newparam);
    formData.append('proc', this.proc2);
    this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.read2=data["MsgList"];     
      this.srv2=data["Service"];
    })
    
  }

  clickRow(row:any){
    this.selectedRowIndex=row.name1;
    if (this.showCard == false){
      this.showCard = true;
    }
    var l1 = (row.name7.length.toString().padStart(4, "0"))+row.name7;
    var l2 = (this.my1.length.toString().padStart(4, "0"))+this.my1; 
    var l3 = (this.my2.length.toString().padStart(4, "0"))+this.my2; 
    var l4 = (row.name1.length.toString().padStart(4, "0"))+row.name1; 
    var newparam = l1+l2+l3+l4; 
    const formData : FormData = new FormData();
    formData.append('param', newparam);
    formData.append('proc', this.proc2);
    this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.read=data["MsgList"];     
      this.srv=data["Service"];
    })
    console.log(newparam);
  }

  GetAll(){

  }

  Write(){
    this.writemsg = true;
    this.showCard = false;
    this.showCard2 = false;
    this.showIn = false;
    this.showOut = false;
    this.color = false;
    this.color2 = false;
    this.color3 = true;
    //Получаем список Адресатов
      const formData : FormData = new FormData();
      var l1 = (this.my1.length.toString().padStart(4, "0"))+this.my1; 
      var l2 = (this.my2.length.toString().padStart(4, "0"))+this.my2;
      var newparam = l1+l2;
      formData.append('param', newparam);
      formData.append('proc', "EXEC MQL_M_PAR_LOAD ?");
      this.getmsg.getMessages(formData).subscribe((data:any) => this.adresat=data["MsgList"]);
      
  }
  AdresatClick(adr:any){
    
    this.writemsgId = "0";
    this.adritem = adr.name2;
    this.amsg_kod = adr.name3;
    //запрос на получение служебных данных окна написания сообщения
    var l1 = (adr.name1.length.toString().padStart(4, "0"))+adr.name1;
    var l2 = (this.my2.length.toString().padStart(4, "0"))+this.my2;
    var l3 = (this.writemsgId.length.toString().padStart(4, "0"))+this.writemsgId;
    var newparam = l1+l2+l3; 
    const formData : FormData = new FormData();
    formData.append('param', newparam);
    formData.append('proc', "EXEC MQP_M_MSG_GETPAR ?");
    this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.write=data["Service"];    
    if (this.write[0].name4 == "11") {
      this.dthema = false;  this.dkomu = false;
    }
    if (this.write[0].name4 == "10") {
      this.dthema = false;  this.dkomu = true;
    }
    if (this.write[0].name4 == "01") {
      this.dthema = true;  this.dkomu = false;
    }
    if (this.write[0].name4 == "00") {
      this.dthema = true;  this.dkomu = true;
    }
    });

}

  ThemeClick(){
    const formData : FormData = new FormData();
    var l1 = (this.amsg_kod.length.toString().padStart(4, "0"))+this.amsg_kod;
    var l2 = (this.my2.length.toString().padStart(4, "0"))+this.my2;
    var l3 = "00010";
    var l4 = (this.id_str_videl.length.toString().padStart(4, "0"))+this.id_str_videl;
    var l5 = (this.id_str_jirfont.length.toString().padStart(4, "0"))+this.id_str_jirfont;
    var newparam = l1+l2+l3+l4+l5; 
    formData.append('param', newparam);
    formData.append('proc', "EXEC MQL_M_MSG_FORSEL_01");
    this.getmsg.getMessages(formData).subscribe((data:any) => this.theme=data["MsgList"]);
}


  Send(){

  }

  ngOnInit():void {
      const formData : FormData = new FormData();
      formData.append('param', this.param);
      formData.append('proc', this.proc);
      this.getmsg.getMessages(formData).subscribe((data:any) => this.msg=data["MsgList"]);
  }

}

