import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { PublicationsComponent } from './publications.component';
import { PublicationsLayoutComponent } from './publications-layout.component';
import { PublicationsRoutingModule } from './publications-routing.module';
import { EditPublicationComponent } from './edit-publication/edit-publication.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule,} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { EditPublicationUserComponent } from './edit-publication-user/edit-publication-user.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicationsRoutingModule,
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
        PublicationsComponent,
        PublicationsComponent,
        PublicationsLayoutComponent,
        EditPublicationComponent,
        EditPublicationUserComponent
    ]
})
export class PublicationsModule {}