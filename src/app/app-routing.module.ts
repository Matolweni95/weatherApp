import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForcastComponent } from './forcast/forcast.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent },
  {path: 'forcast', component: ForcastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
