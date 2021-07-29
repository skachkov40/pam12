import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MsggetService } from '../services/msgget.service';
import { MsgList } from '../classes/msgList';
import { MsgRead } from '../classes/msgRead';
import { Adresat } from '../classes/adresat';
import { Write } from '../classes/write';
import { Theme } from '../classes/theme';
import { Komu } from '../classes/komu';
import { Forsel } from '../classes/forsel';
import { Send } from '../classes/send';
import { FileUploadService } from '../services/fileUpload.service';
import { FileLoadService } from '../services/fileLoad.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { Data } from '../classes/data';
import { Title } from "@angular/platform-browser"

@Component({
  selector: 'app-msglist',
  templateUrl: './msglist.component.html',
  styleUrls: ['./msglist.component.css']
})
export class MsglistComponent implements OnInit {

  params:any;
  data:Data[]=[];
  data1:any = "0";
  data2:any = "0";
  paramsSubscribe:any;

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  showIn:boolean = true;
  list:boolean = false;
  listview:any = {'z-index':'11'};
  cardread:any = {'z-index':'9'};
  cardwrite:any = {'z-index':'9'};

  writemsg:boolean = false;
  color:boolean = true;
  color2:boolean = false;
  color3:boolean = false;
  writemsgId:string = "0"
  letr:string = "НОВОЕ";
  msg: MsgList[] = [];
  read: MsgRead[] = [];
  srv: MsgRead[] = [];
  msg2: MsgList[] = [];
  msg_u:MsgList[] = [];
  read_u:MsgRead[] = [];
  read2:MsgRead[] = [];
  srv_u:MsgRead[] = [];
  srv2: MsgRead[] = [];
  adresat:Adresat[] = [];
  write:Write[] = [];
  theme:Theme[] = [];
  komu:Komu[] = [];
  forsel1:Forsel[] = [];
  forsel2:Forsel[] = [];
  send:Send[] = [];
  selectedRowIndex:any;
  q:number = 0;
  w:number = 0;
  maxl:number = 0;
  maxq:number = 100;
  maxs:string = "0";
  thiss:string = "0";
  card1active:any;
  writeactive:any;
  adritem:string="Укажите Адресат";
  thmitem:string="";
  komitem:string="";
  amsg_id:string="0";
  amsg_list:string="0000";
  amsg_kod:string="000";
  pidsel1:string="0";
  pidsel2:string="0";
  id_theme:string="0";
  id_komu:string="0";
  id_str_videl:string="0"
  id_str_jirfont:string="0"
  message_id:string="0"
  textarea:string="";
  formData:any = new FormData();
  index_files = new Array;
  totalsize:number = 0;
  pos:number = 0;
  pos2:number = 50;
  pos3:number = 100;
  otvet:any;
  id_msg:any = "";
  l1_0:string = "00040000";
  l1_1:string = "00040001"
  l3:string = "00010";
  l2:string = "00010";
  nowData:string = "20211231 23:59:59.999";

  dthema:boolean = true;
  dkomu:boolean = true;

  constructor(
    private title: Title,
    private getmsg:MsggetService,
    private fileUploadService:FileUploadService,
    
    private route: ActivatedRoute,
    private router: Router
    ) { }

