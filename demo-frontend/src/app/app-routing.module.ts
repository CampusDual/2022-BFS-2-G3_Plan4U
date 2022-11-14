import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UsersComponent } from './main/users/users.component';
import { LandingComponent } from './auth/landing/landing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,  pathMatch: 'full'},
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'contacts', loadChildren: () => import('./main/contacts/contacts.module').then(x => x.ContactsModule) },
  { path: 'users', loadChildren: () => import('./main/users/users.module').then(x => x.UsersModule) },
  { path: 'publications', loadChildren: () => import('./main/publications/publications.module').then(x => x.PublicationsModule) },
  { path: 'my-publications', loadChildren: () => import('./main/my-publications/my-publications.module').then(x => x.MyPublicationsModule) },
  { path: 'landing', component: LandingComponent,  pathMatch: 'full'},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
