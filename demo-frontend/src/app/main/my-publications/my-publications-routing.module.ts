import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditPublicationUserComponent } from "../publications/edit-publication-user/edit-publication-user.component";
import { EditMyPublicationsComponent } from "./edit-my-publications/edit-my-publications.component";
import { MyPublicationsComponent } from "./my-publications.component";

const routes: Routes = [
  {
    path: '',
    component: MyPublicationsComponent,
    children: [
      { path: "", component: MyPublicationsComponent },
      { path: 'editmypublications/:id', component: EditPublicationUserComponent },
      { path: 'edit/:id', component: EditMyPublicationsComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyPublicationsRoutingModule {}