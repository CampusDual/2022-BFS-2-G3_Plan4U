import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyPublicationsComponent } from "./my-publications.component";

const routes: Routes = [
  {
    path: '',
    component: MyPublicationsComponent,
    children: [
      { path: "", component: MyPublicationsComponent }
      // { path: 'add', component: EditPublicationComponent },
      // { path: 'addpublicationuser', component: EditPublicationUserComponent },
      // { path: 'edit/:id', component: EditPublicationComponent },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyPublicationsRoutingModule {}