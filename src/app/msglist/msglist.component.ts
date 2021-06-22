import { Component, OnInit } from '@angular/core';
import { MsggetService } from '../msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';
import { Write } from '../classes/write';
import { Theme } from '../classes/theme';
import { Komu } from '../classes/komu';
import { Forsel } from '../classes/forsel';
import { Send } from '../classes/send';


@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  showIn:boolean = true;
  showCard:boolean = false;
  showOut:boolean = false;
  showCard2:boolean = false;
  writemsg:boolean = false;
  color:boolean = true;
  color2:boolean = false;
  color3:boolean = false;
  writemsgId:string = "0"
  letr:string = "НОВОГО"
  proc:string = "EXEC MQL_M_MSG_LIST ?";
  param:string =    "0004000000025400025400010002120210620 23:59:59.999";
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
  komu:Komu[] = [];
  forsel1:Forsel[] = [];
  forsel2:Forsel[] = [];
  send:Send[] = [];
  selectedRowIndex:any;
  selectedRowIndex2:any;
  my1:string = "54";
  my2:string = "54";
  q:number = 0;
  w:number = 0;
  inactive:any;
  card1active:any;
  outactive:any;
  card2active:any;
  writeactive:any;

  adritem:string="Укажите Адресат";
  thmitem:string="";
  komitem:string="";
  amsg_id:string="0";
  amsg_list:string="0000";
  amsg_kod:string="000";
  pidsel1:string="0";
  id_theme:string="0";
  id_komu:string="0";
  id_str_videl:string="0"
  id_str_jirfont:string="0"
  
  dthema:boolean = true;
  dkomu:boolean = true;
    
  constructor(private getmsg:MsggetService) {}

  clickInBox(){
    this.amsg_id="0";
    this.card1active = {'z-index':'9'}
    this.card2active = {'z-index':'9'}
    this.writeactive = {'z-index':'9'}
    this.showIn = true;  
    this.showOut = false;
    this.selectedRowIndex = null;
    this.color = true;
    this.color2 = false;
    this.color3 = false;
  }
  clickOutBox(){
    this.amsg_id="0";
    this.card1active = {'z-index':'9'}
    this.card2active = {'z-index':'9'}
    this.writeactive = {'z-index':'9'}
    this.showOut = true
    this.showIn = false; 
    this.selectedRowIndex2 = null;
    this.color = false;
    this.color2 = true;
    this.color3 = false;
        
    if (this.q == 0) {
      const formData : FormData = new FormData();
      formData.append('param', this.paramout);
      formData.append('proc', this.proc);
      this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.msg2=data["MsgList"];})
      this.q = 1;
  } 
    //console.log(newparam);
  }
  clickRow2(row2:any){
    this.amsg_id="0";
    this.amsg_list = row2.name7;
    this.selectedRowIndex2=row2.name1;
    this.card2active = {'z-index':'11'}
    this.card1active = {'z-index':'9'}
    this.writeactive = {'z-index':'9'}
    this.showCard2 = true;
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
      this.amsg_id = this.srv2[0]?.name4;
    }) 
  }
  clickRow(row:any){
    this.amsg_id="0";
    this.amsg_list = row.name7;
    console.log (row);
    this.selectedRowIndex=row.name1;
    this.showCard = true;
    this.card1active = {'z-index':'11'}
    this.card2active = {'z-index':'9'}
    this.writeactive = {'z-index':'9'}
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
      this.amsg_id = this.srv[0]?.name4;
    })
  }

  GetAll(){
    if (this.showIn = true) {
      const formData : FormData = new FormData();
      formData.append('param', this.param);
      formData.append('proc', this.proc);
      this.getmsg.getMessages(formData).subscribe((data:any) => {
        this.msg=data["MsgList"];
        this.w = 1; 
      });
    }
    if (this.showOut = true) {
      const formData : FormData = new FormData();
      formData.append('param', this.paramout);
      formData.append('proc', this.proc);
      this.getmsg.getMessages(formData).subscribe((data:any) => {
        this.msg2=data["MsgList"];
        this.q = 1;
      });
      }
  }

  Write(){
    this.writemsg = true;
    this.writeactive = {'z-index':'11'}
    this.card1active = {'z-index':'9'}
    this.card2active = {'z-index':'9'}
    this.color = false;
    this.color2 = false;
    this.color3 = true;
    var l1=(this.amsg_id.length.toString().padStart(4,"0"))+this.amsg_id;
    var l2=(this.my2.length.toString().padStart(4,"0"))+this.my2;
    var l3=(this.writemsgId.length.toString().padStart(4,"0"))+this.writemsgId;
    var newparam = l1+l2+l3; 
    const formData : FormData=new FormData();
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQP_M_MSG_GETPAR ?");
    this.getmsg.getMessages(formData).subscribe((data:any) => {
    this.write=data["Service"]; 
    if(this.write[0]?.name4=="11") {this.dthema = false;  this.dkomu = false;}
    if(this.write[0]?.name4=="10") {this.dthema = false;  this.dkomu = true;}
    if(this.write[0]?.name4=="01") {this.dthema = true;  this.dkomu = false;}
    if(this.write[0]?.name4=="00") {this.dthema = true;  this.dkomu = true;}
    this.thmitem=(this.write[0]?.name6);
    this.komitem=(this.write[0]?.name8);
    this.id_theme=(this.write[0]?.name5);
    this.id_komu=(this.write[0]?.name7);
    console.log(this.write[0]?.name1);
    if (this.write[0]?.name1 != "0")
      {
        this.adritem="Укажите Адресат";
      } else {
        this.adritem=this.write[0]?.name2;
      }
  });
  }

  AdresatClick(adr:any){
    this.writemsgId="0";
    this.amsg_id = adr.name1;
    this.adritem = adr.name2;
    this.amsg_kod = adr.name3;
    var l1=(adr.name1.length.toString().padStart(4,"0"))+adr.name1;
    var l2=(this.my2.length.toString().padStart(4,"0"))+this.my2;
    var l3=(this.writemsgId.length.toString().padStart(4,"0"))+this.writemsgId;
    var newparam = l1+l2+l3; 
    const formData : FormData=new FormData();
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQP_M_MSG_GETPAR ?");
    this.getmsg.getMessages(formData).subscribe((data:any) => {
    this.write=data["Service"]; 
    if(this.write[0]?.name4=="11") {this.dthema = false;  this.dkomu = false;}
    if(this.write[0]?.name4=="10") {this.dthema = false;  this.dkomu = true;}
    if(this.write[0]?.name4=="01") {this.dthema = true;  this.dkomu = false;}
    if(this.write[0]?.name4=="00") {this.dthema = true;  this.dkomu = true;}
    this.thmitem=(this.write[0]?.name6);
    this.komitem=(this.write[0]?.name8);});
  }

  ThemeSrvClick(){
    const formData : FormData = new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.my2.length.toString().padStart(4,"0"))+this.my2;
    var l3="00010";
    var l4=(this.id_str_videl.length.toString().padStart(4,"0"))+this.id_str_videl;
    var l5=(this.id_str_jirfont.length.toString().padStart(4,"0"))+this.id_str_jirfont;
    var newparam = l1+l2+l3+l4+l5; 
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQL_M_MSG_FORSEL_01 ?");
    this.getmsg.getMessages(formData).subscribe((data:any)=>this.theme=data["MsgList"]);
  }

  ThemeClick(thm:any){
    this.thmitem = thm.name2;
    this.pidsel1 = thm.name1;
    const formData : FormData = new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.pidsel1.length.toString().padStart(4,"0"))+this.pidsel1;
    var newparam = l1+l2; 
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQP_M_MSG_FORSEL_01_PAR ?");
    this.getmsg.getMessages(formData).subscribe((data:any)=>{
    this.forsel1=data["Service"]
    this.id_theme=(this.forsel1[0]?.name3);
    this.id_komu=(this.forsel1[0]?.name5);
    this.thmitem=(this.forsel1[0]?.name4);
    this.komitem=(this.forsel1[0]?.name6);
    if(this.forsel1[0]?.name2=="11") {this.dthema = false;  this.dkomu = false;}
    if(this.forsel1[0]?.name2=="10") {this.dthema = false;  this.dkomu = true;}
    if(this.forsel1[0]?.name2=="01") {this.dthema = true;  this.dkomu = false;}
    if(this.forsel1[0]?.name2=="00") {this.dthema = true;  this.dkomu = true;}
    });
  }

  KomuSrvClick(){
    const formData:FormData=new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.my2.length.toString().padStart(4,"0"))+this.my2;
    var l3=(this.id_theme.length.toString().padStart(4,"0"))+this.id_theme;
    var l4=(this.id_str_videl.length.toString().padStart(4,"0"))+this.id_str_videl;
    var l5=(this.id_str_jirfont.length.toString().padStart(4,"0"))+this.id_str_jirfont;
    var newparam=l1+l2+l3+l4+l5; 
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQL_M_MSG_FORSEL_02 ?");
    this.getmsg.getMessages(formData).subscribe((data:any)=>this.komu=data["MsgList"]);
  }

  KomuClick(kom:any){
    const formData:FormData=new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.id_komu.length.toString().padStart(4,"0"))+this.id_komu;
    var newparam=l1+l2;
    formData.append('param',newparam);
    formData.append('proc',"EXEC MQP_M_MSG_FORSEL_02_PAR ?");
    this.getmsg.getMessages(formData).subscribe((data:any)=>{
      this.forsel2=data["Service"];
      if(this.forsel2[0]?.name2=="11") {this.dthema = false;  this.dkomu = false;}
      if(this.forsel2[0]?.name2=="10") {this.dthema = false;  this.dkomu = true;}
      if(this.forsel2[0]?.name2=="01") {this.dthema = true;  this.dkomu = false;}
      if(this.forsel2[0]?.name2=="00") {this.dthema = true;  this.dkomu = true;}
      this.id_theme=(this.forsel2[0]?.name3);
      this.id_komu=(this.forsel2[0]?.name5);
      this.thmitem=(this.forsel2[0]?.name4);
      this.komitem=(this.forsel2[0]?.name6);
    });
  }

  Cancel(){
    //this.writemsg = false;
    //this.showIn = true;
    this.writeactive = {'z-index':'9'};
    this.card1active = {'z-index':'9'};
    this.card2active = {'z-index':'9'};
    if (this.showIn == true) 
    {
      this.color = true;
      this.color3 = false;
    }else{
      this.color2 = true;
      this.color3 = false;
    }
    
  }

  Send(){
    const formData : FormData = new FormData();
    var l1 = (this.amsg_kod.length.toString().padStart(4, "0"))+this.amsg_kod; 
    var l2 = (this.my1.length.toString().padStart(4, "0"))+this.my1;
    var l3 = (this.my2.length.toString().padStart(4, "0"))+this.my2; 
    var l4 = (this.my2.length.toString().padStart(4, "0"))+this.my2;
    var newparam = l1+l2+l3+l4;
    formData.append('param', newparam);
    formData.append('proc', "EXEC MQS_M_MSG_SAVE ?");
    this.getmsg.getMessages(formData).subscribe((data:any) =>{
       this.adresat=data["Service"];
      });
        
}

  ngOnInit():void {
    const formData : FormData = new FormData();
    var l1 = (this.my1.length.toString().padStart(4, "0"))+this.my1; 
    var l2 = (this.my2.length.toString().padStart(4, "0"))+this.my2;
    var newparam = l1+l2;
    formData.append('param', newparam);
    formData.append('proc', "EXEC MQL_M_PAR_LOAD ?");
    this.getmsg.getMessages(formData).subscribe((data:any) => this.adresat=data["MsgList"]);
      formData.append('param', this.param);
      formData.append('proc', this.proc);
      this.getmsg.getMessages(formData).subscribe((data:any) =>{
        this.msg=data["MsgList"];
        this.w = 1;
        this.amsg_kod = this.adresat[0]?.name3;
      });
  }

}

