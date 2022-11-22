import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import {Idle} from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Publication } from 'src/app/model/publication';
import { PublicationService } from 'src/app/services/publication.service';
import { Category } from 'src/app/model/category';
import { Province } from 'src/app/model/province';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent {

publications: Publication[];
categories: Category[] ;
provinces: Province[];
filterPost= '';
filterPost2='';

  constructor(
    private idle: Idle, 
    private keepalive: Keepalive, 
    private authService: AuthService, 
    private publicationService: PublicationService , 
    private router: Router
    ) {
  }

  ngOnInit () {
    this.publicationService.getPublicationsUsers().subscribe(response => {this.publications = response});
    this.publicationService.getCategories().subscribe(response => {this.categories = response});
    this.publicationService.getProvinces().subscribe(response => {this.provinces = response});

  }

  onAdd() {
    this.router.navigate(['/publications/addpublicationuser']);
  }
 }