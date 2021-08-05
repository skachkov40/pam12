import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MsggetService } from '../../services/msgget.service';
import { FileUploadService } from '../../services/fileUpload.service';
import { Adresat } from '../../classes/adresat';
import { Write } from '../../classes/write';
import { Theme } from '../../classes/theme';
import { Komu } from '../../classes/komu';
import { Forsel } from '../../classes/forsel';
import { Send } from '../../classes/send';

@Component({
  selector: 'app-writemsg',
  templateUrl: './writemsg.component.html',
  styleUrls: ['./writemsg.component.css']
})
export class WritemsgComponent implements OnInit {

  @Input() message_id!:string;
  @Input() amsg_id!:string;
  @Input() adresat!:Adresat[];
  @Input() letr!:string;
  @Input() writemsgId!:string;
  @Output() onChanged = new EventEmitter();

  data2:any = "0";

  write:Write[] = [];
  theme:Theme[] = [];
  komu:Komu[] = [];
  forsel1:Forsel[] = [];
  forsel2:Forsel[] = [];
  send:Send[] = [];

  q:number = 0;

  maxl:number = 0;
  maxq:number = 100;
  maxs:string = "0";
  thiss:string = "0";
  
  

  adritem:string="Укажите Адресат";
  thmitem:string="";
  komitem:string="";

  amsg_kod:string="000";
  pidsel1:string="0";
  pidsel2:string="0";
  id_theme:string="0";
  id_komu:string="0";
  id_str_videl:string="0"
  id_str_jirfont:string="0"

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
    private getmsg:MsggetService,
    private fileUploadService:FileUploadService,
  ) { }

  Answer(inc:any){
    

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

  Send(inc:any){
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
       this.textarea = "";
       this.onChanged.emit(inc);
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

  ngOnInit(){
    //console.log(this.message_id);
    //console.log(this.amsg_id);
    this.data2 = (sessionStorage.getItem('log'));
    this.textarea = "";
    this.formData = new FormData;
    this.index_files = new Array;

    var l1=(this.amsg_id.length.toString().padStart(4,"0"))+this.amsg_id;
    var l2=(this.message_id.length.toString().padStart(4,"0"))+this.message_id;
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

  ngOnDestroy (){
    if (this.textarea.length > 0){
    window.confirm('Несохраненные данные!');
    }
  }

}

