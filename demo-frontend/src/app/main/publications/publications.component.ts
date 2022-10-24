import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, fromEvent, Observable, Observer } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { AnyPageFilter, AnyField, SortFilter } from 'src/app/model/rest/filter';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PublicationsDatasource } from 'src/app/model/datasource/publications.datasource';
import { Publication } from 'src/app/model/publication';
import { PublicationService } from 'src/app/services/publication.service';


@Component({
  //selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit, AfterViewInit {
  dataSource: PublicationsDatasource;
  displayedColumns = [
    'select',
    'title',
    'content',
    'createDate',
    'userLogin'
  ];
  fields = ['title', 'content', 'createDate', 'userLogin'];

  selection = new SelectionModel<Publication>(true, []);
  error = false;

  @ViewChild('edit') editTemplate: any;
  highlightedRow: Publication;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private publicationService: PublicationService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog
  ) {}


  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPublicationsPage();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.selection.clear();
    });

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadPublicationsPage();
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.dataSource = new PublicationsDatasource(this.publicationService);
    const pageFilter = new AnyPageFilter(
      '',
      this.fields.map((field) => new AnyField(field)),
      0,
      20,
      'title'
    );
    this.dataSource.getPublications(pageFilter);
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.publicationsSubject.value.length;
      return numSelected === numRows;
    }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.publicationsSubject.value.forEach((row) =>
          this.selection.select(row)
        );
  } 

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: this.translate.instant('delete-element-confirmation'),
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete();
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

  delete() {
    const publication = this.selection.selected[0];
    this.selection.deselect(publication);
    if (this.selection.selected && this.selection.selected.length === 0) {
      this.publicationService.deletePublication(publication.id).subscribe((response) => {
        console.log(response)
        if (response.responseCode !== 'OK') {
           this.error = true;
         } else {
          this.loadPublicationsPage();
         }
      });
    } else {
      this.publicationService.deletePublication(publication.id).subscribe((response) => {
        console.log(response);
        if (response.responseCode !== 'OK') {
           this.error = true;
        }
        this.delete();
      });
    }
  }

  onAdd() {
    this.router.navigate(['/publications/add']);
  }

  onEdit(row: Publication) {
    this.highlightedRow = row;
    this.router.navigate(['/publications/edit/' + row.id]);
  }

}
