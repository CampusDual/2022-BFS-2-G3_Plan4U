import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { AuthGuard } from '../auth/auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { UsersComponent } from './users/users.component';
import { PublicationsComponent } from './publications/publications.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainHomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['CONTACTS'],
    },
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard],
    data: {
      allowedRoles: ['CONTACTS'],
    },
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
      data: {
      allowedRoles: ['USERS'],
    },
  },
  {
    path: 'publications',
    component: PublicationsComponent,
    canActivate: [AuthGuard],
      data: {
      allowedRoles: ['PUBLICATIONS'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
