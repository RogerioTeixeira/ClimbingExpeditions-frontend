import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareModule} from '../share/share.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './containers/profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ShareModule
  ],
  declarations: [ProfileComponent, UserInfoComponent]
})
export class ProfileModule { }
