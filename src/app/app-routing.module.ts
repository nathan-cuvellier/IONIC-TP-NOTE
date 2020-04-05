import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'liste', pathMatch: 'full' },
  {
    path: 'liste',
    loadChildren: () => import('./recette/liste/liste.module').then( m => m.ListePageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./recette/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'editer/:id',
    loadChildren: () => import('./recette/editer/editer.module').then( m => m.EditerPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
