import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { EditPublicationUserComponent } from '../publications/edit-publication-user/edit-publication-user.component';
import { EditPublicationComponent } from '../publications/edit-publication/edit-publication.component';
import { PublicationsLayoutComponent } from '../publications/publications-layout.component';
import { PublicationsRoutingModule } from '../publications/publications-routing.module';
import { PublicationsComponent } from '../publications/publications.component';
import { MyPublicationsRoutingModule } from './my-publications-routing.module';
import { EditMyPublicationsComponent } from './edit-my-publications/edit-my-publications.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyPublicationsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    TranslateModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatMomentDateModule
    ],
  declarations: [
    // PublicationsComponent,
    // PublicationsComponent,
    // PublicationsLayoutComponent,
    // EditPublicationComponent,
    // EditPublicationUserComponent
  
    EditMyPublicationsComponent
  ]
})
export class MyPublicationsModule { }
