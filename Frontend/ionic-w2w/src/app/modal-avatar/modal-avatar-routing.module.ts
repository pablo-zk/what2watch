import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalAvatarPage } from './modal-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalAvatarPageRoutingModule {}
