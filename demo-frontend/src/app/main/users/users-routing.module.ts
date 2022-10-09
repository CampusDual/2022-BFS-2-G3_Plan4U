import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { EditUserComponent } from './edit-user/edit-user.component';




// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule
//   ]
// })

const routes: Routes = [
  {
    path: '',
    //component: UsersLayoutComponent,  revisar esto!!
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
export class UsersRoutingModule { }
