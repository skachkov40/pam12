import { Component, OnInit, Output,  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  @Output() onChanged = new EventEmitter();

  constructor() { }

  name = ((sessionStorage.getItem('name')) || "");
  id = ((sessionStorage.getItem('id')) || "");
  log = ((sessionStorage.getItem('log')) || "");

  adress:any = "assets/img/nofoto.png";
  text:string = "";

  data!: FileList;
  k!:number;

  compressedImages = [];

  clickNo(inc:any){
    this.onChanged.emit(inc);

  }

  ngOnInit() {
    
  }

  public clickFoto(event:any){
    const width = 300;
    //const height = 300;
    const fileName = event.target.files[0].name;
    const reader = new FileReader();
    
    reader.readAsDataURL(event.target.files[0]);
    console.log(event.target.files[0]);

    reader.onload = ev => {
      const img = new Image();
      img.src = (ev.target as any).result;
      //console.log ((ev.target as any).result);
      //this.adress = (ev.target as any).result;
      img.onload = () => {
        const elem = document.createElement('canvas');
        console.log ("old size:",img.width, "x", img.height);
        if (img.width>800){
        this.k = img.width/800;} else {this.k = 1;}
        console.log(this.k);
        elem.width = img.width/this.k;
        elem.height = img.height/this.k;
        //let heigth = parseInt(img.height * scaleFactor);
        const ctx = <CanvasRenderingContext2D>elem.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width/this.k, img.height/this.k);
        console.log ("new size:", img.width/this.k, "x", img.height/this.k);
        ctx.canvas.toBlob((blob:any) => {    
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          })
          //console.log(blob);
          console.log(file);
          let reader2 = new FileReader();
          reader2.readAsDataURL(file);
          reader2.onload = evnew => {
          this.adress = (evnew?.target as any).result;
          }
          
        },
        'image/jpeg',
        1,
        );
      },  
      reader.onerror = error => {console.log(error);};
    };
  }

}
