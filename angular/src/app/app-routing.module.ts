import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GfbioComponent} from './gfbio/gfbio.component';
//import {BioDivComponent} from './bio-div/bio-div.component';

const routes: Routes = [
  { path: '', component: GfbioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
