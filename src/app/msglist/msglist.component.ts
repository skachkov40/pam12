import { Component, OnInit } from '@angular/core';
import { MsggetService } from '../msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';

@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  showCard:boolean = false;
  showCard2:boolean = true;
  showIn:boolean = false;
  showOut:boolean = false;
  color:boolean = true;
  color2:boolean = false;
  writemsg:boolean=true;
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
  selectedRowIndex:any;
  selectedRowIndex2:any;
  my1:string = "54";
  my2:string = "54";
  q:number = 0;
  adritem:any;
  
  
  
  

  constructor(private getmsg:MsggetService) {}

  clickInBox(){
    if (this.showIn == false){
      this.showIn = true;
      this.showOut = false;
    }
    this.color = true;
    this.color2 = false;
    
    
  }

  clickOutBox(){
    
    if (this.showOut == false){
      this.showOut = true;
      this.showIn = false;
      //this.showOut=!this.showOut;
    }
    this.color = false;
    this.color2 = true;

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
    console.log(newparam);
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
    //запрос на получение данных окна
    const formData : FormData = new FormData();
      formData.append('param', "00025400025400010");
      formData.append('proc', "EXEC MQP_M_MSG_GETPAR ?");
      this.getmsg.getMessages(formData).subscribe((data:any) => this.write=data["SrvList"]);

      formData.append('param', "000254000254");
      formData.append('proc', "EXEC MQL_M_PAR_LOAD ?");
      this.getmsg.getMessages(formData).subscribe((data:any) => this.adresat=data["MsgList"]);
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

