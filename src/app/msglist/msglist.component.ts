import { Component, OnInit } from '@angular/core';
import { MsggetService } from '../services/msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';
import { Router} from '@angular/router';
import { Data } from '../classes/data';
import { Title } from "@angular/platform-browser";
import { DataService } from '../services/data.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  dann:any;

  interv:any;

  data:Data[]=[];
  data1:any = "0";
  data2:any = "0";
  data3:any = "";
  newmessage:any = {'font-weight': 'normal'};
  ev1:any = "";
  ev2:any = "";
  new!:string;

  showIn:boolean = true;
  showOut:boolean = true;
  list:boolean = false;
  write:boolean = false;
  listviewIn:any = {'z-index':'100'};
  listviewOut:any = {'z-index':'90'};
  cardread:any = {'z-index':'50'};
  cardwrite:any = {'z-index':'1'};

  color:boolean = true;
  color2:boolean = false;
  color3:boolean = false;

  adresat:Adresat[] = [];

  msg: MsgList[] = [];
  read: MsgRead[] = [];
  srv: MsgRead[] = [];
  msg2: MsgList[] = [];
  msg_u:MsgList[] = [];
  read_u:MsgRead[] = [];
  read2:MsgRead[] = [];
  srv_u:MsgRead[] = [];
  srv2: MsgRead[] = [];

  q:number = 0;
  w:number = 0;
  selectedRowIndexIn:any;
  selectedRowIndexOut:any;
  amsg_kod:string="000";
  amsg_id:string="0";
  message_id:string="0"
  amsg_list:string="0000";
  letr:string = "НОВОЕ";
  writemsgId:string = "0";

  l1_0:string = "00040000";
  l1_1:string = "00040001"
  l3:string = "00010";
  l2:string = "00010";
  nowData:string = "20211231 23:59:59.999";



  constructor(
    private title: Title,
    private getmsg:MsggetService,
    private router: Router,
    private dataS:DataService,
    ) { }

    

  clickInBox(){
    this.amsg_id="0";
    //this.selectedRowIndex = "0";    
    this.message_id="0";
    //this.msg_u = this.msg;
    this.listviewIn = {'z-index':'100'};
    this.listviewOut = {'z-index':'90'};
    this.cardread = {'z-index':'50'};
    this.cardwrite = {'z-index':'1'};
    this.write = false;
    this.color = true;
    this.color2 = false;
    this.color3 = false;
    this.read_u = this.read;

  }


  clickOutBox(){
    this.amsg_id="0";
    this.listviewIn = {'z-index':'90'};
    this.listviewOut = {'z-index':'100'};
    this.cardread = {'z-index':'50'};
    this.cardwrite = {'z-index':'1'};
    //this.selectedRowIndex = null;
    this.write = false;
    this.color = false;
    this.color2 = true;
    this.color3 = false;
    this.read_u = this.read2;

    if (this.q == 0) {
      const formData : FormData = new FormData();
      var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
          var newparam = this.l1_1+this.l2+this.l3+l4;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700351");
      this.getmsg.getMessages(formData).subscribe((data:any) =>
        {
          this.msg2=data["MsgList"];
          this.msg_u = this.msg2;
          this.q = 1;
        });
    } else {this.msg_u = this.msg2;}



  }

  clickRow(row:any, i:any){
    this.newmessage = ""
    //console.log(row);
    this.write = false;
    this.amsg_id="0";
    this.amsg_list = row.name7;
    this.message_id = row.name1;
    if (this.color == true) {
      this.selectedRowIndexIn=row;
      this.listviewIn = {'z-index':'95'};
      this.listviewOut = {'z-index':'90'};
      this.msg[i].name3 = "0";} else {
      this.selectedRowIndexOut=row;
      this.listviewIn = {'z-index':'90'};
      this.listviewOut = {'z-index':'95'}; 
    }
    
    this.cardread = {'z-index':'100'};
    this.cardwrite = {'z-index':'1'};
    const formData : FormData = new FormData();
    var l1 = (row.name7.length.toString().padStart(4, "0"))+row.name7;
    var l3 = (row.name1.length.toString().padStart(4, "0"))+row.name1;
    var newparam = l1+this.l2+l3;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700360");
    this.getmsg.getMessages(formData).subscribe((data:any) => {
      if (this.color == true){
        this.read=data["MsgList"];
        this.srv=data["Service"];
        this.read_u = this.read;
        this.srv_u = this.srv;
        //console.log("srv_u : 1-", this.srv_u);
      } else {
        this.read2=data["MsgList"];
        this.srv2=data["Service"];
        this.read_u = this.read2;
        this.srv_u = this.srv2;
        //console.log("srv_u : 2-", this.srv_u);
      }
      this.amsg_id = this.srv[0]?.name6;
      this.new = this.srv[0]?.name3;
      //console.log(this.new);
      let new2 = this.new.substring(1, 2);
      //console.log(new2);
      if (new2 == "1") {this.newmessage = {'font-weight': 'bold'}} else {this.newmessage = {'font-weight': 'normal'}};
    });
  }

  GetAll(){
        const formData : FormData = new FormData();
      var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
          var newparam = this.l1_0+this.l2+this.l3+l4;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700351");
      this.getmsg.getMessages(formData).subscribe((data:any) => {
        this.msg=data["MsgList"];
        this.w = 1;
        this.q = 0;
        this.clickInBox();
        
      });
      
  }

  Write(){
    this.write = true;
    this.cardwrite = {'z-index':'100'};
    this.cardread = {'z-index':'1'};
    this.listviewIn = {'z-index':'100'};
    this.listviewOut = {'z-index':'90'}
    
    this.color = false;
    this.color2 = false;
    this.color3 = true;
  }

  ngOnInit() {
    this.listviewIn = {'z-index':'100'};
    this.listviewOut = {'z-index':'90'}
    this.cardread = {'z-index':'50'};
    this.cardwrite = {'z-index':'1'};
    this.title.setTitle("Сообщения");
        this.data2 = (sessionStorage.getItem('log'));
        this.data1 = (sessionStorage.getItem('id'));
        this.data3 = (sessionStorage.getItem('name'));
      if (this.data1 == "0" || this.data1 == undefined) {
        this.router.navigate(['lenta']);
        } else {
          const formData : FormData = new FormData();
          formData.append('ss', this.data2);
          formData.append('kp', "7700350");
          formData.append('par', this.l2);
          this.getmsg.getMessages(formData).subscribe((data:any) => {
            this.adresat=data["MsgList"];
            this.amsg_kod = this.adresat[0]?.name3;
          });
          var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
          var newparam = this.l1_0+this.l2+this.l3+l4;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700351");
          this.getmsg.getMessages(formData).subscribe((data:any) =>{
            this.msg=data["MsgList"];
            this.srv2=data["Service"];
            if (this.srv2[0].name3 == "0100") {this.newmessage = {'font-weight': 'bold'}} else {this.newmessage = {'font-weight': 'normal'}};
            this.dataS.sendData(this.data1, this.data2, this.data3, this.ev1, this.ev2);
            //this.msg_u = this.msg;
            this.w = 1;
          });
        
      }
      
  
  }

  onBackfromWrite(inc:any): void{
    this.write = false;
    this.cardwrite = {'z-index':'1'};
    this.cardread = {'z-index':'50'};
    this.listviewIn = {'z-index':'100'};
    this.listviewOut = {'z-index':'90'}
    
    this.color = true;
    this.color2 = false;
    this.color3 = false;
    
    
    
  }

  onChanged(inc:any): void{
    this.write = true;
    this.cardwrite = {'z-index':'100'};
    this.cardread = {'z-index':'1'};
    this.listviewIn = {'z-index':'100'};
    this.listviewOut = {'z-index':'90'}
    
    this.color = false;
    this.color2 = false;
    this.color3 = true;
    this.letr = "ОТВЕТНОЕ"
    
    
  }

}