  clickInBox(){
    this.amsg_id="0";
    this.selectedRowIndex = "0";
    this.message_id="0";
    this.msg_u = this.msg;
    this.listview = {'z-index':'11'};
    this.cardread = {'z-index':'9'};
    this.cardwrite = {'z-index':'9'};
    this.color = true;
    this.color2 = false;
    this.color3 = false;

  }
  clickOutBox(){
    this.amsg_id="0";
    this.listview = {'z-index':'11'};
    this.cardread = {'z-index':'9'};
    this.cardwrite = {'z-index':'9'};
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
    this.writeactive = {'z-index':'9'};
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
    this.textarea = "";
    this.formData = new FormData;
    this.index_files = new Array;
    this.writemsg = true;
    this.writeactive = {'z-index':'11'};
    this.card1active = {'z-index':'9'}
    this.color = false;
    this.color2 = false;
    this.color3 = true;
    var l1=(this.amsg_id.length.toString().padStart(4,"0"))+this.amsg_id;
    var l2=(this.writemsgId.length.toString().padStart(4,"0"))+this.writemsgId;
    var newparam = l1+l2;
    const formData : FormData=new FormData();
      formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700353");
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
    this.amsg_kod=(this.write[0]?.name3);
    var l1 = (this.write[0]?.name9);
    this.maxl=parseInt(l1, 10);
    this.maxs=(this.write[0]?.name10);
    this.thiss=(this.write[0]?.name11);
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
    var l2=(this.writemsgId.length.toString().padStart(4,"0"))+this.writemsgId;
    var newparam = l1+l2;
    const formData : FormData=new FormData();
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700353");
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
    var l4=(this.id_str_videl.length.toString().padStart(4,"0"))+this.id_str_videl;
    var l5=(this.id_str_jirfont.length.toString().padStart(4,"0"))+this.id_str_jirfont;
    var newparam = l1+this.l3+l4+l5;
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700356");
    this.getmsg.getMessages(formData).subscribe((data:any)=>this.theme=data["MsgList"]);
  }

