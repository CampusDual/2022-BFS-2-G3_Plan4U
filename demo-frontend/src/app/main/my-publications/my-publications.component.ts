import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from 'src/app/model/category';
import { PublicationsDatasource } from 'src/app/model/datasource/publications.datasource';
import { Province } from 'src/app/model/province';
import { Publication } from 'src/app/model/publication';
import { AnyPageFilter, AnyField, SortFilter } from 'src/app/model/rest/filter';
import { PublicationService } from 'src/app/services/publication.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.scss']
})
export class MyPublicationsComponent implements OnInit {
  publications: Publication[];
  categories: Category[] ;
  provinces: Province[];
  filterPost= '';
  filterPost2='';
  filterUser: string[];

  dataSource: PublicationsDatasource;
  fields = ['title', 'createDate', 'userLogin', 'categoryName', 'provinceName', 'eventDate', 'contact', 'optionalContact'];

  selection = new SelectionModel<Publication>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: Publication;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  
  constructor(
    private authService: AuthService, 
    private publicationService: PublicationService , 
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService
    ) {
  }
  
  ngOnInit () {
    this.publicationService.getPublicationsUsers().subscribe(response => {this.publications = response});
    this.publicationService.getCategories().subscribe(response => {this.categories = response});
    this.publicationService.getProvinces().subscribe(response => {this.provinces = response});
    this.filterUser = this.authService.getUserName();
  }
  
  onAdd() {
    this.router.navigate(['/publications/addpublicationuser']);
  }

  onEdit(publication: Publication) {
    this.router.navigate(['/publications/editmypublications/' + publication.id]);
  }

  loadPublicationsPage() {
    this.selection.clear();
    this.error = false;
    const pageFilter = new AnyPageFilter(
      this.input.nativeElement.value,
      this.fields.map((field) => new AnyField(field)),
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    pageFilter.order = [];
    pageFilter.order.push(
      new SortFilter(this.sort.active, this.sort.direction.toString())
    );
    this.dataSource.getPublications(pageFilter);
  }

  onDelete(publication: Publication) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-element-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(publication);
        return new Observable((observer: Observer<boolean>) =>
          observer.next(true)
        );
      } else {
        return new Observable((observer: Observer<boolean>) =>
          observer.next(false)
        );
      }
    });
  }

  delete(publication: Publication) {
  this.publicationService.deletePublication(publication.id).subscribe((response) => {
    console.log(response);
    if (response.responseCode !== 'OK') {
       this.error = true;
    }
    this.delete(publication);
    this.publicationService.getPublicationsUsers().subscribe(response => {this.publications = response});
  });
}
}