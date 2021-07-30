import { Component, OnInit, Input } from '@angular/core';
import { MsggetService } from '../services/msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';
import { Router} from '@angular/router';
import { Data } from '../classes/data';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  dann:any;

  data:Data[]=[];
  data1:any = "0";
  data2:any = "0";

  showIn:boolean = true;
  list:boolean = false;
  listview:any = {'z-index':'11'};
  cardread:any = {'z-index':'8'};
  cardwrite:any = {'z-index':'9'};

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
  selectedRowIndex:any;
  amsg_kod:string="000";
  amsg_id:string="0";
  message_id:string="0"
  amsg_list:string="0000";

  l1_0:string = "00040000";
  l1_1:string = "00040001"
  l3:string = "00010";
  l2:string = "00010";
  nowData:string = "20211231 23:59:59.999";



  constructor(
    private title: Title,
    private getmsg:MsggetService,
    private router: Router
    ) { }

  clickInBox(){
    this.amsg_id="0";
    this.selectedRowIndex = "0";
    this.message_id="0";
    this.msg_u = this.msg;
    this.listview = {'z-index':'11'};
    this.cardread = {'z-index':'9'};
    this.cardwrite = {'z-index':'8'};
    this.color = true;
    this.color2 = false;
    this.color3 = false;

  }
  clickOutBox(){
    this.amsg_id="0";
    this.listview = {'z-index':'11'};
    this.cardread = {'z-index':'9'};
    this.cardwrite = {'z-index':'8'};
    this.selectedRowIndex = null;
    this.color = false;
    this.color2 = true;
    this.color3 = false;

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

  clickRow(row:any){
    this.amsg_id="0";
    this.amsg_list = row.name7;
    this.message_id = row.name1;
    this.selectedRowIndex=row.name1;
    this.cardread = {'z-index':'11'};
    this.listview = {'z-index':'9'};
    this.cardwrite = {'z-index':'8'};
    const formData : FormData = new FormData();
    var l1 = (row.name7.length.toString().padStart(4, "0"))+row.name7;
    var l3 = (row.name1.length.toString().padStart(4, "0"))+row.name1;
    var newparam = l1+this.l2+l3;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700360");
    this.getmsg.getMessages(formData).subscribe((data:any) => {
      this.read=data["MsgList"];
      this.srv=data["Service"];
      this.amsg_id = this.srv[0]?.name6;
    });
  }

  GetAll(){
    if (this.color == true) {
      const formData : FormData = new FormData();
      var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
          var newparam = this.l1_0+this.l2+this.l3+l4;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700351");
      this.getmsg.getMessages(formData).subscribe((data:any) => {
        this.msg=data["MsgList"];
        this.w = 1;
      });
    }
    if (this.color2 == true) {
      const formData : FormData = new FormData();
      var l4 = (this.nowData.length.toString().padStart(4, "0"))+this.nowData;
          var newparam = this.l1_1+this.l2+this.l3+l4;
          formData.append('ss', this.data2);
          formData.append('par', newparam);
          formData.append('kp', "7700351");
      this.getmsg.getMessages(formData).subscribe((data:any) => {
        this.msg2=data["MsgList"];
        this.q = 1;
      });
      }
  }

  Write(){
    this.cardwrite = {'z-index':'11'};
    this.cardread = {'z-index':'9'}
    this.color = false;
    this.color2 = false;
    this.color3 = true;
  }

  ngOnInit() {
    this.title.setTitle("Сообщения");
        this.data2 = (sessionStorage.getItem('log'));
        this.data1 = (sessionStorage.getItem('id'));
      if (this.data1 == "0" || this.data1 == undefined) {
        console.log ("goto lenta");
        this.router.navigate(['lenta']);
        } else {
          console.log(this.data1);
          console.log(this.data2);
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
            this.msg_u = this.msg;
            this.w = 1;
          });
      }
  }

}

