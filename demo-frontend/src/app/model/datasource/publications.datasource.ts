import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PublicationService } from 'src/app/services/publication.service';
import { Publication } from '../publication';
import { AnyPageFilter } from '../rest/filter';

export class PublicationsDatasource extends DataSource<Publication> {
    publicationsSubject = new BehaviorSubject<Publication[]>([]);
    loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    public totalElements: number;
  
    constructor(private publicationService: PublicationService) {
      super();
    }
  
    getPublications(pageFilter: AnyPageFilter) {
      this.publicationsSubject.next([]);
      this.loadingSubject.next(true);
      this.publicationService.getPublications(pageFilter).pipe(
        finalize(() => this.loadingSubject.next(false))
      ).subscribe(
        response => {
          this.totalElements = response.totalElements;
          this.publicationsSubject.next(response.data);
        }
      );
    }
  
    connect(): BehaviorSubject<Publication[]> {
      return this.publicationsSubject;
    }
  
    disconnect(): void {
      this.publicationsSubject.complete();
      this.loadingSubject.complete();
    }
}