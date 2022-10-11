import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserLayoutComponent } from './user-layout.component';





const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: "", component: UsersComponent },
      { path: 'add', component: EditUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {


 }
