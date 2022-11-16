import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GraphicComponent } from './graphic.component';

const routes: Routes = [
    {
      path: '',
      component: GraphicComponent,
      children: [
        { path: "", component: GraphicComponent },
      ],
    },
  ];
  
  @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
  })
export class GraphicRoutingModule {}