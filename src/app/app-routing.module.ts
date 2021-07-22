import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './enter/enter.component';
import { StartComponent } from './start/start.component';
import { MsglistComponent } from './msglist/msglist.component';


const routes: Routes = [
  
  { path: 'free', component: StartComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'msg', component: MsglistComponent},
  //{ path: '', redirectTo: 'free', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'free', pathMatch: 'full' }
  //{ path: 'logon/:text', component: LogonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