  ThemeClick(thm:any){
    this.thmitem = thm.name2;
    this.pidsel1 = thm.name1;
    const formData : FormData = new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.pidsel1.length.toString().padStart(4,"0"))+this.pidsel1;
    var newparam = l1+l2;
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700358");
    this.getmsg.getMessages(formData).subscribe((data:any)=>{
    this.forsel1=data["Service"];
    var mask0=(this.forsel1[0]?.name2).substring(0,1);
    var mask1=(this.forsel1[0]?.name2).substring(1,2);
    if (mask0 == "1") {this.dthema = false;} else {this.dthema = true;}
    if (mask1 == "1" || mask1 == "2") {this.dkomu = false;} else {this.dkomu = true;}
    if (this.forsel1[0]?.name3 != "0") {
      this.id_theme=(this.forsel1[0]?.name3);
      this.thmitem=(this.forsel1[0]?.name4);
    }
    if (mask1 == "2") {
      this.id_komu = "0";
      this.komitem = "";
    } else {
      if (this.forsel1[0]?.name5 != "0")
      {
        this.id_komu=(this.forsel1[0]?.name5)
        this.komitem=(this.forsel1[0]?.name6)
      }
    }

    });
  }

  KomuSrvClick(){
    const formData:FormData=new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l3=(this.id_theme.length.toString().padStart(4,"0"))+this.id_theme;
    var l4=(this.id_str_videl.length.toString().padStart(4,"0"))+this.id_str_videl;
    var l5=(this.id_str_jirfont.length.toString().padStart(4,"0"))+this.id_str_jirfont;
    var newparam=l1+l3+l4+l5;
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700357");
    this.getmsg.getMessages(formData).subscribe((data:any)=>this.komu=data["MsgList"]);
  }

  KomuClick(kom:any){
    this.pidsel2 = kom.name1;
    const formData:FormData=new FormData();
    var l1=(this.amsg_kod.length.toString().padStart(4,"0"))+this.amsg_kod;
    var l2=(this.pidsel2.length.toString().padStart(4,"0"))+this.pidsel2;
    var newparam=l1+l2;
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700359");
    this.getmsg.getMessages(formData).subscribe((data:any)=>{
      this.forsel2=data["Service"];
      var mask0=(this.forsel2[0]?.name2).substring(0,1);
      var mask1=(this.forsel2[0]?.name2).substring(1,2);
      if (mask0 == "1") {this.dthema = false;} else {this.dthema = true;}
      if (mask1 == "1") {this.dkomu = false;} else {this.dkomu = true;}
      if (this.forsel2[0]?.name3 != "0") {
        this.id_theme=(this.forsel2[0]?.name3);
        this.thmitem=(this.forsel2[0]?.name4);
      }
      if (this.forsel2[0]?.name5 != "0")
      {
        this.id_komu=(this.forsel2[0]?.name5);
        this.komitem=(this.forsel2[0]?.name6);
      }

    });
  }

  

  Send(){
    this.writeactive = {'z-index':'9'};
    this.card1active = {'z-index':'9'};
    const formData : FormData = new FormData();
    var l1 = (this.amsg_kod.length.toString().padStart(4, "0"))+this.amsg_kod;
    var l3 = (this.id_komu.length.toString().padStart(4, "0"))+this.id_komu;
    var l4 = (this.message_id.length.toString().padStart(4, "0"))+this.message_id;
    var l5 = (this.id_theme.length.toString().padStart(4, "0"))+this.id_theme;
    var l6 = (this.textarea.length.toString().padStart(4, "0"))+this.textarea;
    var newparam = l1+l3+l4+l5+l6;
    formData.append('ss', this.data2);
      formData.append('par', newparam);
      formData.append('kp', "7700354");
    this.getmsg.getMessages(formData).subscribe((data?:any) =>{
      this.send=data["Service"];
      this.id_msg=(this.send[0]?.name2);
      for (let i in this.index_files){
        this.formData.set('data', this.formData.get(this.index_files[i]));
        this.formData.set('last', this.formData.get(this.index_files[i]+50));
        this.formData.append('idmsg', this.id_msg);
        this.fileUploadService.postFile(this.formData).subscribe((resp?:any)=>this.otvet=resp);
       }
      
      });

}
  AddFiles(event:any){
    const file:File = event.target.files[0];
    this.formData.append(this.pos, file, file.name);
    this.index_files.push(this.pos);
    this.formData.append(this.pos2, file.lastModified.toString());
    this.formData.append(this.pos3, this.id_msg);
    this.pos++;
    this.pos2++;
    this.pos3++;
    //console.log(this.index_files);
    //console.log("цикл this.pos = ", this.pos);
    this.totalsize = 0;
    for (let i in this.index_files){ // считаем размер файлов
      console.log("i = ",i);
      let sizefiles1 = this.formData.get(i);
      this.totalsize = this.totalsize + sizefiles1.size;
          }
    //console.log("конец цикла this.pos");
    //console.log(this.index_files);
  }

  DelF(i:number){
    //console.log(i);
    this.index_files.splice(i,1);
    //console.log(this.index_files);
    //let sizefiles = this.formData.values();
    //console.log(sizefiles);
  }

  Otpr(){
    //console.log("Переворачиваем");
    for (let i in this.index_files){
      //console.log(this.index_files[i]);
      //console.log(this.formData.get(this.index_files[i]));
      //console.log(this.formData.get(this.index_files[i]+50));
      this.formData.set('data', this.formData.get(this.index_files[i]));
      this.formData.set('last', this.formData.get(this.index_files[i]+50));
      this.formData.set('idmsg', this.formData.get(this.index_files[i]+100));
      //console.log(this.index_files[i], '=>' ,ii);
      //console.log(this.formData.get('data'));
      //console.log(this.formData.get('last'));
      this.fileUploadService.postFile(this.formData).subscribe((resp?:any)=>this.otvet=resp);
    }
    //console.log("Новый список");
    //for (let i=0; i<ii; i++){
      //console.log("i = ",i);
      //console.log(this.formData2.get(i));
      //console.log(this.formData2.get(i+50));
   // }
    //new Response(this.formData).text().then(console.log);
    
  }

  ngOnInit():void {
    this.title.setTitle("Сервис сообщений");
    this.paramsSubscribe = this.route.queryParams.subscribe(params => {
      this.params = params;
      for (var key in this.params) {
        this.data.push(this.params[key]);
      }
      this.data1 = this.data[0];
      this.data2 = this.data[1];
      if (this.data1 == "0" || this.data[0] == undefined) {
        this.router.navigate(['enter']);
        this.data1 = "0";
        this.data2 = "0";
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
    
    });
    
  }

  ngOnChanges() {
    console.log("OnChanges!!!!!!!")
  }
  ngOnDestroy() {
    console.log("ОнДестрой!!!!!!!");
    this.data1 = "0";
    this.data2 = "0";
    let navigationExtras: NavigationExtras = {
      queryParams: {
          d1: "0",
          d2: "0"
      }};
    this.paramsSubscribe.unsubscribe();
    //this.router.navigate(['msg'], navigationExtras);
  }
}

