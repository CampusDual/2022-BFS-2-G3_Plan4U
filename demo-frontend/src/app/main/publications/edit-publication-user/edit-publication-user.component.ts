import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Province } from 'src/app/model/province';
import { Publication } from 'src/app/model/publication';
import { LoggerService } from 'src/app/services/logger.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  //selector: 'app-edit-publication-user',
  templateUrl: './edit-publication-user.component.html',
  styleUrls: ['./edit-publication-user.component.scss']
})
export class EditPublicationUserComponent implements OnInit {
  idPublication: number;
  publicationForm: FormGroup;
  publication: Publication;
  categories: Category[];
  provinces:Province[];
  errores: string[];

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService,
    private http: HttpClient
    ) { 
      this.publication = new Publication();
    }

  ngOnInit() {
    this.createFormGroup();
    this.idPublication = this.route.snapshot.params['id'];
    if (this.idPublication) {
      this.publicationService.getPublication(this.idPublication).subscribe(
        response => {
          this.publication = response;
          this.publicationForm.patchValue(this.publication, { emitEvent: false, onlySelf: false });
          this.logger.info(this.publication);
        }
      );
    }

    this.publicationService.getCategories().subscribe(response => {this.categories = response});
    this.publicationService.getProvinces().subscribe(response => {this.provinces = response});
  }

  onFormChanges() {
    this.publicationForm.valueChanges.subscribe((val) => {});
  }

  createFormGroup() {
    this.publicationForm = this.fb.group({
      id: [this.publication.id],
      title: [this.publication.title, Validators.required],
      content: [this.publication.content],
      createDate: [this.publication.createDate],
      userLogin: [this.publication.userLogin, Validators.required],
      categoryName: [this.publication.categoryName, Validators.required],
      provinceName: [this.publication.provinceName, Validators.required],
      eventDate: [this.publication.eventDate, Validators.required],
      contact: [this.publication.contact, Validators.required],
      optionalContact: [this.publication.optionalContact]
    });
  }

  save() {
    const newPublication: Publication = Object.assign({}, this.publicationForm.value);
    if (newPublication.id) {
      this.publicationService.editPublication(newPublication).subscribe((response) =>{
        this.redirectList(response);
      });
    } else {
      this.publicationService.createPublication(newPublication).subscribe((response) => {
        this.redirectList(response);
      });
    }
  }

  redirectList(response: any) {
    if (response.responseCode === 'OK') {
      this.router.navigate(['/publications']);
    }else{
      console.log(response);
    }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      return o1.id === o2.id;
    } else {
      return false;
    }
  }

  cancel() {
    this.router.navigate(['/publications']);
  }

}
