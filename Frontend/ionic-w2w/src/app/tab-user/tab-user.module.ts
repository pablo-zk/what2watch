import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabUserPageRoutingModule } from './tab-user-routing.module';

import { TabUserPage } from './tab-user.page';
import { ListsModule } from '../lists/lists.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabUserPageRoutingModule,
    ListsModule,
  ],
  declarations: [TabUserPage],
})
export class TabUserPageModule {}
