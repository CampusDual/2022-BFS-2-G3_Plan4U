import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AuthService } from 'src/app/auth/auth.service';
import { Category } from 'src/app/model/category';
import { Province } from 'src/app/model/province';
import { Publication } from 'src/app/model/publication';
import { PublicationService } from 'src/app/services/publication.service';

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
  
  constructor(
    private authService: AuthService, 
    private publicationService: PublicationService , 
    private router: Router
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
    this.router.navigate(['/my-publications/edit/' + publication.id]);
  }
}
  
  