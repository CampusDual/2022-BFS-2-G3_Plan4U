import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPublicationUserComponent } from '../publications/edit-publication-user/edit-publication-user.component';
import { MainHomeLayoutComponent } from './main-home-layout.component';
import { MainHomeComponent } from './main-home.component';


const routes: Routes = [
    {
      path: '',
      component: MainHomeLayoutComponent,
      children: [
        { path: "", component: MainHomeComponent },
        { path: 'addpublicationuser', component: EditPublicationUserComponent },
      ],
    },
  ];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
export class PublicationsRoutingModule {}