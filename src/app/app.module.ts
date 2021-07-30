import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsglistComponent } from './msglist/msglist.component';
import { MsggetService } from './services/msgget.service';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploadService } from './services/fileUpload.service';
import { FileLoadService } from './services/fileLoad.service';
import { StartComponent } from './start/start.component';
import { EnterComponent } from './enter/enter.component';
import { AutService } from './services/aut.service';
import { ReadmsgComponent } from './msglist/readmsg/readmsg.component';
import { WritemsgComponent } from './msglist/writemsg/writemsg.component';
import { SkladComponent } from './sklad/sklad.component';
import { OtchetComponent } from './otchet/otchet.component';

@NgModule({
  declarations: [					
    AppComponent,
    MsglistComponent,
    StartComponent,
    EnterComponent,
    ReadmsgComponent,
    WritemsgComponent,
    SkladComponent,
    OtchetComponent
   ],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule   
  ],
  providers: [
    AutService,
    MsggetService,
    FileUploadService,
    FileLoadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
