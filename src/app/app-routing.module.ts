import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './enter/enter.component';
import { StartComponent } from './start/start.component';
import { MsglistComponent } from './msglist/msglist.component';
import { SkladComponent } from './sklad/sklad.component';
import { OtchetComponent } from './otchet/otchet.component';



const routes: Routes = [
  
  { path: 'lenta', component: StartComponent },
  { path: 'enter', component: EnterComponent },
  { path: 'msg', component: MsglistComponent},
  { path: 'sklad', component: SkladComponent},
  { path: 'otchet', component: OtchetComponent},
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: 'lenta', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
