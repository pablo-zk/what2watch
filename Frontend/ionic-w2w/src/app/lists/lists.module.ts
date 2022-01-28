import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAddPage } from '../list-add/list-add.page';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListEditPage } from '../list-edit/list-edit.page';
import { ListDetailPage } from '../list-detail/list-detail.page';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ListDetailPageModule } from '../list-detail/list-detail.module';
import { ListEditPageModule } from '../list-edit/list-edit.module';
import { ListAddPageModule } from '../list-add/list-add.module';

@NgModule({
  declarations: [ListItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ListEditPageModule,
    ListDetailPageModule,
    ListAddPageModule,
  ],
  exports: [ListItemComponent],
})
export class ListsModule {}
