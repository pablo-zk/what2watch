import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'tab-user',
        loadChildren: () =>
          import('../tab-user/tab-user.module').then(
            (m) => m.TabUserPageModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'tab-user/list/:id',
        loadChildren: () =>
          import('../list-detail/list-detail.module').then(
            (m) => m.ListDetailPageModule
          ),
      },
      {
        path: 'tab-user/list/:id/edit',
        loadChildren: () =>
          import('../list-edit/list-edit.module').then(
            (m) => m.ListEditPageModule
          ),
      },
      {
        path: 'tab-user/lists/new',
        loadChildren: () =>
          import('../list-add/list-add.module').then(
            (m) => m.ListAddPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'movie/:id',
    loadChildren: () =>
      import('../movie-details/movie-details.module').then(
        (m) => m.MovieDetailsPageModule
      ),
  },
  {
    path: 'tv/:id',
    loadChildren: () =>
      import('../tv-details/tv-details.module').then(
        (m) => m.TvDetailsPageModule
      ),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
