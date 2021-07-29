import { Component, OnInit, Input } from '@angular/core';
import { MsgRead } from '../../classes/msgRead';
import { FileLoadService } from '../../services/fileLoad.service';

@Component({
  selector: 'app-readmsg',
  templateUrl: './readmsg.component.html',
  styleUrls: ['./readmsg.component.css']
})
export class ReadmsgComponent implements OnInit {

  @Input() read!:MsgRead[];
  @Input() srv!:MsgRead[];

  showCard:boolean = true;
  readmsg:any;

  constructor(
    private fileLoadService:FileLoadService
  ) { }

  ngOnInit() {
    
  }

  clickFile(id_blob:string, pkol:string, name:string, last:string){
    const formData : FormData = new FormData();
    formData.append('id_blob', id_blob);
    formData.append('pkol', pkol);
    formData.append('name', name);
    formData.append('last', last);
      this.fileLoadService.ReadFile(formData).subscribe((response: any) => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
      
      downloadLink.setAttribute('download', name);
      document.body.appendChild(downloadLink);
      downloadLink.click();      
    });
  }

  Cancel(){
    //this.writeactive = {'z-index':'9'};
    //this.readmsg = {'z-index':'9'};
  }


}
