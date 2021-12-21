import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GfbioComponent} from './gfbio/gfbio.component';
import { AuthGuard } from './guards/auth.guard';
//import {BioDivComponent} from './bio-div/bio-div.component';

const routes: Routes = [
  // { path: '', component: GfbioComponent, canActivate: [AuthGuard] },
  { path: '', component: GfbioComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
