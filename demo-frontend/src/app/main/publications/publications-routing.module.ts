import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPublicationUserComponent } from './edit-publication-user/edit-publication-user.component';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { PublicationsLayoutComponent } from './publications-layout.component';
import { PublicationsComponent } from './publications.component';

const routes: Routes = [
    {
      path: '',
      component: PublicationsLayoutComponent,
      children: [
        { path: "", component: PublicationsComponent },
        { path: 'add', component: EditPublicationComponent },
        { path: 'addpublicationuser', component: EditPublicationUserComponent },
        { path: 'editmypublications/:id', component: EditPublicationUserComponent },
        { path: 'edit/:id', component: EditPublicationComponent },
      ],
    },
  ];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
export class PublicationsRoutingModule {}