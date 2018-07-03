import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../share/share.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './containers/profile.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserInfoEditComponent } from './components/user-info-edit/user-info-edit.component';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, ShareModule],
  declarations: [ProfileComponent, UserInfoComponent, UserInfoEditComponent],
  entryComponents: [UserInfoEditComponent]
})
export class ProfileModule {}
