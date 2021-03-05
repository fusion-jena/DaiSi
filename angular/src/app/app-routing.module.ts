import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GfbioComponent} from './gfbio/gfbio.component';

const routes: Routes = [
  { path: '', component: GfbioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
