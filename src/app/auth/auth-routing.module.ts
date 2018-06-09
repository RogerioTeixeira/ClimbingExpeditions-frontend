import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInPageComponent } from './containers/signin-page.component';
import { SignUpPageComponent } from './containers/signup-page.component';


const routes: Routes = [
  { path: 'signin', component: SignInPageComponent },
  { path: 'signup', component: SignUpPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
