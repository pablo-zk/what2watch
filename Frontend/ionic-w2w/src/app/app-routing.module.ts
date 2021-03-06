import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'modal-providers',
    loadChildren: () =>
      import('./modal-providers/modal-providers.module').then(
        (m) => m.ModalProvidersPageModule
      ),
  },  {
    path: 'modal-episode',
    loadChildren: () => import('./modal-episode/modal-episode.module').then( m => m.ModalEpisodePageModule)
  },
  {
    path: 'modal-avatar',
    loadChildren: () => import('./modal-avatar/modal-avatar.module').then( m => m.ModalAvatarPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
